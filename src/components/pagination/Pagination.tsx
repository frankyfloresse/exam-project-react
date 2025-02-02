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

    const isCanPrev = currentPage > 0;
    const isCanNext = currentPage < totalPages - 1;

    const onPrev = () => {
        if (isCanPrev) {
            onSkipChange(skip - limit);
        }
    };

    const onNext = () => {
        if (isCanNext) {
            onSkipChange(skip + limit);
        }
    };

    return (
        <div className="flex items-center gap-8 my-5">
            <button className="nav-button" disabled={!isCanPrev} onClick={onPrev}>
                Previous
            </button>
            <div>{currentPage + 1}</div>
            <button className="nav-button" disabled={!isCanNext} onClick={onNext}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
