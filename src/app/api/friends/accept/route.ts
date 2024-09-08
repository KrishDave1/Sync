/** @format */

import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/options";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { log } from "console";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

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
    const hasSentRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );
    // sismember -> it is set, so we search for the value in the set and return true if it exists, false otherwise

    if (!hasSentRequest) {
      return new Response("No friend request has been sent", { status: 400 });
    }

    const [userRaw, friendRaw] = (await Promise.all([
      fetchRedis("get", `user:${session.user.id}`),
      fetchRedis("get", `user:${idToAdd}`),
    ])) as [string, string];

    const user = JSON.parse(userRaw) as User;
    const friend = JSON.parse(friendRaw) as User;

    await Promise.all([
      //Trigger the friend request accepted event to the user that sent the friend request to let him know that the request has been accepted
      pusherServer.trigger(
        toPusherKey(`user:${idToAdd}:friends`),
        "new_friend",
        user
      ),
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friends`),
        "new_friend",
        friend
      ),

      // add the friend to the user's friend list
      await db.sadd(`user:${session.user.id}:friends`, idToAdd),

      // add the user to the friend's friend list
      await db.sadd(`user:${idToAdd}:friends`, session.user.id),

      //Remove the friend request from the user's incoming requests
      await db.srem(
        `user:${session.user.id}:incoming_friend_requests`,
        idToAdd
      ),
    ]);

    //Learning : sadd is used to add a value to a set, srem is used to remove a value from a set, sismember is used to check if a value exists in a set.

    return new Response("Friend request accepted", { status: 200 });
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Internal server error", { status: 500 });
  }
}
