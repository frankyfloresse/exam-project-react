import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../../validators/login.validator.ts';

const LoginForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (formData: LoginSchema) => {
        console.log(formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} />
                {errors.username?.message && <p>{errors.username?.message}</p>}
                <input type="text" {...register('password')} />
                {errors.password?.message && <p>{errors.password?.message}</p>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default LoginForm;
