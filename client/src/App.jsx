import { RouterProvider } from 'react-router-dom'
import './css/App.css'
import { Router } from './routes/Router'
import { AuthContext } from './context/AuthContext'
import { useEffect, useState } from 'react'
import { LoadingPage } from './pages/LoadingPage'
import { validate_login } from './functions/login_functions'

function App() {

  const [login, setlogin] = useState(false)

  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    
    const checkAuth = async () => {

      const check_login = await validate_login()

      if (check_login) {
        setlogin(true)
      } else {
        setlogin(false)
      }

      setLoading(false)
    }

    checkAuth()
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
