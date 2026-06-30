import React from 'react';
import ManageAllBooks from './manageAllBooks';
import { getData } from '@/components/lib/getData';
import { getUserToken } from '@/components/lib/getSessionServer';

const page =async () => {
  const token = await getUserToken()
  const books = await getData(`book/all-book`,token);
  return (
    <div>
      <ManageAllBooks allBooks={books} token={token}/>
    </div>
  );
};

export default page;