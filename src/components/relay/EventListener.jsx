import { useEffect, useState } from 'react'
import Button from '../input/Button'
import JSONDisplay from '../JSONDisplay'
import { useWebSocket } from '../../contexts/WebsocketContext'

export default () => {
    const relay = useWebSocket()

    const [sub, setSub] = useState(null)
    const [events, setEvents] = useState([])

    // const subId = '09234529875098'

    const subscribe = async () => {
        if(!relay) return alert('You must connect to a relay first.')

        let sub = relay.sub([
            {
              kinds: [1],
              limit: 5,
            },
        ])

        sub.on('event', (event) => {
            setEvents(prev => [...prev, event])
        })

        setSub(sub)
    }

    const unsubscribe = () => {
        if(!sub) return
        sub.unsub()
        setSub(null)
    }

    useEffect(() => {
        if(relay) return
        setEvents([])
        setSub(null)
    }, [relay])

    return (
        <>
            <div>
                <Button
                    onClick={sub ? unsubscribe : subscribe}
                    disabled={!relay}
                >
                    {sub ? 'Unsubscribe From Events' : 'Subscribe To Events'}
                </Button>
            </div>
            <div className={`max-h-[250px] rounded-sm overflow-auto bg-[#403c3c] ${events.length > 0 ? 'p-2' : ''}`}>
               {relay && events?.map((event) => (
                    <JSONDisplay key={event.id} json={event} className='mb-2' />
                ))}
            </div>
        </>
    )
}