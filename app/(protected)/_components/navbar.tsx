"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const routes = [
  {
    name: "Client",
    route: "/client",
  },
  {
    name: "Server",
    route: "/server",
  },
  {
    name: "Admin",
    route: "/admin",
  },
  {
    name: "Settings",
    route: "/settings",
  },
];
export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className=" bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        {routes.map((each) => {
          const { name, route } = each;
          return (
            <Button
              key={name}
              asChild
              variant={pathname === route ? "default" : "outline"}
            >
              <Link href={route}>{name}</Link>
            </Button>
          );
        })}
      </div>
      <p className="">
        <UserButton />
      </p>
    </nav>
  );
};
