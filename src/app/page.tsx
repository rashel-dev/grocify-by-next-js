import { auth } from "@/auth";
import AdminDashboard from "@/Components/AdminDashboard";
import EditRoleMobile from "@/Components/Home/EditRoleMobile";
import Navbar from "@/Components/Home/Navbar";
import RiderDashboard from "@/Components/RiderDashboard";
import UserDashboard from "@/Components/UserDashboard";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { redirect } from "next/navigation";

export default async function Home() {
  await dbConnect();
  const session = await auth();
  const user = await User.findById(session?.user?.id);

  if(!user) {
    redirect("/login")
  }
  if(user.role === "user" && !user.mobile) {
    return <EditRoleMobile />
  }

  return (
    <div>
      <Navbar user={user}/>

      {user.role === "user" ? <UserDashboard /> : user.role === "admin" ? <AdminDashboard /> : <RiderDashboard />}
      
    </div>
  );
}
