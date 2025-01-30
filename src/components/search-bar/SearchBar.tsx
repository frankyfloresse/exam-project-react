import { useForm } from 'react-hook-form';
import { SearchSchema, searchSchema } from '../../validators/search.validator.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';

interface IProps {
    onTextSearch: (text: string) => void;
    onIdSearch: (id: string) => void;
}

const SearchBar: FC<IProps> = ({ onTextSearch, onIdSearch }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = ({ search }: SearchSchema) => {
        if (/^\d+$/.test(search)) {
            onIdSearch(search);
        } else {
            onTextSearch(search);
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
