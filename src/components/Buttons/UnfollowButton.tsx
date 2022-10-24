import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../store'
import { fetchUnfollow } from '../../store/slices/users/slice'

interface UnfollowButtonProps {
  id: number
  onClick?: () => void
}

const UnfollowButton: React.FC<UnfollowButtonProps> = ({ id, onClick }) => {
  const dispatch = useAppDispatch()
  const [isToggleUnfollow, setIsToggleUnfollow] = useState(false)
  const onClickUnfollow = async (): Promise<void> => {
    setIsToggleUnfollow(true)
    await dispatch(fetchUnfollow({ id }))
    if (onClick !== undefined) {
      onClick()
    }
    setIsToggleUnfollow(false)
  }

  return (
        <Button onClick={onClickUnfollow} disabled={isToggleUnfollow} size="medium" color="error" variant={'contained'}>
            Отписаться
        </Button>
  )
}

export default UnfollowButton
