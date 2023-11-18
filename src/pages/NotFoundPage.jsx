import { useNavigate } from 'react-router-dom'
import Button from '../components/input/Button'

export default () => {
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    return (
        <div className='flex flex-col gap-5'>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <div>
                <Button onClick={navigateToHome}>Go Home</Button>
            </div>
        </div>
    )
}