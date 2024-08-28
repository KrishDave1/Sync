/** @format */

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
