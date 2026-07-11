import { getUserServer, getUserServerSession, getUserToken } from '@/components/lib/getSessionServer';
import LibrarianDashboard from './LibrarianDashboard';
import { getData } from '@/components/lib/getData';
import { redirect } from 'next/navigation';

const page = async () => {
  const userId = await getUserServer()
  const token = await getUserToken();

  const books = await getData(`book/library-book/${userId}`,token)
  const TotalPendingForThisLib = await getData(`book/get-pending-book/${userId}`,token)
  const pendingLength = TotalPendingForThisLib.length || 0
  
  const user = await getUserServerSession()
  if (!user)
  {
    redirect('/login')
  }
  if (user.role !== "librarian")
  {
    redirect('/unauthorize')
  }

  return (
    <div>
      <LibrarianDashboard  totalBook={books.length} pendingLength={pendingLength}/>
    </div>
  );
};

export default page;