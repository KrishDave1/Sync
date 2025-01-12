/** @format */

import { useRef } from "react";
import { startCall } from "../../../../webrtc/videocall";

const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const handleStartCall = async () => {
    if (localVideoRef.current && remoteVideoRef.current) {
      try {
        await startCall(localVideoRef.current, remoteVideoRef.current);
      } catch (err) {
        console.error("Error starting the call:", err);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Video Call</h1>
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
      <button
        onClick={handleStartCall}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
      >
        Start Call
      </button>
    </div>
  );
};

export default VideoCall;
