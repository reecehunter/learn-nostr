import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default ({ variant='single', category, links, title, path }) => {
    const location = useLocation()
        
    const [open, setOpen] = useState(true)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>

                {
                    variant === 'parent' ?
                        <div
                            className='w-full cursor-pointer flex items-center justify-between'
                            onClick={toggleOpen}
                        >
                            <p>{variant === 'parent' ? category : title}</p>
                            <span className='hover:text-orange-300' >
                                {open ? 'v' : '^'}
                            </span>
                        </div>
                    :
                        <Link
                            to={path}
                            className={`${location.pathname === path ? 'text-orange-300' : '!text-[#bbb5ac]'} hover:!text-orange-300`}
                        >
                            {title}
                        </Link>
                }

            </div>
            {variant === 'parent' && <ul className={`${open ? 'flex' : 'hidden'}`}>
                {links.map((link) => (
                    <li key={link.title} className='ml-5 hover:text-orange-300 hover:underline'>
                        <Link
                            to={link.path}
                            className={`${location.pathname === link.path ? 'text-orange-300' : '!text-[#bbb5ac]'}`}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>}
        </div>
    )
}