import React, { useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import UserItem from '../components/UserItem'
import { Box, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { usersSelector } from '../store/slices/users/selectors'
import { useAppDispatch } from '../store'
import { setStatusApp } from '../store/slices/app/slice'
import { Status } from '../store/slices/app/types'
import { appStatusSelector } from '../store/slices/app/selectors'
import UserSkeleton from '../components/Skeletons/UserItemSkeleton'
import { fetchAllUsers } from '../store/slices/users/slice'

const Followers: React.FC = () => {
  const { followers } = useSelector(usersSelector)
  const appStatus = useSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const fetchFollowers = async (): Promise<void> => {
    dispatch(setStatusApp(Status.LOADING))
    await dispatch(fetchAllUsers())
    dispatch(setStatusApp(Status.NORMAL))
  }

  useEffect(() => {
    void fetchFollowers()
  }, [])

  return (
      <>
        <Paper sx={{ padding: 1, marginBottom: 1, textAlign: 'center' }}>
            <Typography variant={'h5'} sx={{ fontSize: { md: 28, xs: 22 } }}>Ваши подписчики</Typography>
        </Paper>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {appStatus !== Status.LOADING
                  ? (
                      followers.length !== 0 && followers.map(({ id, image, firstName, lastName, following }) => {
                        const userName = `${firstName} ${lastName}`
                        return (
                          <Grid xs={2} sm={4} md={3} key={id}>
                              <UserItem id={id} userName={userName} image={image} followed={following}/>
                          </Grid>
                        )
                      })
                    )
                  : (<UserSkeleton/>)
                }
            </Grid>
            {followers.length === 0 && appStatus !== Status.LOADING &&
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 30 }}>
                  <Typography variant='h5'>
                    У вас нету подписчиков
                  </Typography>
                </Box>
            }
        </Box>
      </>
  )
}

export default Followers
