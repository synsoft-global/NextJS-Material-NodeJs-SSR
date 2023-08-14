import React, { useEffect } from 'react'
import { Dialog, Box, Slide, Typography, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from "js-cookie"
import Router from "next/router"
import closeIcon from '@/public/image/close_click.webp'



export default function ExitPopup(props) {
  const { setLayout, layout } = props
  let exitPopupTimeout;


  useEffect(() => {
    Router.ready(() => {
      document.addEventListener('mouseout', (event) => {
        if (!event.relatedTarget && event.clientY < 10) {
          clearTimeout(exitPopupTimeout)
          exitPopupTimeout = setTimeout(showPopup, 150)
        }
      })
      document.addEventListener('mouseover', () => clearTimeout(exitPopupTimeout))
    })
  }, [])


  const showPopup = () => {
    if (Cookies.get('exitPopupShowed')) return
    setLayout(items => ({ ...items, exitPopup: true }))
    Cookies.set('exitPopupShowed', 'yes', { expires: 1 })
  }


  const handleClose = () => {
    setLayout(items => ({ ...items, exitPopup: false }))
  }


  return (
    <Dialog open={layout.exitPopup} sx={style.popup} TransitionComponent={Transition} scroll='body' maxWidth='md'>

      {/* Close */}
      <Box component='button' onClick={handleClose} className='close'>
        <Image {...closeIcon} quality={100} alt='close' />
      </Box>

      {/* Content */}
      <Box sx={style.popupContainer}>
        <Typography variant='h2' fontSize='var(--font-size-h1)' mb={3} >HOLD ON</Typography>
        <Typography variant='h4' mb={2} fontWeight={600}>Not able to find what you are looking for?</Typography>
        <Typography variant='subtitle1' mb={2}>Synsoft is <strong> a top-rated development company </strong> and has worked for <strong>20+ years</strong> & completed <strong>1000+ projects</strong> in various tech stacks. Let's discuss your requirement.</Typography>
        <Typography variant='subtitle1' mb={2}>Avail free consultation over a call...</Typography>
        <Grid item xs={12} className='center' flexDirection='column'>
          <LoadingButton component={Link} href='https://calendly.com/shyam-synsoft/30min' onClick={handleClose} target='_blank' variant='underline' sx={style.button} type='submit'>book your slot</LoadingButton>
        </Grid>
      </Box>

    </Dialog>
  )
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})



const style = {
  popup: {
    '.MuiPaper-root': { maxWidth: { xs: 1, md: 0.6, xl: .4 }, bgcolor: 'secondary.main', borderRadius: 4, position: 'relative', overflow: 'unset' }
  },
  popupContainer: { height: 1, p: 4 }
}