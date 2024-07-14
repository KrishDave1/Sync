/** @format */

"use client";

import { FC } from "react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

interface pageProps {}

const Dashboard: FC<pageProps> = ({}) => {
  const { data: session } = useSession();

  return (
    <>
      <div>page</div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  );
};

export default Dashboard;
