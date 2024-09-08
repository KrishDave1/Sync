/** @format */

"use client";

import { FC, Fragment, useEffect, useState } from "react";

interface MobileChatLayoutProps {
  friends: User[];
  session: Session;
  unseenRequestCount: number;
  sidebarOptions: SidebarOption[];
}

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { Icons,Icon } from "./Icons";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import FriendRequestsSidebarOptions from "./FriendRequestsSidebarOptions";
import SidebarChatList from "./SidebarChatList";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { SidebarOption } from "@/types/typing";

const MobileChatLayout: FC<MobileChatLayoutProps> = ({
  friends,
  session,
  unseenRequestCount,
  sidebarOptions,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='fixed bg-zinc-50 border-b border-zinc-200 top-0 inset-x-0 py-4 px-4'>
      <div className='w-full flex justify-between items-center'>
        <Link
          href='/dashboard'
          className={buttonVariants({ variant: "ghost" })}
        >
          <Icons.Logo className='h-6 w-auto text-indigo-600' />
        </Link>

        <Button onClick={() => setOpen(true)} className='gap-4'>
          Menu <Menu className='h-6 w-6' />
        </Button>
      </div>
      <Dialog open={open} onClose={setOpen} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <DialogPanel
                transition
                className='pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'
              >
                {/* <TransitionChild>
                  <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4'>
                    <button
                      type='button'
                      onClick={() => setOpen(false)}
                      className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                    >
                      <span className='absolute -inset-2.5' />
                      <span className='sr-only'>Close panel</span>
                      <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                    </button>
                  </div>
                </TransitionChild> */}
                <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                  <div className='px-4 sm:px-6 flex justify-between'>
                    <DialogTitle className='text-base font-semibold leading-6 text-gray-900'>
                      Dashboard
                    </DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        type='button'
                        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={() => setOpen(false)}
                      >
                        <span className='sr-only'>Close panel</span>
                        <X className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </div>
                  <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    {/* Your content */}

                    {friends.length > 0 ? (
                      <div className='text-xs font-semibold leading-6 text-gray-400'>
                        Your chats
                      </div>
                    ) : null}

                    <nav className='flex flex-1 flex-col h-full'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <SidebarChatList
                            friends={friends}
                            sessionId={session.user.id}
                          />
                        </li>

                        <li>
                          <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Overview
                          </div>
                          <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {sidebarOptions.map((option) => {
                              const Icon = Icons[option.Icon];
                              return (
                                <li key={option.name}>
                                  <Link
                                    href={option.href}
                                    className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  >
                                    <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                                      <Icon className='h-4 w-4' />
                                    </span>
                                    <span className='truncate'>
                                      {option.name}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}

                            <li>
                              <FriendRequestsSidebarOptions
                                initialUnseenRequestCount={unseenRequestCount}
                                sessionId={session.user.id}
                              />
                            </li>
                          </ul>
                        </li>

                        <li className='-ml-6 mt-auto flex items-center'>
                          <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900'>
                            <div className='relative h-8 w-8 bg-gray-50'>
                              <Image
                                fill
                                referrerPolicy='no-referrer'
                                className='rounded-full'
                                src={session.user.image || ""}
                                alt='Your profile picture'
                              />
                            </div>

                            <span className='sr-only'>Your profile</span>
                            <div className='flex flex-col'>
                              <span aria-hidden='true'>
                                {session.user.name}
                              </span>
                              <span
                                className='text-xs text-zinc-400'
                                aria-hidden='true'
                              >
                                {session.user.email}
                              </span>
                            </div>
                          </div>

                          <SignOutButton className='h-full aspect-square' />
                        </li>
                      </ul>
                    </nav>

                    {/* End of your content */}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MobileChatLayout;
