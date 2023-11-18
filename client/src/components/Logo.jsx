import { Link } from 'react-router-dom'
import NostrIcon from './icons/NostrIcon'

export default ({ className }) => {
    return (
        <Link to='/' className={`flex gap-5 items-center p-5 ${className}`}>
            <NostrIcon className='w-[28px]' fill='#fdba74' stroke='#fdba74' />
            <h2 className='font-bold text-xl text-[#e7dfd3]'>Learn Nostr</h2>
        </Link>
    )
}