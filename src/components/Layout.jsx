import { useEffect, useState } from 'react'
import SideNav from './navigation/SideNav'
import Notepad from './Notepad'
import Logo from './Logo'

export default ({ children }) => {
    const [windowTitle, setWindowTitle] = useState('Learn Nostr')

    // TODO: Replace this sytem.
    // It changes the section title to the default on page reload.
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.nodeName === 'TITLE') {
                    setWindowTitle(document.title.split('|')[0])
                }
            })
        })
        observer.observe(document, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-[250px_auto]'>
            <div className='md:h-screen'>
                <Logo className='border-b-[1px] border-gray-500' />
                <SideNav className='border-b-[1px] border-gray-500' />
                <Notepad className='border-b-[1px] border-gray-500' />
            </div>
            <div className='overflow-hidden border-l-[1px] border-gray-500'>
                <div className='p-5 border-b-[1px] border-gray-500'>
                    <h1 className='font-bold text-xl'>{windowTitle}</h1>
                </div>
                <div className='m-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}