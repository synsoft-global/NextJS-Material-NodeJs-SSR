import { Box, Container, useMediaQuery } from "@mui/material"
import Image from "next/image"



export default function LogoSlider(props) {
  const { data, setLayout } = props
  const isLgUp = useMediaQuery(theme => theme.breakpoints.up('lg'))


  const handleIsoOpen = () => {
    setLayout(items => ({
      ...items,
      isoPopup: true
    }))
  }


  const imagesList = <>
    {Object.values(data.acf.home_page_banner_image || {}).map((item, index) =>
      <a
        key={index}
        href={item.description || '#'}
        onClick={() => item.alt_text === 'iso' && handleIsoOpen()}
        target={item.alt_text === 'iso' ? '_self' : '_blank'}
      >
        {item.img_url && <Image height={29} width={100} src={item.img_url} alt={item.alt_text || 'logo'} loading="lazy" quality={100} />}
      </a>
    )}
  </>


  return (
    <Box sx={style.root}>
      {isLgUp
        ? <>
          <Container>
            <Box className='center'>
              {imagesList}
            </Box>
          </Container>
        </>
        : <marquee scrollamount='5' width='100%'>{imagesList}</marquee>
      }
    </Box>
  )
}



const style = {
  root: {
    py: 2.4, position: 'relative', zIndex: 1,
    'img': { height: { xs: 22, xl: 29 }, width: 'auto' },
    'a': { display: 'inline-flex' },
    'a:not(:last-child)': { mr: 3.75 },
    'marquee': { display: 'block' },
    ':before': { content: `''`, position: 'absolute', inset: 0, bgcolor: 'secondary.main', opacity: 0.8, zIndex: -1 }
  }
}