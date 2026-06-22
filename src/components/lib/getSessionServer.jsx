import { auth } from "@/app/(auth)/lib/auth";
import { headers } from "next/headers";

export const getUserServer = async () => {
  // 1. Fetch session using server headers
  const session = await auth.api.getSession({
    headers: await headers(), 
  });

  // 2. Return null or handle unauthenticated users
  if (!session) {
    return null; 
  }

  // 3. Return the user ID safely
  return session.user.id;
};
