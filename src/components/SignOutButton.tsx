/** @format */

"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import { boolean } from "zod";
import { Button } from "./ui/Button";
import { signOut } from "next-auth/react";
import { toast, useToast } from "./ui/use-toast";
import { Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setisSigningOut] = useState<boolean>(false);
  const { toast } = useToast();
  return (
    <Button
      {...props}
      variant={"ghost"}
      onClick={async () => {
        setisSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast({
            title: "Sign out failed",
            description:
              error instanceof Error ? error.message : "An error occurred",
            variant: "destructive",
          });
        } finally {
          setisSigningOut(false);
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
