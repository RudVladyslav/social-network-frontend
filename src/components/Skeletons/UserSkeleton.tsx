import React from 'react'
import { Box, Paper } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import SinglePostSkeleton from './SinglePostSkeleton'

const UserSkeleton: React.FC = () => {
  return (
        <>
            <Paper sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, justifyContent: 'space-between', padding: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, alignItems: 'center', justifyContent: 'center' }} >
                    <Skeleton variant="circular" width={150} height={150}/>
                    <Box sx={{ textAlign: { sm: 'left', xs: 'center' } }}>
                        <Skeleton variant="text" sx={{ margin: { sm: '0 0 0 16px', xs: '0 auto' } }} width={150} height={40}/>
                        <Skeleton variant="text" sx={{ margin: { sm: '8px 0 0 16px', xs: '0 auto' } }} width={120}/>
                        <Skeleton variant="text" sx={{ margin: { sm: '8px 0 0 16px', xs: '0 auto' }, marginTop: 1 }} width={120}/>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: { sm: 0, xs: 2 } }}>
                    <Skeleton variant="rounded"
                              width={150}
                              height={40}/>
                </Box>
            </Paper>
            <SinglePostSkeleton>
                <Skeleton variant="circular" width={30} height={30} />
            </SinglePostSkeleton>
        </>
  )
}

export default UserSkeleton
