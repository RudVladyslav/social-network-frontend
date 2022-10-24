import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import ModalWindow from '../ModalWindow'
import { useSelector } from 'react-redux'
import { profileSelector } from '../../store/slices/profile/selectors'
import imagePath from '../../utils/imagePath'
import CreatePostForm from '../Forms/CreatePostForm'

const CreatePostButton: React.FC = () => {
  const { userData: { firstName, lastName, image } } = useSelector(profileSelector)
  const [open, setOpen] = useState(false)
  const imageSrc = imagePath(image)

  const onClickCreateBtn = (): void => {
    setOpen(true)
  }

  return (
        <Paper sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, padding: 1 }}>
            <Button onClick={onClickCreateBtn} sx={{ borderRadius: 25, fontSize: { xs: 'small', md: 'large' } }} size='large'
                    variant="contained"
                    endIcon={<CreateIcon />} startIcon={<Avatar src={imageSrc} />}>
                Что у Вас нового, {firstName} {lastName}?
            </Button>
            <ModalWindow open={open} setOpen={(isOpen) => {
              setOpen(isOpen)
            }}>
                <CreatePostForm setOpen={setOpen} />
            </ModalWindow>
        </Paper>
  )
}

export default CreatePostButton
