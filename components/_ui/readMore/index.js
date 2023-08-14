import { Box, Typography } from '@mui/material'
import Link from 'next/link'


export default function ReadMore(props) {
  return <>
    <Typography component='div' variant='body2' sx={style.bolgDesc} dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }} />
    <Box sx={style.readMore}>
      <Link href={'/blog/' + props.slug} className='link'>
        <Typography fontStyle='italic' variant='body2' component='span' sx={style.link}>...read more</Typography>
      </Link>
    </Box>
  </>
}

const style = {
  readMore: { textAlign: 'right', display: 'flex', justifyContent: 'flex-end', width: '100%' },
  link: { mr: { xs: 4, md: 0 }, py: 0.3, transition: '0.3s', display: 'block', ':hover': { color: 'success.main' }, fontSize: { xs: '13px', md: 'var(--font-size-body2)', xl: 'var(--font-size-h4)' } },
  bolgDesc: { mb: 2, fontStyle: 'italic', fontSize: { xs: '13px', md: 'var(--font-size-body2)', xl: 'var(--font-size-h4)' }, lineHeight: { xs: 'initial', xl: 1.4 }, display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', overflow: 'hidden' }
}