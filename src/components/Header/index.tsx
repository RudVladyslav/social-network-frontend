import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.scss'
import { Avatar, Box, Button } from '@mui/material'
import { useAppDispatch } from '../../store'

import { useSelector } from 'react-redux'
import { profileSelector } from '../../store/slices/profile/selectors'
import imagePath from '../../utils/imagePath'
import { setIsAuth } from '../../store/slices/app/slice'
import { theme } from '../../theme'

interface HeaderProps {
  isAuth: boolean
}

const Header: React.FC<HeaderProps> = ({ isAuth }) => {
  const dispatch = useAppDispatch()
  const { userData: { image } } = useSelector(profileSelector)

  const logoutHandler = (): void => {
    localStorage.removeItem('token')
    dispatch(setIsAuth(false))
  }
  const imageSrc = imagePath(image)
  const { pathname } = useLocation()

  return (
        <Box>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.primary.main }}>
                    SocialNetwork
                </Typography>
                {isAuth
                  ? (<>
                        <Button sx={{ marginRight: 1, display: { md: 'block', xs: 'none' } }}>
                            <Link to='/profile'>
                                <Avatar alt="Remy Sharp" src={imageSrc}/>
                            </Link>
                        </Button>
                        <Button variant='contained' color="primary" onClick={logoutHandler}>Выйти</Button>
                    </>
                    )
                  : (<Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {pathname === '/signUp'
                              ? <Button variant='contained' color="primary" >
                                    <Link className={styles.link} to={'/signIn'}>Войти</Link>
                                </Button>
                              : <Button variant='contained' color="primary">
                                    <Link className={styles.link} to={'/signUp'}>Регистрация</Link>
                                </Button>
                            }
                    </Box>
                    )}
            </Toolbar>
        </Box>
  )
}

export default Header
