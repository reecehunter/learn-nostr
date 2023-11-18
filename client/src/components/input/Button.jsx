export default ({ className, children, onClick, disabled }) => {
    return (
        <button
            className={`px-4 py-2 text-[#242424] rounded-sm ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-300'} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}