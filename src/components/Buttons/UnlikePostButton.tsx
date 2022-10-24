import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton } from '@mui/material'
import { useAppDispatch } from '../../store'
import { fetchUnlikePost } from '../../store/slices/posts/slice'

interface UnlikePostButtonProps {
  id: number
}

const UnlikePostButton: React.FC<UnlikePostButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [isUnlikeLoading, setIsUnlikeLoading] = useState(false)

  const onClickLike = async (): Promise<void> => {
    setIsUnlikeLoading(true)
    await dispatch(fetchUnlikePost({ id }))
    setIsUnlikeLoading(false)
  }

  return (
    <IconButton disabled={isUnlikeLoading} onClick={onClickLike} aria-label="add to favorites">
        <FavoriteIcon color='error'/>
    </IconButton>
  )
}

export default UnlikePostButton
