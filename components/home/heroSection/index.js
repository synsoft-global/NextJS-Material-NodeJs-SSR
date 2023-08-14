import { Box, Container, Stack, Typography } from '@mui/material'
import LogoSlider from './LogoSlider'
import homeBannerBg from '@/public/image/home_banner_bg.png'
import Image from 'next/image'
import StyledButton from '@/components/_ui/styledButton/StyledButton'



export default function HeroSection(props) {
  const { data, setLayout } = props
  const handleOpen = () => {
    setLayout(items => ({
      ...items,
      contactPopup: true
    }))
  }

  return (
    <Box className='section hero-section' component='section' sx={style.root} data-section-name='Introduction'>
      <Stack sx={style.content}>
        <Stack flex={1} position='relative'>
          <Image src={homeBannerBg.src} fill className='bg-image' alt='' />
          <Container sx={style.container} className='center'>
            <Stack alignItems='center' textAlign='center'>
              <Typography variant='h1' sx={style.heading} dangerouslySetInnerHTML={{ __html: data.acf.home_page_banner_text }} />
              <Typography variant='h4' component='strong' sx={style.desc} dangerouslySetInnerHTML={{ __html: data.acf.home_page_banner_sub_title }} />
              <StyledButton onClick={handleOpen}>get a quote</StyledButton>
            </Stack>
          </Container>
        </Stack>
        <LogoSlider {...props} />
      </Stack>
    </Box>
  )
}


const style = {
  root: {
    display: 'flex', flexFlow: 'column', p: '0 !important', minHeight: 'calc(var(--screen-height) - var(--header-height, 67px)) !important',
    '.bg-image': { display: { md: `block`, xs: `none` }, objectPosition: 'bottom', objectFit: 'contain' }
  },
  content: { flexGrow: 1 },
  desc: { maxWidth: '80%', margin: 'auto', fontSize: { xs: 'var(--font-size-h5)', xl: 'h3.fontSize' }, letterSpacing: '2px' },
  container: { py: { md: 12, xs: 4 }, flexGrow: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xl: 20, lg: 15, md: 10, xs: 0 } },
  box: { mt: `-30.5px`, display: 'flex' },
  heading: { 'span': { color: 'primary.main' }, textTransform: 'unset', letterSpacing: { md: 7.8 }, mb: 4 }
}
