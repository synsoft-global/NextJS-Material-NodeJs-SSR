import React, { useState, useEffect } from 'react'
import { Button, Snackbar, Link as MuiLink, Stack, Typography, Box } from '@mui/material'
import Link from 'next/link'
import Cookies from 'js-cookie'



export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  const handleClose = (isAccepted) => {
    setOpen(false)
    Cookies.set('cookie-consent', isAccepted ? 'yes' : 'no', { expires: 365 })
  }

  useEffect(() => {
    if (!Cookies.get('cookie-consent')) setOpen(true)
  }, [])


  return (
    <Snackbar open={open} sx={style.root}>
      <Box>
        <Stack sx={style.content} direction='column'>
          <Typography variant='body1' letterSpacing={0}>We use some essential cookies to make this website work. By clicking 'Accept', you consent to our use of cookies <Link href='/privacy-policy' passHref target='_blank'><MuiLink>learn more</MuiLink></Link>.</Typography>
          <Stack direction='row' mt={1} spacing={2} sx={{ alignSelf: 'end' }}>
            <Button size='' variant='outlined' sx={{ px: 3, py: 1 }} onClick={() => handleClose(false)}>Reject</Button>
            <Button size='' variant='contained' sx={{ px: 3, py: 1 }} onClick={() => handleClose(true)} disableElevation>Accept</Button>
          </Stack>
        </Stack>
      </Box>
    </Snackbar>
  )
}


const style = {
  root: { mb: { xs: 20, md: 0 } },
  content: { bgcolor: 'white', p: 2, boxShadow: '3', borderRadius: 1, maxWidth: 550, }
}
