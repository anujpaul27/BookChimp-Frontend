import { getUserServerSession } from "@/components/lib/getSession";
import { redirect } from "next/navigation";
import AdminDashboard from "./adminDashboard";


const page = async () => {  
  const user = await getUserServerSession()
  if (!user)
  {
    redirect('/login')
  }
  if (user.role !== "admin")
  {
    redirect('/unauthorize')
  }

  return (
    <div>
      <AdminDashboard/>
    </div>
  );
};

export default page;