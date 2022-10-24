import { Paper, Skeleton } from '@mui/material'
import React from 'react'

const CreatePostButtonSkeleton: React.FC = () => {
  return (
            <Paper style={{ display: 'flex', justifyContent: 'center', marginTop: 10, padding: 10 }}>
                <Skeleton variant="rounded" style={{ borderRadius: 25 }} sx={{ width: { md: 380, xs: 250 }, height: { md: 55, xs: 40 } }}/>
            </Paper>
  )
}

export default CreatePostButtonSkeleton
