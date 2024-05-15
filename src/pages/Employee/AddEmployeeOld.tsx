import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

// Later refactor the refine code to a variable
// Defining refine on the whole object VS a particular field
// How does refine work actual nitty girtty

const validatePhoneNumber = (value: string) => {
    // Regular expression for basic phone number format (adjust as needed)
    const phoneRegExp = /^\d+$/;
    if (!phoneRegExp.test(value)) {
        return false
    }
    return true; // No validation error
  };
const validatePhoneNumberErrorMessage = {
    message: "Phone number must be numeric.",
  };



const addEmployeeFormSchema = z.object({
    employeeName: z.string().trim().min(1, "Employee name can't be empty"),
    phoneNumber: z.string().trim().min(10, "Phone number needs to be 10 digits").max(10, "Phone number needs to be 10 digits").refine(validatePhoneNumber, validatePhoneNumberErrorMessage),
    position: z.string().trim().min(1, "Position can't be empty"),
    password: z.string().trim().min(8, "Password can't be less than 8 characters"),
    confirmPassword: z.string().trim().min(8, "Password can't be less than 8 characters")
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    });

type FormFields = z.infer<typeof addEmployeeFormSchema>;

function AddEmployee() {
   
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>({resolver: zodResolver(addEmployeeFormSchema)});

    const onsubmit: SubmitHandler<FormFields> = async function(data){

       // Create a Promise that resolves after 3 seconds
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));

        // Use await to wait for the timeoutPromise to resolve
        await timeoutPromise;

        console.log(data)
    }

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit(onsubmit)}>
            <input {...register('employeeName')} type="text" placeholder="Name"/>
            { errors.employeeName && <div> {errors.employeeName.message}</div>}
            <input {...register('phoneNumber')} type="text" placeholder="Phone"/>
            { errors.phoneNumber && <div> {errors.phoneNumber.message}</div>}
            <input {...register('position')} type="text" placeholder="Position"/>
            { errors.position && <div> {errors.position.message}</div>}
            <input {...register('password')} type="password" placeholder="Password"/>
            { errors.password && <div> {errors.password.message}</div>}
            <input {...register('confirmPassword')} type="password" placeholder="Confirm Password"/>
            { errors.confirmPassword && <div> {errors.confirmPassword.message}</div>}
            <button disabled={isSubmitting} type="submit">{isSubmitting? "Loading" : "Submit"}</button>
        </form>
        </div>
        
    )
}

export default AddEmployee