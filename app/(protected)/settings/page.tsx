import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div>
      Settings:{JSON.stringify(session?.user)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default page;
