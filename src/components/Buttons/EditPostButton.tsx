import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import ModalWindow from '../ModalWindow'
import EditPostForm from '../Forms/EditPostForm'

interface EditPostButtonProps {
  id: number
}

const EditPostButton: React.FC<EditPostButtonProps> = ({ id }) => {
  const [open, setOpen] = useState(false)

  return (
        <>
            <IconButton onClick={() => setOpen(true)} aria-label="add to favorites">
                <EditIcon/>
            </IconButton>
            <ModalWindow open={open} setOpen={(isOpen) => setOpen(isOpen)}>
                <EditPostForm id={id} setOpen={setOpen}/>
            </ModalWindow>
        </>
  )
}

export default EditPostButton
