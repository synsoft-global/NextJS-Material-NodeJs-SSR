import { Box, Grid, Container, Stack, useMediaQuery } from '@mui/material'
import ContactForm from '@/components/_ui/contact/ContactForm'
import config from '@/config/config.json'
import Image from 'next/image'
import Link from 'next/link'
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/navigation"



export default function ContactWithPortfolio(props) {
  const { setLayout } = props
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'))


  const handleOpenPopup = () => {
    setLayout(items => ({ ...items, requestPortfolioPopup: true }))
  }


  const ViewPortfolio = () => <>
    <Link href='#!' style={style.viewPortfolio} onClick={handleOpenPopup}>
      <Image src={`${config.basePath}/image/portfolio_btn.png`} width={150} height={0} alt='portfolio button' />
    </Link>
  </>


  return (
    <Box className='section' component='section' sx={style.root} data-section-name='Tech Stack'>
      <Container sx={style.container}>
        <Grid container>
          <Grid item xs={12} md={8} zIndex={2} position='relative'>
            <Stack sx={style.contactForm} className='section-padding'>
              <ContactForm {...props} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} zIndex={1}>
            <Stack className='center' height={1}>
              {isMdUp && <ViewPortfolio />}
              <Box sx={style.backgroundContainer} className='center'>
                {!isMdUp && <ViewPortfolio />}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}



const style = {
  root: { p: '0 !important', position: 'relative', overflow: 'hidden' },
  container: { px: { xs: 0, md: 3 } },
  backgroundContainer: { position: { xs: 'unset', md: 'absolute' }, minHeight: 320, top: 0, right: 0, bottom: 0, width: { xs: 1, md: 0.5 }, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' },
  imgBox: { background: '#fff', display: 'flex', minWidth: '100%', minHeight: 100, justifyContent: 'center', alignItems: 'center', mb: 1 },
  viewPortfolio: { zIndex: 1 },
  contactForm: {
    display: 'flex', px: { xs: 3, md: 0 }, pr: { xs: 3, md: 10 }, py: 10, position: 'relative', bgcolor: { xs: 'secondary.dark', md: 'unset' },
    ':before': { content: `''`, position: 'absolute', top: 0, bottom: 0, right: -16, width: '100vw', bgcolor: 'secondary.dark', transform: 'skewX(4deg)', zIndex: -1 }
  }
}