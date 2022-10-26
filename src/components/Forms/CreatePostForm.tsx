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
import fileReader from '../../utils/fileReader'

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
                    Створити публікацію
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
                            alt="Зображення вашої публікації"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                            <input
                                type='file'
                                {...register('image')}
                                onChange={(e) => fileReader(e.target.files, imgRef)}
                            />
                        </Box>
                        <CardContent>
                            <TextField
                                label={'Створити публікацію'}
                                variant="outlined"
                                maxRows={10}
                                multiline
                                fullWidth
                                {...register('text', { required: 'Повинен бути опис публікації' })}
                                error={Boolean(errors.text?.message)}
                                helperText={errors.text?.message}
                            />
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='contained' disabled={!isValid || isCreate} type='submit'>Створити</Button>
                            <Button variant='contained' color='error' onClick={() => setOpen(false)}>Відмінити</Button>
                        </CardActions>
                    </Card>
                </form>
            }

        </>
  )
}

export default CreatePostForm
