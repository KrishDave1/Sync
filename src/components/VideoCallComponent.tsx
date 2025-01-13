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
  const pathname = usePathname();

  useEffect(() => {
    // Extract roomId from pathname
    const roomId = pathname.split("/").pop() || "";

    // Check if current user is initiator by comparing roomId format
    // RoomId format: initiatorId--receiverId
    const [initiatorId] = roomId.split("--");
    const isUserInitiator = initiatorId === userId;
    setIsInitiator(isUserInitiator);

    if (localVideoRef.current && remoteVideoRef.current) {
      if (isUserInitiator) {
        startCall(localVideoRef.current, remoteVideoRef.current);
      } else {
        joinCall(localVideoRef.current, remoteVideoRef.current);
      }
    }
  }, [pathname, userId]);

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
