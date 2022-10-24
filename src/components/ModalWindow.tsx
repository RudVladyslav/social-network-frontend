import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  width: { xs: 320, sm: 650 }
}

interface ModalPropsType { open: boolean, setOpen: (open: boolean) => void, children: React.ReactNode }

const ModalWindow: React.FC<ModalPropsType> = ({ open, setOpen, children }) => {
  return (
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
      >
          <Fade in={open}>
              <Box sx={style} >
                  {children}
              </Box>
          </Fade>
      </Modal>
  )
}

export default ModalWindow
