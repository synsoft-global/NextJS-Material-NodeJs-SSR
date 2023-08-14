import { Dialog, Box, Slide } from '@mui/material'
import ContactForm from './ContactForm'
import Image from 'next/image'
import React from 'react'
import closeIcon from '@/public/image/close_click.webp'



export default function ContactPopup(props) {
  const { setLayout } = props


  const handleClose = () => {
    setLayout(items => ({ ...items, contactPopup: !items.contactPopup }))
  }


  return (
    <Dialog open={true} sx={style.popup} TransitionComponent={Transition} scroll='body' maxWidth='md'>

      {/* Close */}
      <Box component='button' onClick={handleClose} className='close'>
        <Image {...closeIcon} quality={100} alt='close' />
      </Box>

      {/* Content */}
      <Box sx={style.popupContainer}>
        <ContactForm buttonText='send' {...props} handleClose={handleClose} />
      </Box>

    </Dialog>
  )
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})



const style = {
  popup: {
    '.MuiPaper-root': { bgcolor: 'secondary.main', borderRadius: 0, position: 'relative', overflow: 'unset' }
  },
  popupContainer: { height: 1, px: { xs: 1, sm: 6 }, py: 6 },
}