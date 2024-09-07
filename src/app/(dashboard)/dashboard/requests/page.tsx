/** @format */

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

const page: FC = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound(); // If the user is not logged in, Do not show him the page and show a 404 page instead

  //ids of people who sent friend requests to the currently logged in user
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]; //Here we are fetching the ids of the people who have sent friend requests to the currently logged in user.It might be more than one person so we are using smembers to get all the ids

  // get the emails of the ids fetched above
  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string; //! Redis stores the user object as a string so we have to parse it.
      const senderParsed = JSON.parse(sender) as User;
      return {
        senderId,
        senderEmail: senderParsed.email,
      };
    })
  ); //TODO Good lesson learnt here.In this scenario for every id we will have a fetch call to get its user object and get the email.But it will be tedious as all request will have to wait for one another as all are in await.Here Promise.all helps us to make all the requests at once and wait for all of them to complete.

  return (
    <main className='pt-8'>
      <h1 className='font-bold text-5xl mb-8'>Friend Requests</h1>
      <div className='flex flex-col gap-4'>
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
