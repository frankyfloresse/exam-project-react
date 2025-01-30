import { useForm } from 'react-hook-form';
import { FC } from 'react';

interface IProps {
    onTextSearch?: (text: string) => void;
    onIdSearch?: (id: string) => void;
}

interface IForm {
    search: string;
}

const SearchBar: FC<IProps> = ({ onTextSearch, onIdSearch }) => {
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('search')} />
                {errors.search?.message && <p>{errors.search?.message}</p>}
            </form>
        </div>
    );
};

export default SearchBar;
