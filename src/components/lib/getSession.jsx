import { authClient } from "@/app/(auth)/lib/auth-client";

export const useUserClient = () => {
  const { data, isPending, error } = authClient.useSession();
  return data?.user?.id || null;
};

