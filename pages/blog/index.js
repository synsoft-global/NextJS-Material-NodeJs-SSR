import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, Container, Grid, Stack, Snackbar } from '@mui/material'
import { replaceUrl, handleMeta, pageApiFilter, blogListApiFilter } from '@/utils'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import config from '@/config/config.json'
import HeroSection from '@/components/_sections/heroSection/HeroSection'
import Head from 'next/head'
import parse from 'html-react-parser'
import BackgroundThumbnailBox from '@/components/_ui/backgroundThumbnailBox/BackgroundThumbnailBox'
import DescriptionBox from '@/components/_ui/descriptionBox/DescriptionBox'



export default function Page(props) {
  const { data, blogs, totalPages } = props
  const router = useRouter()
  const [blogList, setBlogList] = useState(blogs)
  const [page, setPage] = useState(1)
  const [loadingError, setLoadingError] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleLoadMore = async () => {
    if (totalPages > page) {
      setLoading(true)
      await axios.get(`/wp/v2/posts?per_page=10&page=${page + 1}`)
        .then(response => {
          setPage(items => items + 1)
          setBlogList(items => ([...items, ...response]))
        })
        .catch(error => setLoadingError(true))
    }
    setLoading(false)
  }


  return <>
    <Head>{parse(handleMeta(data?.yoast_head))}</Head>

    {/* Hero Section */}
    <HeroSection
      {...props}
      pagePiling={false}
      button={false}
      title={<Box sx={style.heroTitle}>the endless <Box component='span' color='primary.main'>tech chatter</Box>...</Box>}
      image={config.basePath + '/image/blog_banner.png'}
      imageGif={config.basePath + '/image/pencil.gif'}
    />


    {/* Posts */}
    <Container className='section-padding'>
      <Stack spacing={{ xs: 5, md: 10 }}>
        {blogList.map((item, index) => {
          let isEven = index % 2 === 0
          let link = replaceUrl('/blog/' + item.slug)

          return (
            <Box component='article' key={index}>
              <Grid container flexDirection={isEven ? { xs: 'row' } : { xs: 'row-reverse' }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ ...style.box, left: { xs: 'unset', md: isEven ? 15 : -15 }, top: { xs: 15, md: 'unset' } }} zIndex={2} onClick={() => router.push(link)}>
                    <BackgroundThumbnailBox
                      title={item.title.rendered}
                      subtitle={item.formatted_date}
                      backgroundImage={item.acf.image}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ ...style.box, left: { xs: 'unset', md: isEven ? -15 : 15 }, top: { xs: -15, md: 'unset' } }} zIndex={1} onClick={() => router.push(link)}>
                    <DescriptionBox
                      description={item.excerpt.rendered}
                      link={link}
                      quoteIcon={true}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )
        })}
      </Stack>


      {/* == Load More Button == */}
      <Stack className='center' mt={5}>
        <LoadingButton loading={loading} sx={style.loadMore} variant='contained' color='primary' size='large' disableElevation onClick={handleLoadMore} disabled={page >= totalPages}>
          {page >= totalPages ? 'No More Posts' : 'LOAD MORE'}
        </LoadingButton>
      </Stack>


      {/* == Error Message == */}
      <Snackbar
        open={loadingError}
        autoHideDuration={6000}
        onClose={() => setLoadingError(false)}
        message="Something went wrong. Please try again later."
        sx={style.message}
      />

    </Container>
  </>
}



const style = {
  heroTitle: { textTransform: 'none', color: 'text.primary', maxWidth: { xs: 600, xl: 800 }, margin: '0 auto', wordSpacing: { xs: 0, md: '6px' }, letterSpacing: { xs: 0, md: '8px' } },
  box: { cursor: 'pointer', position: 'relative', mx: 'auto', maxWidth: { xs: 500, md: 'unset' } },
  loadMore: { fontFamily: 'var(--font-secondary-family)', fontSize: 'var(--font-size-h4)', px: 4, fontWeight: 600, letterSpacing: .5 },
  message: { '*': { letterSpacing: 0, fontWeight: 300 } }
}



export async function getStaticProps() {
  const [data, blogs] = await axios.all([
    axios.get('/wp/v2/pages?slug=blog'),
    axios.get('/wp/v2/posts?per_page=10&page=1', { dataReturn: false })
  ])

  return {
    props: {
      data: pageApiFilter(data[0]),
      blogs: blogListApiFilter(blogs.data),
      totalPages: Number(blogs.headers['x-wp-totalpages'])
    },
    revalidate: config.apiRevalidateTime
  }
}