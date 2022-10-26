import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { Box, IconButton, InputAdornment } from '@mui/material'
import signInImage from '../../assets/auth_image.png'
import styles from './SignUp.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationParams, RegistrationResponse, Status } from '../../store/slices/app/types'
import AuthAlert from '../../components/Alerts/AuthAlert'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { setStatusApp } from '../../store/slices/app/slice'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { appStatusSelector } from '../../store/slices/app/selectors'
import handleAxisError from '../../utils/handleAxisError'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

const schema = yup.object({
  firstName: yup.string().required("Вкажіть ім'я").min(3, 'Мінимальна довжина 3 символи'),
  lastName: yup.string().required('Вкажіть фамілію').min(3, 'Мінимальна довжина 3 символи'),
  password: yup.string().required('Вкажіть пароль').min(5, 'Мінимальна довжина 5 символів'),
  email: yup.string().required('Вкажіть Email ').email('Некоректний email')
}).required()

const SignUp: React.FC = () => {
  const appStatus = useSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState < 'success' | 'error' | '' >('')
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RegistrationParams>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onClickToggleVisiblePassword = (): void => setIsVisiblePassword(prevState => !prevState)

  const onSubmit: SubmitHandler<RegistrationParams> = async (values) => {
    try {
      dispatch(setStatusApp(Status.LOADING))
      const { data } = await axios.post<RegistrationResponse>('api/auth/registration', values)
      setMessage(data.message)
      setStatus('success')
      dispatch(setStatusApp(Status.NORMAL))
    } catch (error) {
      dispatch(setStatusApp(Status.NORMAL))
      handleAxisError({ setMessage, setStatus, error })
    }
  }

  return (
      <>
          {message !== '' && <AuthAlert setMessage={setMessage} severity={status !== '' ? status : 'error'}>{message}</AuthAlert>}

          <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '83vh' }}>
            <img src={signInImage} className={styles.image} alt=""/>
            <Paper style={{ padding: 50, maxWidth: 700 }}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                    Реєстрація
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 40 }}>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField
                            error={Boolean(errors.firstName?.message)}
                            helperText={errors.firstName?.message}
                            {...register('firstName')}
                            type={'text'}
                            style={{ width: '45%' }}
                            label="Ім'я"
                        />
                        <TextField
                            error={Boolean(errors.lastName?.message)}
                            helperText={errors.lastName?.message}
                            {...register('lastName')}
                            type="text"
                            style={{ width: '45%' }}
                            label="Фамілія"
                        />
                    </Box>
                    <TextField
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email')}
                        type={'email'}
                        style={{ marginTop: 20 }}
                        label="E-Mail"
                        fullWidth
                    />
                    <TextField
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password')}
                        type={isVisiblePassword ? 'text' : 'password'}
                        style={{ marginTop: 20 }}
                        label="Пароль"
                        fullWidth
                        InputProps={{
                          endAdornment: (<InputAdornment position="end" >
                                    <IconButton size='small' color='primary' onClick={onClickToggleVisiblePassword}>
                                        {isVisiblePassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                    </IconButton>
                                </InputAdornment>
                          )
                        }}
                    />
                    <Button disabled={!isValid || appStatus === Status.LOADING} style={{ marginTop: 40 }} type="submit" size="large" variant="contained"
                            fullWidth>
                        Зареєструватись
                    </Button>
                </form>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Typography>Вже зареєстровані? <Link style={{ color: 'secondary' }} to={'/signin'}>Увійти</Link></Typography>
                </Box>
            </Paper>
        </Container>
      </>
  )
}

export default SignUp
