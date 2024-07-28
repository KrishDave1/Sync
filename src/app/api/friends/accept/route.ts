/** @format */

import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/options";
import { fetchRedis } from "@/helpers/redis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z
      .object({
        id: z.string(),
      })
      .parse(body);

    const session = await getServerSession(authOptions);

    // verify if the user is authenticated
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    //idToAdd is the id of the user that we want to add as a friend and session.user.id is the id of the user that is currently logged in

    // verify if the user is already a friend
    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`, //For each user id , we have a set of friends
      idToAdd
    );

    if (isAlreadyFriends) {
      return new Response("Already a friend", { status: 400 });
      }
      
      // verify if the other user has actually sent a friend request
    const hasSentRequest = await fetchRedis('sismember', `user:${idToAdd}:incoming_friend_requests`, session.user.id);
    // sismember -> it is set, so we search for the value in the set and return true if it exists, false otherwise
  } catch (error) {}
}
