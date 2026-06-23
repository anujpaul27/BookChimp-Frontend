import { auth } from "@/app/(auth)/lib/auth";
import { headers } from "next/headers";


export const GetAllUser = async () => {
  const usersData = await auth.api.listUsers({
    query: {
      limit: 50, // Defaults to 100 rows
      offset: 0, // For pagination
    },
    headers: await headers()
  });

  return usersData.users;
};
