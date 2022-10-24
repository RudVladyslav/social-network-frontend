import React from 'react'
import SinglePostSkeleton from './SinglePostSkeleton'
import { Box, Skeleton } from '@mui/material'
import CreatePostButtonSkeleton from './CreatePostButtonSkeleton'

const MainPageSkeleton: React.FC = () => {
  return (

        <Box>
            <CreatePostButtonSkeleton/>
            {new Array(2).fill('').map((_, index) => <SinglePostSkeleton key={index}>
                <Skeleton variant="circular"/>
            </SinglePostSkeleton>)}
        </Box>
  )
}

export default MainPageSkeleton
