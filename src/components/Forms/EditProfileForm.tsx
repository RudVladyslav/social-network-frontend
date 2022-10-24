import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Avatar, Box, Button, Card, CircularProgress, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store'
import { EditProfileParams } from '../../store/slices/profile/types'
import { useSelector } from 'react-redux'
import { profileSelector } from '../../store/slices/profile/selectors'
import { fetchUpdateProfileData } from '../../store/slices/profile/slice'
import imagePath from '../../utils/imagePath'
import { theme } from '../../theme'

interface EditProfileFormProps {
  setOpen: (visible: boolean) => void
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ setOpen }) => {
  const { userData: { status, firstName, lastName, image } } = useSelector(profileSelector)
  const dispatch = useAppDispatch()
  const [imageSrc, setImageSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (image !== '') {
      setImageSrc(imagePath(image))
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<EditProfileParams>({
    defaultValues: {
      firstName,
      lastName,
      status,
      image
    },
    mode: 'onChange'
  })

  const fileReader = (file: any): void => {
    if (file.length === 0) {
      setImageSrc('')
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load',
      (event: any) => {
        setImageSrc(event.target.result)
      })
    reader.readAsDataURL(file[0])
  }

  const onSubmit: SubmitHandler<EditProfileParams> = async (values) => {
    setIsLoading(true)
    values.image = values.image[0]
    const formData = new FormData()
    formData.append('image', values.image)
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('status', values.status)
    await dispatch(fetchUpdateProfileData(formData))
    setOpen(false)
    setIsLoading(false)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  return (
        <>
            <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
              <Typography variant='h6' sx={{ color: theme.palette.primary.main }}>
                Редактировать профиль
              </Typography>
            </Box>
            <Card sx={{ padding: 2 }}>
                {isLoading
                  ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}><CircularProgress color="primary" /></Box>
                  : <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', marginTop: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar src={imageSrc} sx={{ width: 56, height: 56, marginRight: 2 }}/>
                        <input
                            type='file'
                            {...register('image')}
                            onChange={(e) => fileReader(e.target.files)}
                        />
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      marginTop: 3,
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between'
                    }}>

                        <TextField
                            error={Boolean(errors.firstName?.message)}
                            helperText={errors.firstName?.message}
                            {...register('firstName', { required: 'Укажите имя' })}
                            type={'text'}
                            sx={{ width: 'auto', margin: { xs: '10px 0', sm: '0 10px 0 0' } }}
                            label="Имя"
                        />
                        <TextField
                            error={Boolean(errors.lastName?.message)}
                            helperText={errors.lastName?.message}
                            {...register('lastName', { required: 'Укажите фамилию' })}
                            type={'text'}
                            sx={{ width: 'auto' }}
                            label="Фамилия"
                        />
                    </Box>
                    <TextField
                        sx={{ marginTop: 1.5 }}
                        error={Boolean(errors.status?.message)}
                        helperText={errors.status?.message}
                        {...register('status')}
                        label='Статус'
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', marginTop: 3, justifyContent: 'space-between' }}>
                        <Button disabled={!isValid || isLoading} type='submit' variant='contained'>Сохранить</Button>
                        <Button variant='contained' color='error' onClick={onClose}>Отмена</Button>
                    </Box>
                </form>
            }

            </Card>
        </>
  )
}

export default EditProfileForm
