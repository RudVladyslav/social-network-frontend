import { Avatar, Box, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SinglePost from '../components/SinglePost'
import CreatePostButton from '../components/Buttons/CreatePostButton'
import EditPostButton from '../components/Buttons/EditPostButton'
import DeletePostButton from '../components/Buttons/DeletePostButton'
import EditProfileButton from '../components/Buttons/EditProfileButton'
import ProfileSkeleton from '../components/Skeletons/ProfileSkeleton'
import { useSelector } from 'react-redux'
import { profileSelector } from '../store/slices/profile/selectors'
import imagePath from '../utils/imagePath'
import { postsSelector } from '../store/slices/posts/selectors'
import { useAppDispatch } from '../store'
import { fetchUsersPost } from '../store/slices/posts/slice'
import { appStatusSelector } from '../store/slices/app/selectors'
import { setStatusApp } from '../store/slices/app/slice'
import { Status } from '../store/slices/app/types'

const Profile: React.FC = () => {
  const { userData } = useSelector(profileSelector)
  const { userPosts } = useSelector(postsSelector)
  const appStatus = useSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const { firstName, lastName, image, followersCount, followingCount } = userData
  const userImagePath = imagePath(image)
  const userName = firstName + ' ' + lastName

  const fetchPosts = async (): Promise<void> => {
    dispatch(setStatusApp(Status.LOADING))
    await dispatch(fetchUsersPost())
    dispatch(setStatusApp(Status.NORMAL))
  }

  useEffect(() => {
    void fetchPosts()
  }, [])

  return (
        <>
            {appStatus !== 'loading'
              ? (
                    <>
                        <Paper sx={{
                          display: 'flex',
                          flexDirection: { sm: 'row', xs: 'column' },
                          justifyContent: 'space-between',
                          padding: 2
                        }}>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: { sm: 'row', xs: 'column' },
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                                <Avatar sx={{ width: 150, height: 150 }} src={userImagePath}/>
                                <Box sx={{ textAlign: { sm: 'left', xs: 'center' } }}>
                                    <Typography variant={'h5'} sx={{
                                      marginLeft: { sm: 2, xs: 0 },
                                      fontWeight: 'bold'
                                    }}>{userName}</Typography>
                                    <Typography variant={'subtitle2'} sx={{ marginLeft: { sm: 2, xs: 0 }, marginTop: 1 }}>
                                        <b>Ваш статус: </b>{userData.status === '' ? 'Статус отсутсвует' : userData.status}
                                    </Typography>
                                    <Typography variant={'subtitle2'} sx={{
                                      marginLeft: { sm: 2, xs: 0 },
                                      marginTop: 1
                                    }}>
                                      <b>Подписки: </b>{followingCount}
                                    </Typography>
                                    <Typography variant={'subtitle2'} sx={{
                                      marginLeft: { sm: 2, xs: 0 },
                                      marginTop: 1
                                    }}>
                                      <b>Подписчики: </b>{followersCount}
                                    </Typography>
                                </Box>
                            </Box>
                            <EditProfileButton/>
                        </Paper>

                        <CreatePostButton/>

                        {userPosts.length === 0
                          ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 25 }}>
                                <Typography variant='h5'>
                                    У вас пока нет публикаций
                                </Typography>
                            </Box>
                          : userPosts.map(({ id, text, image, updatedAt, likesCount }) => (
                                <SinglePost
                                    key={id}
                                    text={text}
                                    postImage={image}
                                    userImage={userImagePath}
                                    userName={userName}
                                    time={updatedAt}
                                >
                                  <Box sx={{ paddingLeft: { md: 2, xs: 0 } }}>
                                      <EditPostButton id={id}/>
                                      <DeletePostButton id={id}/>
                                  </Box>
                                  <Box sx={{ paddingRight: { md: 2, xs: 0 } }}>
                                    <Typography sx={{ fontSize: { md: 18, xs: 12 } }}>
                                       Всего понравилось {likesCount} раз
                                    </Typography>
                                  </Box>
                                </SinglePost>

                          ))}
                    </>
                )
              : (
                    <ProfileSkeleton/>
                )}
        </>
  )
}

export default Profile
