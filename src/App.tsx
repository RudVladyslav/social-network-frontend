import React, { useEffect } from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchUsers from './pages/SearchUsers'
import User from './pages/User'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { Box, Container, LinearProgress } from '@mui/material'
import { useAppDispatch } from './store'
import MainPage from './pages/MainPage'
import Following from './pages/Following'
import Followers from './pages/Followers'
import { appSelector, appStatusSelector } from './store/slices/app/selectors'
import { setIsAuth, setStatusApp } from './store/slices/app/slice'
import { Status } from './store/slices/app/types'
import { theme } from './theme'
import { fetchProfileData } from './store/slices/profile/slice'

const App: React.FC = () => {
  const { isAuth } = useSelector(appSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const appStatus = useSelector(appStatusSelector)
  const { pathname } = useLocation()

  const fetchUserData = async (): Promise<void> => {
    dispatch(setStatusApp(Status.LOADING))
    await dispatch(fetchProfileData())
    dispatch(setStatusApp(Status.NORMAL))
  }

  const firstRenderApp = (path: string): void => {
    void fetchUserData()
    navigate(path)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      dispatch(setIsAuth(true))
    }
  }, [])

  useEffect(() => {
    isAuth
      ? pathname === '/signIn' || pathname === '/signUp'
        ? firstRenderApp('/')
        : firstRenderApp(pathname)
      : navigate('/signIn')
  }, [isAuth])

  return (
    <Container maxWidth='xl' sx={{
      backgroundColor: theme.palette.secondary.main,
      borderRadius: { md: 10, xs: 5 },
      paddingTop: 3,
      paddingBottom: 3,
      minHeight: '96vh'
    }}>
        <Header isAuth={isAuth}/>
        <Box sx={{ height: 2 }}>
            {appStatus === Status.LOADING && <LinearProgress/>}
        </Box>

        {!isAuth
          ? (
                <Routes>
                    <Route path="/signIn" element={<SignIn/>}/>
                    <Route path="/signUp" element={<SignUp/>}/>
                </Routes>
            )
          : (
            <>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/users" element={<SearchUsers/>}/>
                    <Route path="users/:id" element={<User/>}/>
                    <Route path="following" element={<Following/>}/>
                    <Route path="followers" element={<Followers/>}/>
                </Routes>

            </>
            )
        }
    </Container>
  )
}

export default App
