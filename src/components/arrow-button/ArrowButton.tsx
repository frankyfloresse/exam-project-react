import { FC } from 'react';

interface IProps {
    text: string;
}

const ArrowButton: FC<IProps> = ({ text }) => {
    return (
        <div className="group relative inline-flex items-center overflow-hidden rounded-lg bg-indigo-600 px-8 py-4 text-white focus:outline-none focus:ring active:bg-indigo-500">
            <span className="absolute -end-full transition-all group-hover:end-4">→</span>
            <span className="text-sm font-medium transition-all group-hover:me-4">{text}</span>
        </div>
    );
};

export default ArrowButton;
