import React, { useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import UserItem from '../components/UserItem'
import UserSkeleton from '../components/Skeletons/UserItemSkeleton'
import { useSelector } from 'react-redux'
import { usersSelector } from '../store/slices/users/selectors'
import { useAppDispatch } from '../store'
import { fetchAllUsers } from '../store/slices/users/slice'
import { appStatusSelector } from '../store/slices/app/selectors'
import { Status } from '../store/slices/app/types'
import { setStatusApp } from '../store/slices/app/slice'
import { Box, Typography } from '@mui/material'
import SearchForm from '../components/Forms/SearchForm'

const SearchUsers: React.FC = () => {
  const appStatus = useSelector(appStatusSelector)
  const { allUsers, searchUsers, searchMessage } = useSelector(usersSelector)
  const dispatch = useAppDispatch()

  const fetchUsers = async (): Promise<void> => {
    dispatch(setStatusApp(Status.LOADING))
    await dispatch(fetchAllUsers())
    dispatch(setStatusApp(Status.NORMAL))
  }

  useEffect(() => {
    void fetchUsers()
  }, [])

  return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 1 }}>
                <SearchForm/>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {appStatus !== Status.LOADING
                  ? (searchMessage !== ''
                      ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 20 }}>
                                <Typography variant='h5'>
                                    {searchMessage}
                                </Typography>
                            </Box>
                      : searchUsers.length > 0
                        ? <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                            {searchUsers.map(({ id, image, firstName, lastName, following }) => (
                                <Grid xs={2} sm={4} md={3} key={id}>
                                    <UserItem
                                            id={id}
                                          followed={following}
                                          userName={`${firstName} ${lastName}`}
                                          image={image}/>
                                </Grid>
                            ))}
                        </Grid>

                        : <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                                    {allUsers.map(({ id, image, firstName, lastName, following }) => (
                                        <Grid xs={2} sm={4} md={3} key={id}>
                                            <UserItem id={id}
                                                      followed={following}
                                                      userName={`${firstName} ${lastName}`}
                                                      image={image}/>
                                        </Grid>
                                    ))
                                    }
                                </Grid>

                    )
                  : (<Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                            <UserSkeleton/>
                        </Grid>
                    )}
            </Box>
        </>
  )
}

export default SearchUsers
