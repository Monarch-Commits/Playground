import syncUser from "@/app/actions/User/syncUser.action"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs"


export default async function Nav() {
 const user = await syncUser()
  return (<>
  
   {user ? ( <><p>Current User: </p>
    <Avatar>
  <AvatarImage src={user?.imageUrl || ""} alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>     <LogoutLink>
              <Button variant="outline">Logout</Button>
            </LogoutLink></>) : <>

            <LoginLink>
              <Button variant="outline">Login</Button>
            </LoginLink>


</>}
  
  
  </>


   
  )
}
