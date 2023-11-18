import { useEffect, useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

export default ({ className }) => {
    const textAreaRef = useRef(null)
    const [notes, setNotes] = useState('')

    const debouncedSave = useDebounce((text) => {
        localStorage.setItem('notes', text)
    }, 500)

    const onChange = (event) => {
        setNotes(event.target.value)
        debouncedSave(event.target.value)
    }

    const setTextAreaHeight = () => {
        if(!textAreaRef.current) return
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }

    useEffect(() => {
        const savedNotes = localStorage.getItem('notes')
        if(!savedNotes) return
        setNotes(savedNotes)
        setTextAreaHeight()
    }, [])

    useEffect(() => {
        setTextAreaHeight()
    }, [notes])

    return (
        <div className={`${className}`}>
            <div className='m-5 mb-0'>
                <h2 className='font-bold'>Notepad</h2>
            </div>
            <textarea
                ref={textAreaRef}
                className='w-full min-h-[100px] md:min-h-[200px] p-5 bg-transparent outline-none placeholder-[#bbb5ac] resize-none'
                placeholder='Type stuff here...'
                defaultValue={notes}
                onChange={onChange}
            />
        </div>
    )
}