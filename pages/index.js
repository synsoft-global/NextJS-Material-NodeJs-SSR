import { Box } from '@mui/material'
import { homePageApiFilter, testimonialsApiFilter, handleMeta } from '@/utils'
import config from '@/config/config.json'
import axios from 'axios'
import Head from 'next/head'
import parse from 'html-react-parser'
import ContactCTA from '@/components/_ui/contact/ContactCTA'
import dynamic from 'next/dynamic'



const HeroSection = dynamic(() => import('@/components/home/heroSection'))



export default function Page(props) {
  const { data } = props
  const whatWeDoList = data.tech.map(item => ({
    title: item.post_title,
    image: item.post_image,
    content: item.post_content,
    link: item.post_slug
  }))


  return <>
    <Head>{parse(handleMeta(data?.yoast_head))}</Head>
    <Box>
      {data.acf.enable_homepage_banner === 'true' && <HeroSection {...props} />}    
    </Box>
  </>
}



export async function getStaticProps() {
  const [data, testimonials] = await axios.all([
    axios.get('/wp/v2/homepage'),
    axios.get('/wp/v2/testimonials')
  ])

  return {
    props: {
      data: homePageApiFilter(data[0]),
      testimonials: testimonialsApiFilter(testimonials)
    },
    revalidate: config.apiRevalidateTime
  }
}