/** @format */
"use client";

import Pusher from "pusher-js";

const APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const CLUSTER = process.env.PUSHER_CLUSTER || "ap2";

if (!APP_KEY || !CLUSTER) {
  throw new Error("Pusher configuration is missing.");
}

let peerConnection: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;

const getRoomId = () => {
  const parts = window.location.pathname.split("/");
  return parts[parts.length - 1];
};

const roomId = getRoomId();
const pusher = new Pusher(APP_KEY, { cluster: CLUSTER });
const channel = pusher.subscribe(`video-call-${roomId}`);

const config: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  bundlePolicy: "max-bundle",
};

// Initialize local stream
async function initializeLocalStream(localVideo: HTMLVideoElement) {
  if (!localStream) {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.srcObject = localStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Unable to access camera/microphone. Please check permissions.");
    }
  }
  return localStream;
}

// Start call
export async function startCall(
  localVideo: HTMLVideoElement,
  remoteVideo: HTMLVideoElement
) {
  try {
    await initializeLocalStream(localVideo);
    peerConnection = new RTCPeerConnection(config);

    // Add local tracks to connection
    localStream?.getTracks().forEach((track) => {
      console.log("Local track:", track);
      peerConnection?.addTrack(track, localStream!);
    });

    // Initialize remote stream and handle incoming tracks
    remoteStream = new MediaStream();
    remoteVideo.srcObject = remoteStream;

    peerConnection.ontrack = (event) => {
      console.log("Remote track event:", event);
      event.streams[0]?.getTracks().forEach((track) => {
        console.log("Remote track:", track);
        remoteStream?.addTrack(track);
      });
    };

    // Create and send offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    channel.trigger("client-offer", { offer });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        channel.trigger("client-ice-candidate", { candidate: event.candidate });
      }
    };

    // Listen for answer
    channel.bind(
      "client-answer",
      async (data: { answer: RTCSessionDescriptionInit }) => {
        if (peerConnection) {
          await peerConnection.setRemoteDescription(data.answer);
        }
      }
    );

    // Listen for ICE candidates
    channel.bind(
      "client-ice-candidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection) {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      }
    );

    console.log("Call started successfully.");
  } catch (err) {
    console.error("Error starting call:", err);
  }
}

// Join call
export async function joinCall(
  localVideo: HTMLVideoElement,
  remoteVideo: HTMLVideoElement
) {
  try {
    await initializeLocalStream(localVideo);
    peerConnection = new RTCPeerConnection(config);

    // Add local tracks to connection
    localStream
      ?.getTracks()
      .forEach((track) => peerConnection?.addTrack(track, localStream!));

    // Initialize remote stream and handle incoming tracks
    remoteStream = new MediaStream();
    remoteVideo.srcObject = remoteStream;

    peerConnection.ontrack = (event) => {
      event.streams[0]?.getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        channel.trigger("client-ice-candidate", { candidate: event.candidate });
      }
    };

    // Listen for offer
    channel.bind(
      "client-offer",
      async (data: { offer: RTCSessionDescriptionInit }) => {
        if (peerConnection) {
          await peerConnection.setRemoteDescription(data.offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          channel.trigger("client-answer", { answer });
        }
      }
    );

    // Listen for ICE candidates
    channel.bind(
      "client-ice-candidate",
      async (data: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection) {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      }
    );

    console.log("Joined call successfully.");
  } catch (err) {
    console.error("Error joining call:", err);
  }
}
