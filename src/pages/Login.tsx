import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod';

const loginFormSchema = z.object({
    username: z.string().trim().min(1, "Username name can't be empty"),
    password: z.string().trim().min(1, "Password name can't be empty")
})


type FormFields = z.infer<typeof loginFormSchema>;

function Login() {

    const { register, handleSubmit ,formState: {errors, isSubmitting} } = useForm<FormFields>({resolver: zodResolver(loginFormSchema)});

    const onSubmit:  SubmitHandler<FormFields> = function(data) {
        console.log(data)
    }
    return (
        <div>
            <div>Website Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} type="text" placeholder='Username'/>
                { errors.username && <div> {errors.username.message}</div>}
                <input {...register('password')}type="password" placeholder='Password'/>
                { errors.password && <div> {errors.password.message}</div>}
                <button type='submit'>{isSubmitting ? "Loading": "Login"}</button>
            </form>
        </div>
    )
}

export default Login