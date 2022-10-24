import React from 'react'
import CardHeader from '@mui/material/CardHeader'
import Skeleton from '@mui/material/Skeleton'
import CardContent from '@mui/material/CardContent'
import { CardActions } from '@mui/material'
import Card from '@mui/material/Card'

interface SinglePostSkeletonPropsType { children?: React.ReactNode }

const SinglePostSkeleton: React.FC<SinglePostSkeletonPropsType> = ({ children }) => {
  return (
            <Card style={{ marginTop: 10 }}>
                <CardHeader
                    avatar={
                        <Skeleton variant="circular" width={45} height={45} />
                    }
                    title={<Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: 100 }} />}
                    subheader={<Skeleton variant="text" sx={{ fontSize: '1rem', maxWidth: 150 }} />}
                />
                <Skeleton variant="rectangular" height={400} />

                <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </CardContent>
                <CardActions disableSpacing>
                    {children}
                </CardActions>
            </Card>
  )
}

export default SinglePostSkeleton
