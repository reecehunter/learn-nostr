import { forwardRef } from "react"

export default forwardRef(({ placeholder, defaultValue, onChange, className }, ref) => {
    return (
        <input
            ref={ref}
            type='text'
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`p-2 rounded-sm outline-gray-500 ${className}`}
            onChange={onChange}
        />
    )
})