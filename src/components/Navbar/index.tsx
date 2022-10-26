import React from 'react'
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { useSelector } from 'react-redux'
import { profileSelector } from '../../store/slices/profile/selectors'
import imagePath from '../../utils/imagePath'

interface NavbarItem {
  path: string
  title: string
  Icon: any
}

const navbarItems: NavbarItem[] = [
  {
    path: '/',
    title: 'Головна',
    Icon: HomeIcon
  },
  {
    path: '/users',
    title: 'Пошук друзів',
    Icon: PersonSearchIcon
  },
  {
    path: '/following',
    title: 'Підписки',
    Icon: ConnectWithoutContactIcon
  },
  {
    path: '/followers',
    title: 'Читачі',
    Icon: PeopleIcon
  }

]

const Navbar: React.FC = () => {
  const { userData: { firstName, lastName, image } } = useSelector(profileSelector)
  const imageSrc = imagePath(image)

  return (
      <Paper sx={{ marginTop: 1, marginBottom: 1 }}>
            <Stack direction="row" alignItems='center' justifyContent='center'>
                <Link className={styles.link} to='/profile'>
                        <Button sx={{ paddingTop: 2, paddingBottom: 2 }} >
                            <Avatar src={imageSrc}/>
                            <Typography sx={{ marginLeft: 1, display: { xs: 'none', md: 'block' } }} variant={'h6'}>
                                {firstName} {lastName}
                            </Typography>
                        </Button>
                </Link>
                {navbarItems.map(({ path, title, Icon }, index) =>
                    <Link key={index} className={styles.link} to={path}>
                        <Button sx={{ paddingTop: 2, paddingBottom: 2 }}>
                            <Icon fontSize="large"/>
                            <Typography sx={{ marginLeft: 1, display: { xs: 'none', md: 'block' } }} variant={'h6'}>
                                {title}
                            </Typography>
                        </Button>
                    </Link>
                )}
            </Stack>
      </Paper>
  )
}

export default Navbar
