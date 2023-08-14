import { Box, Container, Grid, Typography } from "@mui/material"
import ContactForm from "@/components/_ui/contact/ContactForm"
import config from '@/config/config.json'



export default function ContactHearFromYou(props) {
  const { Form } = props


  return (
    <Box sx={style.root} component='section' className='section' data-section-name='Connect with us' id='form'>
      <Container>
        <Grid container>
          <Grid item xs={12} md={5} className="center">
            <Box height={1} className='center' sx={style.headingBox}>
              <Typography variant='h2' sx={style.heading}>We&apos;d love to hear from you</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={style.contactForm}>
              {Form ?? <ContactForm {...props} />}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}



const style = {
  root: { overflow: 'hidden', p: '0 !important' },
  contactForm: {
    py: 10, pl: { xs: 0, md: 10 }, position: 'relative',
    ':before': { content: `''`, position: 'absolute', width: '200vw', top: 0, left: { xs: -50, md: 0 }, bottom: 0, bgcolor: 'secondary.dark', zIndex: -1 }
  },
  heading: { fontSize: { xs: '70%', md: '90%' }, textTransform: 'unset', color: '#9b8884', textAlign: 'center', fontFamily: 'var(--font-cursive-family)', fontWeight: 400, maxWidth: { xs: 250, md: 350 } },
  headingBox: { backgroundImage: { xs: 'unset', md: `url(${config.basePath}/image/love_text_bg.png)` }, py: 5, fontSize: 'var(--font-size-h1)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', maxWidth: 390, mx: 'auto' }
}