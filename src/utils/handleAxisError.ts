import { AxiosError } from 'axios'

interface handleAxisErrorParams {
  setMessage: (arg: string) => void
  setStatus: (arg: 'success' | 'error' | '') => void
  error: any
}

const handleAxisError = ({ setMessage, setStatus, error }: handleAxisErrorParams): void => {
  const err = error as AxiosError<{ message: string }>
  if (typeof err.response?.data.message === 'string') {
    setMessage(err.response?.data.message)
    setStatus('error')
  } else {
    const { data } = err.response as unknown as any
    let message: string = ''
    for (let i = 0; i < data.length; i++) {
      if (i < 1) {
        message = data[i].msg
      } else {
        message = `${message}. ${data[i].msg}`
      }
    }
    setMessage(message)
    setStatus('error')
  }
}
export default handleAxisError
