import React from 'react';
import ManageAllBooks from './manageAllBooks';
import { getData } from '@/components/lib/getData';

const page =async () => {
  const books = await getData(`book/all-book`)
  console.log(books);
  return (
    <div>
      <ManageAllBooks allBooks={books}/>
    </div>
  );
};

export default page;