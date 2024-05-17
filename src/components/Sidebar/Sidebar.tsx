import UserInfo from "./UserInfo"
import Menu from "./Menu"
import { LogOut } from "lucide-react"

function Sidebar() {
  return (
    // <div className="flex flex-col w-[270px] min-w-[270px] border-r min-h-screen p-2">
    //   <UserInfo />
    //   <div className="grow ">
    //   <Menu />

    //   </div>
    //   <LogOut className="transform rotate-180 hover:cursor-pointer" />
    // </div>

    <div className="flex flex-col w-[270px] min-w-[270px] border-r min-h-screen p-2 bg-white
     overflow-y-auto">
      <UserInfo />
      <div className="grow ">
      <Menu />

      </div>
      <LogOut className="transform rotate-180 hover:cursor-pointer" />
    </div>
  )
}


export default Sidebar