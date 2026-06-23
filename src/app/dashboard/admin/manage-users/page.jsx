import React from "react";
import ManageUsers from "./ManageUser";
import { headers } from "next/headers";
import { auth } from "@/app/(auth)/lib/auth";
import { GetAllUser } from "@/components/lib/getUserBetterAuth";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session.user);

  const data = await GetAllUser()

  return (
    <div>
      <ManageUsers initialUsers={data} />
    </div>
  );
};

export default page;
