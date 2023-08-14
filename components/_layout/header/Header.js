import { Box, Container, Stack, Typography } from '@mui/material'
import MenuPopup from './MenuPopup'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import logoDark from '@/public/image/logo-dark.png'



export default function Header(props) {
  const [openMenu, setOpenMenu] = useState(false)


  const scroll = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })


  return <>
    <Box component='header' id='header' sx={{ ...style.root, position: scroll ? 'fixed' : 'relative', animation: scroll ? 'slideInDown 0.3s forwards' : 'unset', background: scroll ? 'rgb(255 255 255 / 95%)' : 'transparent' }}>
      <Container sx={style.container} className='max-width-unset'>
        <Stack justifyContent='space-between' direction='row'>
          {/* Logo */}
          <Link href='/' style={style.logo}>
            <Stack sx={style.logoImage}>
              <Image {...logoDark} width={280} height={25} alt='logo' />
            </Stack>
          </Link>

          {/* Menu */}
          <Stack direction='row' gap={3}>
            <Stack direction='row' sx={style.bookCall} gap={1} component={Link} href='https://calendly.com/shyam-synsoft/30min' target='_blank'>
              <img src='/image/ic_call.png' alt='call' loading='lazy' />
              <Typography sx={style.bookCallTitle} variant='body2'>BOOK A 30 MIN CALL</Typography>
              <Box sx={style.person}>
                <Image src='/image/call_person.png' alt='support team member' height={70} width={67} quality={100} />
              </Box>
            </Stack>
            <Stack onClick={() => setOpenMenu(true)} className='center' spacing={{ xs: '5px', xl: '7px' }} sx={style.menuIconBox}>
              <Box sx={style.menuIcon} />
              <Box sx={style.menuIcon} />
              <Box sx={style.menuIcon} />
            </Stack>
          </Stack>
        </Stack>
      </Container>

      {/* Menu Popup */}
      {openMenu && <MenuPopup openMenu={openMenu} setOpenMenu={setOpenMenu} {...props} />}
    </Box>

    {scroll && <Box height='var(--header-height)'></Box>}
  </>
}



const style = {
  root: { inset: '0 0 auto 0', zIndex: theme => theme.zIndex.mobileStepper, py: { xs: 2.5, sm: 0 } },
  logo: { display: 'flex', alignItems: 'center' },
  logoImage: {
    'img': { maxWidth: { xs: 210, xl: 280 } }
  },
  menuIcon: { width: { xs: 40, xl: 58 }, height: { xs: 5, xl: 6 }, bgcolor: 'text.primary' },
  menuIconBox: { cursor: 'pointer' },
  bookCall: { alignItems: 'center', pt: 0.5, display: { xs: 'none', sm: 'flex' } },
  bookCallTitle: { letterSpacing: 0, fontWeight: 600, whiteSpace: 'no-wrap', color: 'primary.main', color: 'text.primary' },
  person: {
    display: 'flex',
    'img': { height: { xs: 55, xl: 70 }, width: 'auto' }
  }
}