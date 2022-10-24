import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import CreatePostButton from '../components/Buttons/CreatePostButton'
import { Box, Typography } from '@mui/material'
import MainPageSkeleton from '../components/Skeletons/MainPageSkeleton'
import SinglePost from '../components/SinglePost'
import LikePostButton from '../components/Buttons/LikePostButton'
import imagePath from '../utils/imagePath'
import UnlikePostButton from '../components/Buttons/UnlikePostButton'
import { fetchPostsWall } from '../store/slices/posts/slice'
import { postsSelector } from '../store/slices/posts/selectors'
import { setStatusApp } from '../store/slices/app/slice'
import { appStatusSelector } from '../store/slices/app/selectors'
import { Status } from '../store/slices/app/types'

const MainPage: React.FC = () => {
  const appStatus = useSelector(appStatusSelector)
  const { postsWall } = useSelector(postsSelector)
  const { userPosts } = useSelector(postsSelector)
  const dispatch = useAppDispatch()

  const getPostsWall = async (): Promise<void> => {
    dispatch(setStatusApp(Status.LOADING))
    await dispatch(fetchPostsWall())
    dispatch(setStatusApp(Status.NORMAL))
  }

  useEffect(() => {
    void getPostsWall()
  }, [userPosts])

  return (
        <>
            {appStatus !== Status.LOADING
              ? (
                  <Box>
                      <CreatePostButton/>
                      {postsWall.length === 0
                        ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                              <Typography variant='h5'>
                                  У вас нету подписок
                              </Typography>
                          </Box>
                        : postsWall.map(({ image, likesCount, text, updatedAt, id, user, liked }) => {
                          const userImage = imagePath(user.image)
                          const userName = `${user.firstName} ${user.lastName}`
                          return (
                            <SinglePost key={id} postImage={image} text={text}
                                        time={updatedAt} userImage={userImage}
                                        userName={userName} >
                              {!liked ? <LikePostButton id={id} /> : <UnlikePostButton id={id}/>}
                              <Typography sx={{ paddingRight: 2 }}>Понравилось {likesCount} раз</Typography>
                            </SinglePost>
                          )
                        }
                        )
                      }
                  </Box>
                )
              : (
                    <MainPageSkeleton/>
                )}
        </>
  )
}

export default MainPage
