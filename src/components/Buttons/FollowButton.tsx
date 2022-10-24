import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../store'
import { fetchFollow } from '../../store/slices/users/slice'

interface FollowButtonProps {
  id: number
  onClick?: () => void
}

const FollowButton: React.FC<FollowButtonProps> = ({ id, onClick }) => {
  const [isToggleFollow, setIsToggleFollow] = useState(false)

  const dispatch = useAppDispatch()
  const onClickFollow = async (): Promise<void> => {
    setIsToggleFollow(true)
    await dispatch(fetchFollow({ id }))
    setIsToggleFollow(false)
    if (onClick !== undefined) {
      onClick()
    }
  }

  return (
        <Button onClick={onClickFollow} disabled={isToggleFollow} size="medium" color="primary" variant={'contained'}>
            Подписаться
        </Button>
  )
}

export default FollowButton
