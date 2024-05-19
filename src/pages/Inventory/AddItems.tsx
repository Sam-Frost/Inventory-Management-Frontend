"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BACKEND_URL } from '@/constants'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    itemName: z.string().trim().min(1, "Item name cannot be empty"),
    partNumber: z.string().trim().min(1, "Part number cannot be empty"),
    quantity: z.coerce.number({message: "Quantity should be number(0-9)"}).positive("Quantity should be greater than 0"),
    price: z.coerce.number({message: "Price should be number(0-9)"}).positive("Price should be greater than 0")
})



type FormFields = z.infer<typeof formSchema>;

export function AddItems() {
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        itemName: "",
        partNumber: "",
        // quantity: 0,
        // price: 0
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    const response = await axios.post(`${BACKEND_URL}/employee/create`, values);
    
    console.log(response)
    console.log(response.data)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white w-6/12 h-4/6 p-6 rounded border-2 ">
      
      <div className="flex flex-row justify-center items-center"> 
        <p className="font-bold text-3xl">Add Item</p> 
      </div>
      
      
      <FormField
          name="itemName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Employe Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Item Name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="partNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Phone Number</FormLabel> */}
              <FormControl>
                <Input placeholder="Part Number" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Position</FormLabel> */}
              <FormControl>
                <Input type='number' placeholder="Quantity" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input type='number' placeholder="Price" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-center items-center"> 
          <Button type="submit" className="px-6 text-lg">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddItems;

