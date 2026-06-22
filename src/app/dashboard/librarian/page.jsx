import { getUserServer } from '@/components/lib/getSessionServer';
import LibrarianDashboard from './LibrarianDashboard';
import { getData } from '@/components/lib/getData';

const page = async () => {
  const userId = await getUserServer()

  const books = await getData(`book/library-book/${userId}`)

  const pendingBooks = await getData(`book/library-book/${userId}`)
  console.log(pendingBooks);

  return (
    <div>
      <LibrarianDashboard  totalBook={books.length} />
    </div>
  );
};

export default page;