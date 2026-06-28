import React from "react";
import AddBook from "./addBookPage";
import { getUserServer, getUserToken } from "@/components/lib/getSessionServer";

const addBook = async () => {
  const userId = await getUserServer();
  const token = await getUserToken();
  return (
    <div>
      <AddBook userId={userId} token={token} />
    </div>
  );
};

export default addBook;
