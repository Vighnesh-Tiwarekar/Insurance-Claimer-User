import { RouterProvider } from 'react-router-dom'
import './css/App.css'
import { Router } from './routes/Router'
import { AuthContext } from './context/AuthContext'
import { useEffect, useState } from 'react'
import { LoadingPage } from './pages/LoadingPage'

function App() {

  const [login, setlogin] = useState(0)

  const [isloading, setLoading] = useState(false)

  useEffect(() => {

  }, [])

  if (isloading) {
    return (
      <LoadingPage></LoadingPage>
    )
  }

  return (
    <>
      <AuthContext.Provider value={{ login, setlogin }}>
        <RouterProvider router={Router}></RouterProvider>
      </AuthContext.Provider>
    </>
  )
}

export default App
