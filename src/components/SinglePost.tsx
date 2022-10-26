import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import { CardActions } from '@mui/material'
import imagePath from '../utils/imagePath'
import converterDate from '../utils/converterDate'

interface SinglePostPropsType {
  children?: React.ReactNode
  text: string
  postImage: string
  userImage: string
  userName: string
  time: string
}

const SinglePost: React.FC<SinglePostPropsType> = ({
  children,
  postImage,
  text,
  userImage,
  time,
  userName
}) => {
  const postImagePath = imagePath(postImage)
  return (
        <Card sx={{ marginTop: 1 }}>
            <CardHeader
                avatar={
                    <Button>
                        <Avatar aria-label="recipe" src={userImage}/>
                    </Button>
                }
                title={userName}
                subheader={converterDate(time)}
            />
            {
                postImage !== '' &&
                    <CardMedia
                        component="img"
                        height="600"
                        image={postImagePath}
                        alt="Зображення публікації"
                    />
            }
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {children}
            </CardActions>
        </Card>
  )
}

export default SinglePost
