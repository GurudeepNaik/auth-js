import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import React from "react";

interface LoginPageProps {
  searchParams?: {
    error?: string;
  };
}
const page = (props: LoginPageProps) => {
  // if (props?.searchParams?.error) {
  //   redirect("/auth/error");
  // }
  return <LoginForm />;
};

export default page;
