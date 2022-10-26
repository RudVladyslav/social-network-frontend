import React, { useCallback, useEffect, useState } from 'react'
import { debounce, IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useAppDispatch } from '../../store'
import { setSearchValue } from '../../store/slices/users/slice'

const SearchForm: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()

  const updateSearchValue = useCallback(
    debounce((searchParams: string) => {
      dispatch(setSearchValue({ searchParams }))
    }, 500)
    , []
  )

  useEffect(() => {
    return () => {
      dispatch(setSearchValue({ searchParams: '' }))
    }
  }, [])

  const onClickClear = (): void => {
    setValue('')
    dispatch(setSearchValue({ searchParams: '' }))
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
        <TextField sx={{ maxWidth: 700 }} InputProps={{
          endAdornment: (<InputAdornment position="end" >
                    <IconButton size='small' color='primary' sx={{ display: `${value === '' ? 'none' : ''}`, padding: 0 }} onClick={onClickClear}>
                    <ClearIcon/>
                    </IconButton>
                </InputAdornment>
          )
        }} value={value} fullWidth label="Введіть ім'я друга" id="fullWidth" onChange={event => onChangeInput(event)} />
  )
}

export default SearchForm
