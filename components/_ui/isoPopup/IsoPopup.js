import { Box, Dialog, Slide } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import closeIcon from '@/public/image/close_click.webp'
import ISOCertificate from '@/public/image/ISO-Certificate.jpg'



export default function IsoPopup(props) {
  const { setLayout } = props


  const handleClose = () => {
    setLayout(items => ({
      ...items,
      isoPopup: false
    }))
  }


  return (
    <Dialog open={true} onClose={handleClose} TransitionComponent={Transition} sx={style.popup} scroll="body" maxWidth='md' >
      {/* Close */}
      < Box component='button' onClick={handleClose} className='close' >
        <Image {...closeIcon} quality={100} alt='close' />
      </Box >

      {/* Content */}
      < Box sx={style.popupContainer} >
        <Image {...ISOCertificate} width='550' height='782' alt='ISO certificate' />
      </Box >
    </Dialog >
  )
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})



const style = {
  popup: {
    '.MuiPaper-root': { bgcolor: 'secondary.main', borderRadius: 0, position: 'relative', overflow: 'unset' }
  },
  popupContainer: { height: 1, display: 'flex' },
}