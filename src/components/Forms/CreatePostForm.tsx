import React, { useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePostParams } from '../../store/slices/profile/types'
import { useAppDispatch } from '../../store'
import { fetchCreatePost } from '../../store/slices/posts/slice'
import { theme } from '../../theme'

interface CreatePostFormParams {
  setOpen: (visible: boolean) => void
}

const CreatePostForm: React.FC<CreatePostFormParams> = ({ setOpen }) => {
  const dispatch = useAppDispatch()
  const imgRef = useRef<HTMLImageElement>(null)
  const [isCreate, setIsCreate] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
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
    setIsCreate(true)
    values.image = values.image[0]
    const formData = new FormData()
    formData.append('image', values.image)
    formData.append('text', values.text)
    await dispatch(fetchCreatePost(formData))
    setOpen(false)
    setIsCreate(false)
  }

  return (
        <>
            <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
                <Typography variant='h6' sx={{ color: theme.palette.primary.main }}>
                    Создать пост
                </Typography>
            </Box>
            {isCreate
              ? <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 400
              }}><CircularProgress color="primary"/></Box>
              : <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardMedia
                            ref={imgRef}
                            component="img"
                            height="250"
                            alt="Изображения вашего поста"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <input
                                type='file'
                                {...register('image')}
                                onChange={(e) => fileReader(e.target.files)}
                            />
                        </Box>
                        <CardContent>
                            <TextField
                                label={'Написать  пост'}
                                variant="outlined"
                                maxRows={10}
                                multiline
                                fullWidth
                                {...register('text', { required: 'Описания поста' })}
                                error={Boolean(errors.text?.message)}
                                helperText={errors.text?.message}
                            />
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='contained' disabled={!isValid || isCreate} type='submit'>Создать</Button>
                            <Button variant='contained' color='error' onClick={() => setOpen(false)}>Отмена</Button>
                        </CardActions>
                    </Card>
                </form>
            }

        </>
  )
}

export default CreatePostForm
