import { getUserServer } from '@/components/lib/getSessionServer';
import React from 'react';
import ManageInventory from './manageInventory';

const page = async () => {
  const userId = await getUserServer()
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book/library-book/${userId}`)
  const data = await res.json()
  const initialBooks = data.data

  return (
    <div>
      <ManageInventory initialBooks={initialBooks}  />
    </div>
  );
};

export default page;