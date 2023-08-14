import { Stack, Typography } from "@mui/material"
import config from '@/config/config.json'
import Image from "next/image"



export default function BackgroundThumbnailBox(props) {
  let { title, subtitle, backgroundImage, backgroundTexture } = props

  if (!backgroundImage) backgroundImage = `${config.basePath}/image/blog_placeholder.jpg`
  return (
    <Stack sx={{ ...style.root }} className={`center ${backgroundTexture ? 'texture' : ''}`}>
      <Stack className='center' spacing={2} maxWidth={450}>
        {backgroundTexture && <Image src={backgroundTexture} fill style={style.backgroundTexture} alt={title} />}
        {title && <Typography variant="h2" className="line-2" sx={style.title}>{title}</Typography>}
        {subtitle && <Typography variant="body1" className="line-2" color={backgroundTexture ? 'text.primary' : 'white'} sx={style.subtitle}>{subtitle}</Typography>}
        <Image src={backgroundImage} fill alt='' style={style.bgImage} />
      </Stack>
    </Stack>
  )
}



const style = {
  root: {
    textAlign: 'center', aspectRatio: '1/1', position: 'relative', width: 1, zIndex: 1, overflow: 'hidden', borderRadius: '100%', p: 6,
    ':not(.texture):before': { content: `''`, position: 'absolute', inset: 0, background: 'black', opacity: 0.7, zIndex: -1 },
  },
  title: {},
  subtitle: { textTransform: 'uppercase' },
  backgroundTexture: { zIndex: -1, maxWidth: '50%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  bgImage: { zIndex: -2, margin: 0, objectFit: 'cover' }
}