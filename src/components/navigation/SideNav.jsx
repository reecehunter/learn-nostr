import SideNavSection from './SideNavSection'

export default ({ className }) => {
    const nips = [
        { title: 'NIP-01', path: '/docs/NIP-01' }
    ]

    return (
        <div className={`${className}`}>
            <div className='m-5'>
                <div className='mb-5'>
                    <h2 className='font-bold'>Navigation</h2>
                </div>

                <div className='flex flex-col gap-2'>
                    <SideNavSection
                        variant='single'
                        title='Home'
                        path='/'
                    />
                    <SideNavSection
                        variant='single'
                        title='Getting Started'
                        path='/docs/getting-started'
                    />

                    {/* <SideNavSection
                        variant='parent'
                        category='NIPs'
                        links={nips}
                    /> */}
                </div>
            </div>
        </div>
    )
}