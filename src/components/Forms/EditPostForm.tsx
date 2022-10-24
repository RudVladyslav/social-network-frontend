import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField, Typography
} from '@mui/material'
import { useAppDispatch } from '../../store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePostParams } from '../../store/slices/profile/types'
import { fetchUpdatePost } from '../../store/slices/posts/slice'
import { updatePostParams } from '../../store/slices/posts/types'
import axios from '../../axios'
import imagePath from '../../utils/imagePath'
import { theme } from '../../theme'

interface UpdatePostFormParams {
  setOpen: (visible: boolean) => void
  id: number
}

const EditPostForm: React.FC<UpdatePostFormParams> = ({ setOpen, id }) => {
  const [updatedPost, setUpdatedPost] = useState<updatePostParams>({ image: '', text: '' })
  const [isLoading, setIsLoading] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const dispatch = useAppDispatch()

  const FetchUpdatedPost = async (): Promise<void> => {
    setIsLoading(true)
    const { data } = await axios.get(`api/posts/single/${id}`)
    setUpdatedPost(data)
    setIsLoading(false)
  }

  useEffect(() => {
    void FetchUpdatedPost()
  }, [])

  useEffect(() => {
    setValue('text', updatedPost?.text)
    setValue('image', imagePath(updatedPost.image))
    if (imgRef.current !== null) {
      imgRef.current.src = getValues('image')
    }
  }, [updatedPost])

  const {
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm<CreatePostParams>({
    defaultValues: {
      text: '',
      image: ''
    },
    mode: 'onChange'
  })

  const fileReader = (file: any): void => {
    if (file.length === 0) {
      if (imgRef.current !== null) {
        imgRef.current.src = ''
        return
      }
    }
    const reader = new FileReader()
    reader.addEventListener('load',
      (event: any) => {
        if (imgRef.current !== null) {
          imgRef.current.src = event.target.result
        }
      })
    reader.readAsDataURL(file[0])
  }

  const onSubmit: SubmitHandler<CreatePostParams> = async (values) => {
    setIsLoading(true)
    values.image = values.image[0]
    const formData = new FormData()
    formData.append('image', values.image)
    formData.append('text', values.text)
    await dispatch(fetchUpdatePost({ formData, id }))
    setOpen(false)
    setIsLoading(false)
  }
  return (
        <>
            <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
              <Typography variant='h6' sx={{ color: theme.palette.primary.main }}>
                Редактировать пост
              </Typography>
            </Box>
            {isLoading
              ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}><CircularProgress color="primary" /></Box>
              : <form onSubmit={handleSubmit(onSubmit)} action="">
                    <Card>
                        <CardMedia
                            component="img"
                            height="250"
                            ref={imgRef}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <input
                                {...register('image')}
                                type='file'
                                onChange={(e) => fileReader(e.target.files)}
                            />
                        </Box>
                        <CardContent>
                            <TextField
                                label={'Редактировать описания пост'}
                                variant="outlined"
                                maxRows={10}
                                multiline
                                fullWidth
                                {...register('text', { required: 'Описания поста' })}
                            />
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='contained' type='submit' disabled={isLoading}>Сохранить</Button>
                            <Button variant='contained' color='error' onClick={() => setOpen(false)}>Отмена</Button>
                        </CardActions>
                    </Card>
                </form>
            }

        </>
  )
}

export default EditPostForm
