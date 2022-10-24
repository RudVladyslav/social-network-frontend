import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { IconButton } from '@mui/material'
import { useAppDispatch } from '../../store'
import { fetchLikePost } from '../../store/slices/posts/slice'

interface LikePostButtonProps {
  id: number
}

const LikePostButton: React.FC<LikePostButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch()
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const onClickLike = async (): Promise<void> => {
    setIsLikeLoading(true)
    await dispatch(fetchLikePost({ id }))
    setIsLikeLoading(false)
  }

  return (
    <IconButton disabled={isLikeLoading} onClick={onClickLike} aria-label="add to favorites">
        <FavoriteIcon/>
    </IconButton>
  )
}

export default LikePostButton
