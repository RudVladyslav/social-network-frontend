import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import ModalWindow from '../ModalWindow'
import EditProfileForm from '../Forms/EditProfileForm'

const EditProfileButton: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: { sm: 0, xs: 2 } }}>
                <Button onClick={() => setOpen(true)} variant='contained'>Редагувати</Button>
            </Box>
            <ModalWindow open={open} setOpen={(isOpen) => setOpen(isOpen)}>
                <EditProfileForm setOpen={setOpen} />
            </ModalWindow>
        </>
  )
}

export default EditProfileButton
