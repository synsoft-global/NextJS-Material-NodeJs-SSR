import { Stack, Typography } from "@mui/material"
import config from '@/config/config.json'
import Image from "next/image"
import Link from "next/link"
import { replaceUrl } from "@/utils"



export default function DescriptionBox(props) {
  let { description, link, quoteIcon = false, title, sx, subtitle } = props

  return (
    <Stack sx={{ ...style.root, ...sx }} className='center'>
      <Stack className='center' spacing={2} maxWidth={450}>
        {quoteIcon && <Image src={config.basePath + '/image/d-quotes.png'} width={50} height={50} alt='quote' quality={100} />}
        {title && <Typography variant="h2" className="title" textAlign='center'>{title}</Typography>}
        {subtitle &&
          <Stack direction='row' spacing={3} alignItems='center'>
            <Image src={config.basePath + '/image/d-quotes.png'} width={50} height={50} alt='quote' quality={100} />
            <Typography variant='body1' sx={style.subHeading}>{subtitle}</Typography>
            <Image src={config.basePath + '/image/d-quotes.png'} width={50} height={50} alt='quote' quality={100} style={{ visibility: 'hidden' }} />
          </Stack>
        }
        {description && <Typography variant="body1" component='div' sx={style.description} dangerouslySetInnerHTML={{ __html: description }} />}
        {link && <Typography variant="body1" sx={style.link} className="link-color" component={Link} href={replaceUrl(link)}>...read more</Typography>}
      </Stack>
    </Stack>
  )
}



const style = {
  root: {
    aspectRatio: { xs: 'unset', sm: '1/1' }, position: 'relative', bgcolor: 'secondary.main', width: 1, zIndex: 1, borderRadius: { xs: 3, sm: '100%' }, p: { xs: 2, sm: 6 }, pt: { xs: 6 },
  },
  description: { fontStyle: 'italic' },
  link: { alignSelf: { xs: 'unset', lg: 'end' }, fontStyle: 'italic' },
  subHeading: { textTransform: 'uppercase', letterSpacing: 0, textAlign: 'center', width: 1 },
}