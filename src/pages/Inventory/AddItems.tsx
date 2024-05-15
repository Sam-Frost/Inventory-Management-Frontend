import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const addItemFormSchema = z.object({
    itemName: z.string().trim().min(1, "Item name cannot be empty"),
    partNumber: z.string().trim().min(1, "Part number cannot be empty"),
    quantity: z.coerce.number({message: "Quantity should be number(0-9)"}).positive("Quantity should be greater than 0"),
    price: z.coerce.number({message: "Price should be number(0-9)"}).positive("Price should be greater than 0")
})

type FormFields = z.infer<typeof addItemFormSchema>;

export default function AddItems() {

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>({resolver: zodResolver(addItemFormSchema)});

    const onSubmit: SubmitHandler<FormFields> = async function(data) {

        await new Promise((resolve) =>  setTimeout(resolve, 3000));

        console.log(data)
    }

    return (
        <div>
            <h1>Add Items</h1>
            <form onSubmit={handleSubmit((onSubmit))}> 
                <input  {...register("itemName", )} type="text" placeholder="Item Name"/>
                {errors.itemName  && <div> {errors.itemName.message}</div>}
                <input {...register("partNumber")} type="text" placeholder="Part Number"/>
                {errors.partNumber  && <div> {errors.partNumber.message}</div>}         
                <input {...register("quantity")} type="text" placeholder="Quantity"/>
                {errors.quantity  && <div> {errors.quantity.message}</div>}
                <input {...register("price")} type="text" placeholder="Price"/>
                {errors.price  && <div> {errors.price.message}</div>}
                
                <button disabled={isSubmitting} type="submit">{ isSubmitting ? "Loading" : "Add item"}</button>
                {errors.root  && <div> {errors.root.message}</div>}
            </form>
        </div>

    )
}
