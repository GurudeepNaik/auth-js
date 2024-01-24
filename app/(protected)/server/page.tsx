import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const page = async () => {
  const user = await currentUser();

  if (!user) return null;

  return <UserInfo user={user} label="💻 Server component" />;
};

export default page;
