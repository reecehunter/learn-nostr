import { useEffect } from "react"

export default ({ title, children }) => {

    useEffect(() => {
        document.title = `${title} | Learn Nostr`
    })

    return (
        <div className='flex flex-col gap-5'>
            {children}
        </div>
    )
}