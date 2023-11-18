import { useNavigate } from "react-router-dom"
import Button from "../components/input/Button"
import Doc from "../components/Doc"

export default () => {
    const navigate = useNavigate()

    const navigateToDocs = () => {
        navigate('/docs/getting-started')
    }

    return (
        <Doc title='Home'>
            <p>Nostr is the simplest open protocol that is able to create a censorship-resistant global "social" network once and for all.</p>
            <p>
                This website was created by
                {' '}<a href='https://njump.me/npub1m5qvj2wj5t436tzvgvavturclnx6xwuv7w0gwquvmqjawffqc2usl6asqn' target='_blank' rel='noreferrer'>Reece</a>{' '}
                as a way to document his process of learning about the Nostr protocol for others to learn from.
            </p>
            <div>
                <Button onClick={navigateToDocs}>Start Learning</Button>
            </div>
        </Doc>
    )
}