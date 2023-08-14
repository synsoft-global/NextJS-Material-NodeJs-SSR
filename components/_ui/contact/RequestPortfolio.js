import { Dialog, Box, Slide } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import SendPortfolioForm from './SendPortfolioForm'
import closeIcon from '@/public/image/close_click.webp'



export default function RequestPortfolio(props) {
  const { setLayout } = props


  const handleClose = () => {
    setLayout(items => ({ ...items, requestPortfolioPopup: !items.requestPortfolioPopup }))
  }


  return (
    <Dialog open={true} sx={style.popup} TransitionComponent={Transition} maxWidth='md'>

      {/* Close */}
      <Box component='button' onClick={handleClose} className='close'>
        <Image {...closeIcon} quality={100} alt='close' />
      </Box>

      {/* Content */}
      <Box sx={style.popupContainer}>
        <SendPortfolioForm {...props} />
      </Box>

    </Dialog>
  )
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})



const style = {
  popup: {
    '.MuiPaper-root': { bgcolor: 'secondary.main', borderRadius: 0, position: 'relative', overflow: 'unset', width: 1 }
  },
  popupContainer: { height: 1, px: { xs: 2, sm: 6 }, py: 6 },
}