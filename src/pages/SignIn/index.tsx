import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import signInImage from '../../assets/qwerty.webp'
import styles from './SignIn.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthenticateParams, AuthenticateResponse, Status } from '../../store/slices/app/types'
import AuthAlert from '../../components/Alerts/AuthAlert'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import axios from '../../axios'
import { setIsAuth, setStatusApp } from '../../store/slices/app/slice'
import { useAppDispatch } from '../../store'
import { appStatusSelector } from '../../store/slices/app/selectors'
import { useSelector } from 'react-redux'
import handleAxisError from '../../utils/handleAxisError'

const SignIn: React.FC = () => {
  const appStatus = useSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState<string>('')
  const [status, setStatus] = useState < 'success' | 'error' | '' >('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AuthenticateParams>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<AuthenticateParams> = async (values) => {
    try {
      dispatch(setStatusApp(Status.LOADING))
      const { data } = await axios.post<AuthenticateResponse>('api/auth/authenticate', values)
      if (data.token) {
        window.localStorage.setItem('token', data.token)
        dispatch(setIsAuth(true))
      }
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
                <Paper style={{ padding: 30, maxWidth: 700 }}>
                    <Typography variant="h5" style={{ textAlign: 'center' }}>
                        Вход в аккаунт
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 40 }}>
                        <TextField
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register('email', { required: 'Укажите почту' })}
                            type={'email'}
                            style={{ marginTop: 20 }}
                            label="E-Mail"
                            fullWidth
                        />
                        <TextField
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register('password', { required: 'Укажите пароль' })}
                            type={'password'}
                            style={{ marginTop: 20 }}
                            label="Пароль"
                            fullWidth
                        />
                        <Button
                            disabled={!isValid || appStatus === Status.LOADING}
                            style={{ marginTop: 40 }}
                            type="submit"
                            size="large"
                            variant="contained"
                            fullWidth>
                            Войти
                        </Button>
                    </form>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, textAlign: 'center' }}>
                        <Typography>Нету аккаунта? <Link style={{ color: 'secondary' }} to={'/signup'}>Зарегистрироваться</Link></Typography>
                    </Box>
                </Paper>
            </Container>
        </>
  )
}

export default SignIn
