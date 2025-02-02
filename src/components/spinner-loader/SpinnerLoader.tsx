import spinner from '../../assets/icons/spinner.svg';

const SpinnerLoader = () => {
    return (
        <div className="full-height flex items-center justify-center flex-col gap-3">
            <img src={spinner} alt="spinner" className="size-16" />
            <div className="text-sm font-semibold">Loading</div>
        </div>
    );
};

export default SpinnerLoader;
