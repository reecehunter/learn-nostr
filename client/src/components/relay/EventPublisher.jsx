import { useState } from "react"
import Button from "../input/Button"
import TextInput from "../input/TextInput"
import { finishEvent } from 'nostr-tools'
import { useWebSocket } from "../../contexts/WebsocketContext"

export default ({ keys }) => {
    const relay = useWebSocket()

    const [message, setMessage] = useState('Hello World!')
    const [publishing, setPublishing] = useState(false)

    const publishMessage = async () => {
        if(!relay) return alert('You must connect to a relay.')
        if(!keys.privateKey) return alert('You must generate a private key first.')
        if(!keys.publicKey) return alert('You must generate a public key first.')
  
        setPublishing(true)
  
        const event = {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: message,
        }
  
        const signedEvent = finishEvent(event, keys.privateKey)
        relay.publish(signedEvent)
        setPublishing(false)
        alert('Successfully published.')
    }

    return (
        <div className='flex gap-5'>
            <TextInput
                className='w-2/3'
                defaultValue='Hello World!'
                placeholder='Enter your message here...'
                onChange={(e) => setMessage(e.target.value)}
            />
            <div>
                <Button
                onClick={publishMessage}
                disabled={!relay || publishing}
                >
                    Send Message
                </Button>
            </div>
        </div>
    )
}