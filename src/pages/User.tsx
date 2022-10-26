import React, { useEffect, useState } from 'react'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import SinglePost from '../components/SinglePost'
import UserSkeleton from '../components/Skeletons/UserSkeleton'
import axios from '../axios'
import { useParams } from 'react-router-dom'
import { Post } from '../store/slices/profile/types'
import imagePath from '../utils/imagePath'
import FollowButton from '../components/Buttons/FollowButton'
import UnfollowButton from '../components/Buttons/UnfollowButton'

interface UserData {
  id: number
  firstName: string
  lastName: string
  image: string
  status: string
  createdAt: string
  updatedAt: string
  following: boolean
  followingCount: number
  followersCount: number
  posts: Post[]
}

const User: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFollowed, setIsFollowed] = useState(false)
  const [posts, setPosts] = useState([])
  const [followersCount, setFollowersCount] = useState(0)
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    firstName: '',
    lastName: '',
    image: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    following: false,
    followingCount: 0,
    followersCount: 0,
    posts: []
  })
  const params = useParams()

  const { firstName, lastName, image, status, followingCount, id } = userData

  const userName = firstName + ' ' + lastName
  const userImagePath = imagePath(image)

  const fetchUserData = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`/api/users/${String(params.id)}`)
      setUserData(data.user)
      setIsFollowed(data.user.following)
      setFollowersCount(data.user.followersCount)
      setPosts(data.posts)
      setIsLoading(false)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    void fetchUserData()
  }, [])

  return (
        <>
            {!isLoading
              ? (<>
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
                                    <b>Статус: </b>{status !== '' ? status : 'Статус отсутсвует'}</Typography>
                                <Typography variant={'subtitle2'} sx={{ marginLeft: { sm: 2, xs: 0 }, marginTop: 1 }}>
                                    <b>Підписки: </b>{followingCount}
                                </Typography>
                                <Typography variant={'subtitle2'} sx={{ marginLeft: { sm: 2, xs: 0 }, marginTop: 1 }}>
                                    <b>Читачі: </b>{followersCount}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          marginTop: { sm: 0, xs: 2 }
                        }}>
                            {!isFollowed
                              ? <FollowButton onClick={() => {
                                setFollowersCount(prevState => prevState + 1)
                                setIsFollowed(prevState => !prevState)
                              }} id={id}/>
                              : <UnfollowButton onClick={() => {
                                setFollowersCount(prevState => prevState - 1)
                                setIsFollowed(prevState => !prevState)
                              }} id={id}/>}
                        </Box>
                    </Paper>
                    {
                      posts.length === 0
                        ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 20 }}>
                              <Typography variant='h5'>
                                  Пока немає публікацій
                              </Typography>
                          </Box>
                        : posts.map(({ id, text, image, updatedAt }) =>
                            <SinglePost
                                key={id}
                                text={text}
                                postImage={image}
                                userImage={userImagePath}
                                userName={userName}
                                time={updatedAt}
                            >
                            </SinglePost>
                        )
                    }

                </>)
              : <UserSkeleton/>
            }
        </>

  )
}

export default User
