"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

const Page = () => {
  const user = useCurrentUser();

  if (!user) return null;

  return <UserInfo user={user} label="💻 Client component" />;
};

export default Page;
