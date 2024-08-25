/** @format */
"use client";

import { chatHrefConstructor } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter(); //* We need this as how would we check if the user has seen the unseen message or not, here we would initially keep it unseen and as soon as the user accesses the chatId url we would mark it as seen.

  const pathname = usePathname();
  const [unseenMessages, setunseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname.includes("chat")) {
      setunseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);
  return (
    <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;
        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
            >
              Hello
            </a>
            {/* Here we use anchor tag instead of link tag because we want to hard reset. */}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
