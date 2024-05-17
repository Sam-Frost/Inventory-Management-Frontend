import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
//   DialogDescription,
//   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Briefcase } from "lucide-react"


function EmployeeProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>

      <Button variant='outline'> View Profile </Button>

      </DialogTrigger>
      <DialogContent className="min-w-vw min-h-vh">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Tabs defaultValue="account" className="w-[400px]">
        <div className="flex flex-row items-center mb-8">
            <Avatar className="h-24 w-24 mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div >
                <p className="font-medium text-xl">Samarth Negi</p>
                <div className="flex flex-row items-center py-1">
                <Phone size={18}/> <p className="font-normal text-md pl-2">9717433825</p>
                </div>  
                <div className="flex flex-row items-center">
                <Briefcase size={18}/> <p className="font-normal text-md pl-2">Junior Dev</p>
                </div>  
                
            </div>
        </div>
        <div className="flex flex-row items-center justify-center">
        <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="defective">Defective</TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="inventory">Make changes to your account here.</TabsContent>
        <TabsContent value="approvals">Change your password here.</TabsContent>
        <TabsContent value="defective">Defective Items</TabsContent>
        </Tabs>

        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
    
  )
}

export default EmployeeProfile