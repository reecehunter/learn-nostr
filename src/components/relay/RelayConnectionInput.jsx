import { useState } from 'react'
import Button from '../input/Button'
import TextInput from '../input/TextInput'
import { useConnectWebSocket, useDisconnectWebSocket, WebSocketProvider } from '../../contexts/WebsocketContext'

export default () => {
    const connectToRelay = useConnectWebSocket()
    const disconnectFromRelay = useDisconnectWebSocket()

    const [url, setURL] = useState(import.meta.env.VITE_PUBLIC_RELAY_WEBSOCKET_URL)
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)

    const connect = async () => {
        setLoading(true)
        try {
            await connectToRelay(url)
            setConnected(true)
            alert('Successfully connected to: ' + url)
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const disconnect = async () => {
        setLoading(true)
        try {
            await disconnectFromRelay()
            setConnected(false)
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex gap-5'>
            <TextInput
                className='w-1/3'
                defaultValue={import.meta.env.VITE_PUBLIC_RELAY_WEBSOCKET_URL}
                placeholder='Relay WebSocket URL'
                onChange={(e) => setURL(e.target.value)}
            />
            <div>
                <Button
                    onClick={connected ? disconnect : connect}
                    disabled={loading}
                >
                    {connected ? 'Disconnect From Relay' : 'Connect To Relay'}
                </Button>
            </div>
        </div>
    )
}