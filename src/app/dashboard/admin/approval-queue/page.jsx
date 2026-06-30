import { getData } from '@/components/lib/getData';
import React from 'react';
import ApprovalQueue from './approvalPage';
import { getUserToken } from '@/components/lib/getSessionServer';

const page =async  () => {

  const books = await getData('book/get-pending-book')
  const token = await getUserToken()

  return (
    <div>
      <ApprovalQueue pendingBooks={books} token={token} />
    </div>
  );
};

export default page;