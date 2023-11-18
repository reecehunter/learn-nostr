import { useRef, useEffect } from 'react'

export default (func, timeout = 500) => {
    const timerRef = useRef()

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])

    const debouncedFunc = (...args) => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => func(...args), timeout)
    }

    return debouncedFunc
}