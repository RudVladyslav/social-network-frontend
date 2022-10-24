import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { CardActionArea, CardActions } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'

const UserItemSkeleton: React.FC = () => {
  return (
      <>
          {[...new Array(4)].map((_, index) => (
              <Grid xs={2} sm={4} md={3} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea style={{ color: '#000' }}>
                          <Skeleton variant="rectangular" sx={{ height: { xs: 180, md: 230 } }}/>
                          <CardContent>
                              <Typography textAlign="center" variant="h5" component="div">
                                  <Skeleton variant="text" sx={{ maxWidth: 250, margin: '0 auto' }}/>
                              </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                          <Skeleton variant="rounded" width={100} height={35}/>
                      </CardActions>
                  </Card>
              </Grid>
          ))}
      </>
  )
}

export default UserItemSkeleton
