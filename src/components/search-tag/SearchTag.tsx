import crossIcon from '../../assets/icons/cross.svg';
import { FC } from 'react';

interface IProps {
    tag: string;
    onClear: () => void;
}

const SearchTag: FC<IProps> = ({ tag, onClear }) => {
    return (
        <div className="flex items-center gap-2 bg-blue-300/50 text-blue-700 rounded-full py-1 px-5">
            <div>Tag: {tag}</div>
            <button className="cursor-pointer mt-0.5" onClick={() => onClear()}>
                <img src={crossIcon} alt="cross" className="size-2.5" />
            </button>
        </div>
    );
};

export default SearchTag;
