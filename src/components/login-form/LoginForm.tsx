import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../../validators/login.validator.ts';
import { useAppDispatch } from '../../redux/hooks/useAppDispatch.ts';
import { authSliceActions } from '../../redux/slices/authSlice.ts';
import { useAppSelector } from '../../redux/hooks/useAppSelector.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const dispatch = useAppDispatch();
    const { authUser } = useAppSelector(({ authSlice }) => authSlice);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate('/');
        }
    }, [authUser]);

    const onSubmit = (formData: LoginSchema) => {
        dispatch(authSliceActions.authLogin({ ...formData, expiresInMins: 1 }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen full-height py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[350px]">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-gray-500 text-sm font-bold" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            {...register('username')}
                            className={`base-input ${errors.username && '!border-red-500'}`}
                        />
                        {errors.username?.message && <p className="text-red-500 text-xs">{errors.username?.message}</p>}
                    </div>

                    <div className="mt-5">
                        <label className="block text-gray-500 text-sm font-bold" htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            {...register('password')}
                            className={`base-input ${errors.password && '!border-red-500'}`}
                        />
                        {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
                    </div>

                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 w-full rounded-[7px] mt-6">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center bg-gray-300/50 border-1 border-gray-300 rounded-[6px] p-4">
                    <p className="text-gray-600 text-sm">Use these demo credentials to log in:</p>
                    <p className="text-gray-600 text-sm mt-3 font-mono">Username: emilys</p>
                    <p className="text-gray-600 text-sm font-mono">Password: emilyspass</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
