import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser= await fetchAuthUserAction()
  console.log(currentUser)

  if(!currentUser.success) redirect('/sign-up')
  return (
   <div>
    <h2>Authentication and middleware</h2>
    <h3>{currentUser.data?.userName}</h3>
    <h3>{currentUser.data?.email}</h3>

    <Logout/>
   </div>
  );
}
