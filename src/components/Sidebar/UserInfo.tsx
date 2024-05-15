import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// TODO :  Add css to the text to make it look good

function UserInfo() {
  return (
    <div className="flex items-center justify-start gap-2 border rounded-[8px] border-gray-300 p-2">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Sam Frost</p> 
            <p className="text-sm"  >Jr. Developer</p>
        </div>
    </div>
  )
}

export default UserInfo