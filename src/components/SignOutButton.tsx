/** @format */

"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import { toast, useToast } from "./ui/use-toast";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setisSigningOut] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  return (
    <Button
      {...props}
      variant={"ghost"}
      onClick={async () => {
        setisSigningOut(true);
        try {
          await signOut({ callbackUrl: "/login" });
          toast({
            title: "Sign out successful",
            description: "You have been signed out",
          });
          console.log("sign out successful");
          router.push("/login");
          console.log("redirecting to login");
        } catch (error) {
          toast({
            title: "Sign out failed",
            description:
              error instanceof Error ? error.message : "An error occurred",
            variant: "destructive",
          });
        } finally {
          setisSigningOut(false);
          console.log("sign out finished");
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
      ) : (
        <LogOut className='w-4 h-4' />
      )}
    </Button>
  );
};

export default SignOutButton;
