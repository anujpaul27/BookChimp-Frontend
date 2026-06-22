import { getData } from '@/components/lib/getData';
import React from 'react';
import ApprovalQueue from './approvalPage';

const page =async  () => {

  const books = await getData('book/get-pending-book')

  return (
    <div>
      <ApprovalQueue pendingBooks={books} />
    </div>
  );
};

export default page;