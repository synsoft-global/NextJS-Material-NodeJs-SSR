import config from '@/config/config.json'
import { Box, Button, Typography, Container } from '@mui/material'



export default function RibbonStrip(props) {
  let { data, setLayout, title } = props
  title = title ?? data.acf.ribbon_text

  const handleOpenPopup = () => {
    setLayout(props => ({
      ...props,
      contactPopup: true
    }))
  }


  return <>
    <Box sx={style.root}>
      <Container sx={style.container}>
        <Typography variant='h4' sx={style.heading} dangerouslySetInnerHTML={{ __html: title }} />
        <Button variant='contained' color='primary' size='large' sx={style.button} disableElevation onClick={handleOpenPopup}>WRITE TO US</Button>
      </Container>
    </Box>
  </>
}



const style = {
  root: { textAlign: 'center', bgcolor: '#8ff5ff', py: 3, zIndex: 1, },
  container: {
    position: 'relative',
    '&::before': { content: `url(${config.basePath}/image/zigzag.png)`, position: 'absolute', bottom: 16, right: { xs: 15, lg: 30 }, zIndex: -1 }
  },
  button: { fontFamily: 'var(--font-secondary-family)', fontSize: 'var(--font-size-h4)', px: 5 },
  heading: { color: 'text.dark', fontWeight: 600, letterSpacing: '3px', mb: 2, fontFamily: 'var(--font-special-family)' }
}