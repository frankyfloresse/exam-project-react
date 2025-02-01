import { useForm } from 'react-hook-form';
import { FC } from 'react';

interface IProps {
    onTextSearch?: (text: string) => void;
    onIdSearch?: (id: string) => void;
    placeholder: string;
}

interface IForm {
    search: string;
}

const SearchBar: FC<IProps> = ({ onTextSearch, onIdSearch, placeholder }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IForm>();

    const onSubmit = ({ search }: IForm) => {
        if (/^\d+$/.test(search)) {
            onIdSearch?.(search);
        } else {
            onTextSearch?.(search);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
                <div>
                    <input
                        {...register('search')}
                        className="block px-5 py-2 shadow-xs sm:w-[350px] text-gray-800 bg-transparent border border-gray-300 focus:border-blue-400 rounded-[6px] placeholder-gray-400 focus:outline-none"
                        placeholder={placeholder}
                    />
                    {errors.search?.message && <p>{errors.search?.message}</p>}
                </div>
                <button className="py-1.5 px-4.5 rounded-[6px] bg-blue-500 hover:bg-blue-600 text-white" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
