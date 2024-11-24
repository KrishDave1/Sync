/** @format */

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import { fetchRedis } from "@/helpers/redis";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageRaw] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      const lastMessage = JSON.parse(lastMessageRaw) as Message;
      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="font-bold text-4xl lg:text-5xl text-indigo-900 mb-8">
        Recent Chats
      </h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className="text-sm text-gray-500">No recent chats available.</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <Link
            href={`/dashboard/chat/${chatHrefConstructor(
              session.user.id,
              friend.id
            )}`}
            key={friend.id}
            className="group block border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg hover:bg-gray-50 transition mb-4"
          >
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={friend.image}
                  alt={`${friend.name}'s profile`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {friend.name}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  <span className="font-semibold">
                    {friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage.text}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-indigo-600" />
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Dashboard;
