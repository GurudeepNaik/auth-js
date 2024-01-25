"use client";
import { adminAction } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then(async (response) => {
        if (response.ok) {
          const message = await response.json();
          toast.success(message);
        } else {
          const message = await response.json();
          toast.error(message);
        }
      })
      .catch((reason) => toast.error(reason.toString()));
  };

  const onServerActionClick = () => {
    adminAction()
      .then((response) => {
        if (response.error) {
          toast.error(response.error);
        }

        if (response.success) {
          toast.success(response.success);
        }
      })
      .catch((reason) => toast.error(reason.toString()));
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
