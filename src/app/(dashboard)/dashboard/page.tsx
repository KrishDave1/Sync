/** @format */

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};

export default Dashboard;
