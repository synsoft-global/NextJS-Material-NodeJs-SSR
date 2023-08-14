import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { handleMeta, pageApiFilter, replaceUrl, blogListApiFilter } from '@/utils'
import { Box, Grid, Stack, Typography, Chip, Container } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import PostHeaderSection from '@/components/_sections/postHeaderSection/PostHeaderSection'
import HtmlContentSection from '@/components/_sections/htmlContentSection/HtmlContentSection'



export default function Page(props) {
  const { data, featuredBLogsData, headerMenus } = props
  const router = useRouter()


  return <>
    <Head>{parse(handleMeta(data?.yoast_head))}</Head>

    <Box component='article'>
      <PostHeaderSection {...props} />

      <Box component='section' sx={style.root}>
        <Container>
          <Grid container spacing={3} px={{ xs: 2, md: 3 }}>

            {/* Blog Details */}
            <Grid item xs={12} md={8}>
              <HtmlContentSection {...props} ribbion={true} author={true} componentLayout={false} />
            </Grid>

            <Grid item xs={12} md={4}>

              {/* CTA Box */}
              <Box sx={style.cta_box} mb={3}>
                <Typography variant='subtitle1' fontWeight={600}>Have a project in mind? </Typography>
                <Typography variant='h2' color='common.black' mb={1.5}>Let's Discuss! </Typography>
                <Typography variant='body2'>Build stunning & premium web apps with our top-rated Development Team & Accomplish your Business Goals Lightning Fast. </Typography>
                <Grid item xs={12} className='center' flexDirection='column'>
                  <LoadingButton component={Link} href='https://calendly.com/shyam-synsoft/30min' target='_blank' variant='underline' s type='submit'>book your slot</LoadingButton>
                </Grid>
              </Box>

              {/* Services Box */}
              <Box sx={style.services_list} mb={2}>
                <Typography variant='h3' mb={3} fontWeight={600} className='heading' pr={{ xs: 0, md: 5 }}>Our Services</Typography>
                <Box className='ckeditor_content'>
                  <ul className='service_list'>
                    {headerMenus?.items?.map((item, index, array) => {
                      if (index !== 0 && index < array.length - 3) {
                        return (
                          <li key={index}>
                            <Link href={replaceUrl(item.url)}>{item?.title}</Link>
                          </li>
                        )
                      }
                      return null
                    })}
                  </ul>
                </Box>
              </Box>

              {/* Featured Blogs Box */}
              <Box sx={style.featured_blogs} mb={2}>
                <Typography variant='h3' mb={3} fontWeight={600} className='heading' pr={{ xs: 0, md: 5 }}>Featured Blogs</Typography>
                <Stack sx={style.blog_list} spacing={2}>

                  {featuredBLogsData.filter(item => item.slug !== router.query.slug).map((item, index) => {
                    const imageSrc = item?.acf?.detail_image || '/image/blog_placeholder.jpg'
                    const title = item?.title?.rendered
                    const date = item?.formatted_date
                    const link = item?.link
                    if (index > 2) return <></>
                    return (
                      <Stack key={index} direction="row" spacing={2}>
                        <Link href={link}><Image style={style.thumbnail} src={imageSrc} width={80} height={80} alt="blog image" /></Link>
                        <Stack direction="column" spacing={1.5}>
                          <Link href={replaceUrl(link)}><Typography variant="subtitle1" className="line-2" lineHeight={1.2}>{title}</Typography></Link>
                          <Typography variant="body2">{date}</Typography>
                        </Stack>
                      </Stack>
                    )
                  })}
                </Stack>
              </Box>

              {/* Tags */}
              {data?.acf?.related_tag && Boolean(data?.acf?.related_tag.length) &&
                <Box sx={style.services_list} mb={2}>
                  <Typography variant='h3' fontWeight={600} className='heading' pr={{ xs: 0, md: 5 }}>Related Tech</Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mt={2.5}>
                    {data?.acf?.related_tag.map((tag, index) => (
                      <Chip key={index} size="medium" label={tag?.label} component={Link} href={replaceUrl(tag?.value)} variant="outlined" clickable />
                    ))}
                  </Stack>
                </Box>
              }

              {/* CTA Box */}
              <Box sx={{ ...style.cta_box, ...style.cta_box_sticky }}>
                <Typography variant='subtitle1' fontWeight={600}>Have a project in mind? </Typography>
                <Typography variant='h2' color='common.black' mb={1.5}>Let's Discuss! </Typography>
                <Typography variant='body2'>Build stunning & premium web apps with our top-rated Development Team & Accomplish your Business Goals Lightning Fast. </Typography>
                <Grid item xs={12} className='center' flexDirection='column'>
                  <LoadingButton component={Link} href='https://calendly.com/shyam-synsoft/30min' target='_blank' variant='underline' s type='submit'>book your slot</LoadingButton>
                </Grid>
              </Box>

            </Grid>
          </Grid>
        </Container>
      </Box >
    </Box>
    <style>
      {`pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#23241f;color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}`}
    </style>
  </>
}



const style = {
  root: { bgcolor: 'secondary.main', pt: 'var(--section-spacing)' },
  cta_box: { p: 3, bgcolor: '#8FF5FF', boxShadow: '8px 8px 0px #93C0C5' },
  services_list: {
    p: 3, bgcolor: '#ffffff',
    '.service_list > li > a': { color: 'var(--palette-common-black)' }
  },
  featured_blogs: { p: 3, bgcolor: '#ffffff', '.service_list > li': { color: 'var(--palette-common-black)' } },
  cta_box_sticky: {
    position: 'sticky',
    top: 80,
    display: { xs: 'none', sm: 'block' }
  },
  thumbnail: { objectFit: 'cover', width: 80, height: 80, minWidth: 80 }
}



export async function getServerSideProps(context) {
  const [data, featuredBLogsData] = await axios.all([
    axios.get(`/wp/v2/posts?slug=${context.params.slug}`),
    axios.get(`/wp/v2/posts?categories=11&per_page=4`)
  ])

  return {
    props: {
      data: pageApiFilter(data[0]),
      featuredBLogsData: blogListApiFilter(featuredBLogsData)
    }
  }
}