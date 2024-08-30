/** @format */

"use client";

import { Check, UserPlus, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
  const { toast } = useToast();

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`) //toPusherKey is used because pusher does not accept colon in channel name and so we replace it with __
    ); //Here we are just subscribing(looking if anything new is added) to the channel

    const friendRequestHandler = () => {
      // setFriendRequests((prev) => [...prev, data]);
      console.log("Friend request received");
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`) //toPusherKey is used because pusher does not accept colon in channel name and so we replace it with __
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    }
  }, []);

  const acceptFriend = async (senderId: string) => {
    try {
      const response = await axios.post("/api/friends/accept", {
        id: senderId,
      });

      setFriendRequests((prev) =>
        prev.filter((request) => request.senderId !== senderId)
      ); //Here we are taking the latest state and filtering out the request of the user who has sent the friend request

      toast({
        title: "Friend request accepted",
        description: "You have a new friend",
      });
    } catch (error) {
      toast({
        title: "Friend request error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500'>Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className='flex gap-4 items-center'>
            <UserPlus className='text-black' />
            <p className='font-medium text-lg'>{request.senderEmail}</p>
            <button
              onClick={() => acceptFriend(request.senderId)}
              aria-label='accept friend'
              className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'
            >
              <Check className='font-semibold text-white w-3/4 h-3/4' />
            </button>
            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label='deny friend'
              className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'
            >
              <X className='font-semibold text-white w-3/4 h-3/4' />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
