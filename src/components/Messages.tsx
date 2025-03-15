/** @format */
"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/schemas/message";
import { format, isSameDay } from "date-fns";
import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  chatId: string;
  sessionImg: string | null | undefined;
  chatPartner: User;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  sessionImg,
  chatPartner,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]); // Adding the new message to the top of the messages array so that the latest message is shown first.
    };

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, [chatId]);

  return (
    <div
      id='messages'
      className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
    >
      <div ref={scrollDownRef} />
      {/* When we send a message we want to go to that message directly.*/}

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        // Check which is last message for the user
        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        const currentMessageDate = new Date(message.timestamp);
        const previousMessageDate = messages[index - 1]
          ? new Date(messages[index - 1].timestamp)
          : null;

        // Show date separator only if it's the first message of the day
        const showDateSeparator =
          !previousMessageDate ||
          !isSameDay(currentMessageDate, previousMessageDate);

        return (
          <div key={`${message.id}-${message.timestamp}`}>
            {/* Date Separator */}
            {showDateSeparator && (
              <div className='text-center text-gray-500 text-sm my-2'>
                {format(currentMessageDate, "EEEE, MMMM d, yyyy")}
              </div>
            )}

            <div className='chat-message'>
              <div
                className={cn("flex items-end", {
                  "justify-end": isCurrentUser,
                })}
              >
                <div
                  className={cn(
                    "flex flex-col space-y-2 text-base max-w-xs mx-2",
                    {
                      "order-1 items-end": isCurrentUser,
                      "order-2 items-start": !isCurrentUser,
                    }
                  )}
                >
                  <span
                    className={cn("px-4 py-2 rounded-lg inline-block", {
                      "bg-indigo-600 text-white": isCurrentUser,
                      "bg-gray-200 text-gray-900": !isCurrentUser,
                      "rounded-br-none":
                        !hasNextMessageFromSameUser && isCurrentUser,
                      "rounded-bl-none":
                        !hasNextMessageFromSameUser && !isCurrentUser,
                    })}
                  >
                    {message.text}{" "}
                    <span className='ml-2 text-xs text-gray-400'>
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </span>
                </div>
                <div
                  className={cn("relative w-6 h-6", {
                    "order-2": isCurrentUser,
                    "order-1": !isCurrentUser,
                    invisible: hasNextMessageFromSameUser,
                  })}
                >
                  <Image
                    src={
                      isCurrentUser ? (sessionImg as string) : chatPartner.image
                    }
                    width={24}
                    height={24}
                    className='rounded-full'
                    alt='Profile Picture'
                    referrerPolicy='no-referrer'
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
