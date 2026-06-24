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

export const getUserServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const getUserToken =async ()=>
{
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    return session?.session?.token || null
}

export const sendToken = async () =>
{
    const userToken = await getUserToken()

    if (userToken === null)
    {
        return null
    }

    return {authorization: `${userToken}`}
}