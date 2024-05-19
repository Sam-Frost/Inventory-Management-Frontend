import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AssignDialog({item, children}) {

  useEffect(() => {
    console.log("Printing item")
    console.log(item)

  }, [])
    return (
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Item</DialogTitle>
            <DialogDescription>
              {item.itemName} { item.partNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availableQuantity" className="text-right">
                Available Quantity
              </Label>
              <Input
                id="availableQuantity"
                defaultValue={item.quantity}
                className="col-span-3"
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Assign Quantity
              </Label>
              <Input
                id="quantity"
                defaultValue="0"
                type='number'
                placeholder="0"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }