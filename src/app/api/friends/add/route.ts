/** @format */

import { addFriendSchema } from "@/schemas/addFriend";
import { log } from "console";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendSchema.parse(body.email);

    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store", // Telling Next.js to not cache this request and always make a new request
      }
    );

    const data = (await RESTResponse.json()) as { result: string };

    const idToAdd = data.result;

    if (!idToAdd) {
      return new Response("This Person does not exist", { status: 404 });
    }
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    //check if the person is already a friend
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("You have already added your friend", {
        status: 400,
      });
    }

    //check if the friend we are trying to add has already added us
    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("Your friend has already added you", { status: 400 });
    }

    //valid friend request , so send the friend request

    pusherServer.trigger(toPusherKey(`user:${idToAdd}:incoming_friend_requests`), "incoming_friend_requests", {
      senderId: session.user.id,
      senderEmail: session.user.email,
    });
    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return new Response("Friend request sent", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("An unknown error occurred", {
      status: 500,
    });
  }
}
