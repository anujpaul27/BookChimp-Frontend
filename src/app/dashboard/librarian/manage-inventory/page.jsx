import { getUserServer, getUserToken } from "@/components/lib/getSessionServer";
import React from "react";
import ManageInventory from "./manageInventory";
import { toast } from "react-toastify";

const page = async () => {
  const userId = await getUserServer();
  const token = await getUserToken();
  let initialBooks = [];
  let errorMessage = "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/book/library-book/${userId}`,
    {
      headers: { authorization: token },
    },
  );

  const data = await res.json();
  if (res.ok) {
    initialBooks = data.data;
  } else {
    errorMessage = data.message;
  }

  return (
    <div>
      <ManageInventory
        initialBooks={initialBooks}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default page;
