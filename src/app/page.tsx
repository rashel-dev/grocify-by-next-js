import { auth } from "@/auth";
import EditRoleMobile from "@/Components/Home/EditRoleMobile";
import HeroSection from "@/Components/Home/HeroSection";
import Navbar from "@/Components/Home/Navbar";
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
      <HeroSection />
    </div>
  );
}
