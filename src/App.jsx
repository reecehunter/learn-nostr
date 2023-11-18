import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import DocPage from './pages/DocPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/docs/:docID' element={<DocPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
