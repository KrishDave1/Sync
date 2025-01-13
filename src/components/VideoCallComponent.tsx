/** @format */

"use client";
import { useRef, useEffect, useState } from "react";
import { startCall, joinCall } from "@/webrtc/videocall";
import { usePathname } from "next/navigation";

interface VideoCallComponentProps {
  userId: string | undefined;
}

const VideoCallComponent = ({ userId }: VideoCallComponentProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isInitiator, setIsInitiator] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Extract roomId from pathname
    if (!pathname) return;
    const extractedRoomId = pathname.split("/").pop() || "";
    setRoomId(extractedRoomId);

    // Check if the current user is the initiator
    const [initiatorId] = extractedRoomId.split("--");
    const isUserInitiator = initiatorId === userId;
    setIsInitiator(isUserInitiator);
  }, [pathname, userId]);

  useEffect(() => {
    if (!roomId || !localVideoRef.current || !remoteVideoRef.current) return;

    // Start or join the call based on the user's role
    const initiateCall = async () => {
      try {
        if (isInitiator) {
          await startCall(localVideoRef.current!, remoteVideoRef.current!);
        } else {
          await joinCall(localVideoRef.current!, remoteVideoRef.current!);
        }
      } catch (error) {
        console.error("Error initializing video call:", error);
        alert("Failed to set up the video call. Please try again.");
      }
    };

    initiateCall();
  }, [roomId, isInitiator]);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>
        {isInitiator ? "Starting Video Call..." : "Joining Video Call..."}
      </h1>
      <div className='flex space-x-4'>
        <div>
          <h2 className='text-lg'>Local Video</h2>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className='border w-64 h-48'
          ></video>
        </div>
        <div>
          <h2 className='text-lg'>Remote Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            className='border w-64 h-48'
          ></video>
        </div>
      </div>
    </div>
  );
};

export default VideoCallComponent;
