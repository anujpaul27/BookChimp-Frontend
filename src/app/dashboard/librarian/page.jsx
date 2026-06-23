import { getUserServer } from '@/components/lib/getSessionServer';
import LibrarianDashboard from './LibrarianDashboard';
import { getData } from '@/components/lib/getData';
import { getUserServerSession, RoleCheck } from '@/components/lib/getSession';
import { redirect } from 'next/navigation';

const page = async () => {
  const userId = await getUserServer()

  const books = await getData(`book/library-book/${userId}`)
  
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
      <LibrarianDashboard  totalBook={books.length} />
    </div>
  );
};

export default page;