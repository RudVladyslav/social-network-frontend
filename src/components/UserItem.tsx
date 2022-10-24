import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions } from '@mui/material'
import nonameAvatar from '../assets/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import imagePath from '../utils/imagePath'
import FollowButton from './Buttons/FollowButton'
import UnfollowButton from './Buttons/UnfollowButton'

interface FriendItemPropsType {
  id: number
  userName: string
  image: string
  followed?: boolean
}

const UserItem: React.FC<FriendItemPropsType> = ({ id, userName, image, followed }) => {
  const userImagePath = imagePath(image)
  const navigate = useNavigate()

  const onClickItem = (): void => navigate(`/users/${id}`)

  return (
        <Card sx={{ maxWidth: 345 }}>
                <CardActionArea style={{ color: '#000' }} onClick={onClickItem}>
                    <CardMedia
                        sx={{ height: { xs: 180, md: 230 } }}
                        component={'img'}
                        image={userImagePath !== '' ? userImagePath : nonameAvatar}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography textAlign="center" variant="h5" component="div">
                            {userName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                {(followed === false)
                  ? <FollowButton id={id}/>
                  : <UnfollowButton id={id}/>
                }

            </CardActions>
        </Card>
  )
}

export default UserItem
