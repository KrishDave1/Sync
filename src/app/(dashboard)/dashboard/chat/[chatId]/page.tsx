/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {
  params: {
    chatId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis('zrange', 
      `chat:${chatId}:messages`,
      0,
      -1 // Fetching all messages from index 0 to index -1.
    )

    const dbMessages = results.map((message) => JSON.parse(message) as Message)
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

  return <div>{params.chatId}</div>;
};

export default page;
