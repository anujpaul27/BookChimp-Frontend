import { auth } from "@/app/(auth)/lib/auth";
import { authClient } from "@/app/(auth)/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const useUserClient = () => {
  const { data, isPending, error } = authClient.useSession();
  return data?.user?.id || null;
};

export const getUserServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const RoleCheck = (role) => {
  console.log(role);
  const user = getUserServerSession();
  if (!user) {
    redirect("/login");
  }
  console.log(user.role);
  if (user.role !== role) {
    redirect("/unauthorize");
  }
};
