/** @format */

import Pusher from "pusher-js";

const APP_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
const CLUSTER = process.env.PUSHER_CLUSTER;

// WebRTC variables
let peerConnection: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;

// Configure STUN server
const config: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// Initialize Pusher
const pusher = new Pusher(APP_KEY, { cluster: CLUSTER });
const channel = pusher.subscribe("video-call");

// Function to start the video call
export async function startCall(
  localVideo: HTMLVideoElement,
  remoteVideo: HTMLVideoElement
): Promise<void> {
  // Get local video stream
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localVideo.srcObject = localStream;

  // Initialize RTCPeerConnection
  peerConnection = new RTCPeerConnection(config);

  // Add local stream tracks to the peer connection
  localStream
    .getTracks()
    .forEach((track) => peerConnection?.addTrack(track, localStream!));

  // Handle remote stream
  peerConnection.ontrack = (event) => {
    if (!remoteStream) {
      remoteStream = event.streams[0];
      remoteVideo.srcObject = remoteStream;
    }
  };

  // Handle ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      channel.trigger("client-ice-candidate", { candidate: event.candidate });
    }
  };

  // Create and send an offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  channel.trigger("client-offer", { offer });
}

// Handle incoming offer
channel.bind(
  "client-offer",
  async (data: { offer: RTCSessionDescriptionInit }) => {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection(config);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          channel.trigger("client-ice-candidate", {
            candidate: event.candidate,
          });
        }
      };

      peerConnection.ontrack = (event) => {
        if (!remoteStream) {
          remoteStream = event.streams[0];
        }
      };

      localStream
        ?.getTracks()
        .forEach((track) => peerConnection?.addTrack(track, localStream!));
    }

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    channel.trigger("client-answer", { answer });
  }
);

// Handle incoming answer
channel.bind(
  "client-answer",
  async (data: { answer: RTCSessionDescriptionInit }) => {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    }
  }
);

// Handle incoming ICE candidates
channel.bind(
  "client-ice-candidate",
  async (data: { candidate: RTCIceCandidateInit }) => {
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }
);
