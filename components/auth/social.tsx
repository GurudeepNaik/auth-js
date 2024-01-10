"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirect: true,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
    // redirect(DEFAULT_LOGIN_REDIRECT);
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="default"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
        asChild
      >
        <FcGoogle />
      </Button>
      <Button
        size="default"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
        asChild
      >
        <FaGithub />
      </Button>
    </div>
  );
};
