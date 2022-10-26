import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ModalWindow from '../ModalWindow'
import { useAppDispatch } from '../../store'
import { fetchDeletePost } from '../../store/slices/posts/slice'

interface DeletePostButtonProps {
  id: number
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ id }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const onClickDeletePost = async (): Promise<void> => {
    await dispatch(fetchDeletePost({ id }))
  }

  const onClickCancel = (): void => setOpen(false)

  return (
      <>
      <IconButton onClick={() => setOpen(true)} aria-label="add to favorites">
        <DeleteIcon/>
      </IconButton>
          <ModalWindow open={open} setOpen={(isOpen) => setOpen(isOpen)}>
              <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Typography variant={'h6'} >Ви впевнені, що бажаєте видалити?</Typography>
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 30 }}>
                  <Button size='large' variant='contained' onClick={onClickCancel}>Відмінити</Button>
                  <Button size='large' variant='contained' color="error" onClick={onClickDeletePost}>Видалити</Button>
              </Box>
          </ModalWindow>
      </>
  )
}

export default DeletePostButton
