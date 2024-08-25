/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { messageArrayValidator } from "@/schemas/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
import Image from "next/image";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`, // Initially the array you get from zrange will be JSON stringified. So you need to parse it to get the actual message object.
      0,
      -1 // Fetching all messages from index 0 to index -1.
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reverseDbMessages = dbMessages.reverse(); // Reversing the messages to get the latest messages first.

    const messages = messageArrayValidator.parse(reverseDbMessages);
  } catch (error) {
    notFound();
  }
}

const page: FC<PageProps> = async ({ params }: PageProps) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const { user } = session;

  const [userId1, userId2] = chatId.split("--"); // Meaning url will be something like this : dashboard/chat/userId1--userId2

  if (user.id !== userId1 && user.id !== userId2) {
    //Trying to access other chats
    return notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1; //Meaning if logged in user is userId1 then chatPartnerId will be userId2 and vice versa.

  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;

  const initialMessages = await getChatMessages(chatId);

  return (
    <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh - 6rem)]'>
      <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
        <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
              <Image
                fill
                referrerPolicy='no-referrer'
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className='rounded-full'
              />
            </div>
          </div>





          
        </div>
      </div>
    </div>
  );
};

export default page;