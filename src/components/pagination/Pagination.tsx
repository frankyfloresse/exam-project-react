import { FC } from 'react';

interface IProps {
    skip: number;
    total: number;
    limit: number;
    onSkipChange: (newSkip: number) => void;
}

const Pagination: FC<IProps> = ({ skip, total, limit, onSkipChange }) => {
    const currentPage = skip / limit;
    const totalPages = Math.ceil(total / limit);

    const onPrev = () => {
        if (currentPage > 0) {
            onSkipChange(skip - limit);
        }
    };

    const onNext = () => {
        if (currentPage < totalPages - 1) {
            onSkipChange(skip + limit);
        }
    };

    return (
        <div>
            <button onClick={onPrev}>Prev</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
};

export default Pagination;
