import { getUserServerSession } from "@/components/lib/getSession";
import { redirect } from "next/navigation";
import UserDashboard from "./userDashboard";


const page = async () => {  
  const user = await getUserServerSession()
  if (!user)
  {
    redirect('/login')
  }
  if (user.role !== "user")
  {
    redirect('/unauthorize')
  }

  return (
    <div>
      <UserDashboard/>
    </div>
  );
};

export default page;