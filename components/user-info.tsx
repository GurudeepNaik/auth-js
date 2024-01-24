import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProp {
  user: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProp) => {
  const { id, name, email, role, isTwoFactorEnabled } = user;
  const userDetails = [
    {
      name: "ID",
      value: id,
    },
    {
      name: "Name",
      value: name,
    },
    {
      name: "Email",
      value: email,
    },
    {
      name: "Role",
      value: role,
    },
    {
      name: "Two Factor Authentication",
      value: isTwoFactorEnabled,
    },
  ];
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {userDetails.map(({ name, value }, i) => {
          return <UserDatail key={i} name={name} value={value} />;
        })}
      </CardContent>
    </Card>
  );
};

const UserDatail = ({
  name,
  value,
}: {
  name: string;
  value: string | null | undefined | Boolean;
}) => {
  if (value === null || value === undefined) return null;

  if (typeof value === "boolean") {
    return (
      <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
        <p className=" text-sm font-medium">{name}</p>
        <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
          <Badge variant={value ? "success" : "destructive"}>
            {value ? "ON" : "OFF"}
          </Badge>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-sm">
      <p className=" text-sm font-medium">{name}</p>
      <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
        {value.toString()}
      </p>
    </div>
  );
};
