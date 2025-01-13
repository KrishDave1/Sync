/** @format */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import VideoCallComponent from "@/components/VideoCallComponent";
import { notFound } from "next/navigation";

const VideoCall = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  return <VideoCallComponent userId={session.user.id} />;
  
};

export default VideoCall;
