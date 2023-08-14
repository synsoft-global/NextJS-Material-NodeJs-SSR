import { useLayoutEffect, useState } from 'react'
import { Box, Stack, useMediaQuery, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import config from "@/config/config.json"
import Link from 'next/link'



export default function ContactSpeedDial(props) {
  const { websiteInfo, setLayout } = props
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const router = useRouter()
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const blockedPath = ['/careers']


  useLayoutEffect(() => {
    if (blockedPath.includes(router.pathname)) setShow(false)
    else setShow(true)
  }, [router.pathname])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePopupOpen = () => {
    handleClose()
    setLayout(items => ({
      ...items,
      contactPopup: true
    }))
  }


  if (!show) return <></>

  if (isLgUp) {
    return (
      <Stack sx={style.root} spacing={1.5}>
        <Box className='center' sx={{ ...style.iconBox, animationDelay: '0s' }} component={Link} rel='noreferrer' href={websiteInfo.skype_url} target='_blank'>
          <Image src={config.basePath + '/image/skype.png'} width={22} height={22} alt='skype' />
        </Box>
        <Box className='center' sx={{ ...style.iconBox, animationDelay: '1.2s' }} component={Link} href={'tel:' + websiteInfo.tel_url}>
          <Image src={config.basePath + '/image/call_icon.png'} width={22} height={22} alt='call' />
        </Box>
        <Box className='center' sx={{ ...style.iconBox, animationDelay: '2.4s' }} component='button' onClick={handlePopupOpen}>
          <Image src={config.basePath + '/image/edit.png'} width={22} height={22} alt='write us' />
        </Box>
      </Stack>
    )
  }
  else {
    return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={style.speedDial}
        icon={<SpeedDialIcon sx={style.dial} onClick={handleOpen} />}
        onClose={handleClose}
        open={open}
      >
        <SpeedDialAction
          tooltipTitle='Write us'
          onClick={handlePopupOpen}
          icon={
            <Image src={config.basePath + '/image/edit.png'} width={20} height={20} alt='write us' />
          }
        />
        <SpeedDialAction
          tooltipTitle='Skype'
          component={Link} href={'tel:' + websiteInfo.tel_url}
          onClick={handleClose}
          icon={
            <Image src={config.basePath + '/image/call_icon.png'} width={20} height={20} alt='call' />
          }
        />
        <SpeedDialAction
          tooltipTitle='Call'
          component={Link}
          onClick={handleClose}
          href={websiteInfo.skype_url}
          rel='noreferrer'
          target='_blank'
          icon={
            <Image src={config.basePath + '/image/skype.png'} width={20} height={20} alt='skype' />
          }
        />
      </SpeedDial>
    )
  }
}



const style = {
  root: { position: 'fixed', top: '50%', transform: 'translateY(-50%)', left: 21, zIndex: theme => theme.zIndex.speedDial, },
  dial: {
    color: 'success.main',
    'svg': { fontSize: 'var(--font-size-h2)' },
    '&.MuiSpeedDialIcon-root': { height: 'unset', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  },
  speedDial: {
    position: 'fixed', bottom: 95, right: 27,
    '& > .MuiFab-root': { bgcolor: 'white !important', height: 60, width: 60, boxShadow: 'unset', filter: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.3))' }
  },
  iconBox: {
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.15)', p: 1, borderRadius: '100%', position: 'relative', bgcolor: 'white', width: '2.5rem', height: '2.5rem',
    ':before': { content: `''`, position: 'absolute', inset: 0, zIndex: -1, opacity: 1, border: '6px solid rgba(0, 0, 0, 0.5)', borderRadius: 'inherit', animation: 'ripple 5s cubic-bezier(0.65, 0, 0.34, 1) infinite', animationDelay: 'inherit' }
  }
}