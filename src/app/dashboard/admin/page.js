import { redirect } from "next/navigation";
import AdminDashboard from "./adminDashboard";
import { getUserServerSession } from "@/components/lib/getSessionServer";
import { GetAllUser } from "@/components/lib/getUserBetterAuth";
import { getData } from "@/components/lib/getData";


const page = async () => {  
  const user = await getUserServerSession()
  if (!user)
  {
    redirect('/login?callbackUrl=/dashboard/admin')
  }
  if (user.role !== "admin")
  {
    redirect('/unauthorize')
  }

  // count all user
  const allUser = await GetAllUser()
  const allUserLength = allUser.length 

  // count all books 
  const books = await getData("book/all-book/without/pending/unpublish");
  const lengthOfBooks = books?.length || 0;

  // get all order
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/delivered-order`)
  const data = await res.json()
  const allOrders = data?.data || []
  const orderLength = allOrders?.length || 0

  return (
    <div>
      <AdminDashboard lengthOfBooks={lengthOfBooks} allUserLength={allUserLength} orderLength={orderLength}/>
    </div>
  );
};

export default page;