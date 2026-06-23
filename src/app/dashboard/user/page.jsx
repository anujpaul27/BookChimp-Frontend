import { redirect } from "next/navigation";
import UserDashboard from "./userDashboard";
import { getUserServerSession } from "@/components/lib/getSessionServer";


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