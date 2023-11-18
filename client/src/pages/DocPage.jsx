import { useParams } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'
import GettingStarted from './docs/GettingStarted'

export default () => {
  const { docID } = useParams()

  // TODO: Change this entire system.
  // This is a temporary solution.
  // There is a better way to do this.

  switch(docID) {
    case 'getting-started': return <GettingStarted />
    default: return <NotFoundPage />
  }
}