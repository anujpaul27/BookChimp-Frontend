import React from "react";
import ManageUsers from "./ManageUser";
import { headers } from "next/headers";
import { auth } from "@/app/(auth)/lib/auth";
import { GetAllUser } from "@/components/lib/getUserBetterAuth";
import { getUserToken } from "@/components/lib/getSessionServer";
import { getData } from "@/components/lib/getData";

const page = async () => {  
  const token = await getUserToken()
  const data = await getData('user/all-users', token)
  console.log(data);
  return (
    <div>
      <ManageUsers initialUsers={data} token={token} />
    </div>
  );
};

export default page;
