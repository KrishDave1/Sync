/** @format */
"use client";

import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/Button";
import { Loader2, VideoIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "inspector";

interface ChatInputProps {
  chatPartner: User;
  userId: string;
  chatId: string;
  roomId: string;
}

const ChatInput: FC<ChatInputProps> = ({
  chatPartner,
  userId,
  chatId,
  roomId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", {
        text: input,
        chatId,
      });
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Scroll to the bottom of the chat
      const messages = document.getElementById("messages");
      if (messages) {
        messages.scrollTop = messages.scrollHeight; //! As Messages are in displayed in reverse order, so we do scrollTop to scroll to the bottom of the chat.
      }
    }
  };

  const videocall = async () => {
    try {
      await axios.post("/api/message/send", {
        text: `Video Call Invitation: Join me at http://localhost:3000/dashboard/videocall/${roomId}`,
        type: "video-invite",
        chatId,
        initiatorId: userId,
      });

      router.push(`/dashboard/videocall/${roomId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start video call",
        variant: "destructive",
      });
    }
  };


  return (
    <div className='border-t border-gray-200 p-4 mb-2 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className='block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-small sm:leading-6'
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className='py-2'
          aria-hidden='true'
        >
          <div className='py-px'>{/* <div className='h-9' /> */}</div>
        </div>
        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
          <div className='flex-shrink-0 flex gap-2'>
            <Button variant='ghost' size='icon' onClick={videocall}>
              <VideoIcon className='h-5 w-5' />
            </Button>

            {isLoading ? (
              <Button disabled>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Sending
              </Button>
            ) : (
              <Button onClick={sendMessage}>Send</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
