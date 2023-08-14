import { handleMeta, pageApiFilter, homePageSectionApiFilter } from '@/utils'
import { Box } from '@mui/material'
import config from '@/config/config.json'
import axios from 'axios'
import Head from 'next/head'
import parse from 'html-react-parser'
import dynamic from 'next/dynamic'



const HeroSection = dynamic(() => import('@/components/_sections/heroSection/HeroSection'))
const WhatWeDo = dynamic(() => import('@/components/_sections/whatWeDo/WhatWeDo'))



export default function Page(props) {
  const { data, homePageData } = props
  const acf = data.acf


  return <>
    <Head>{parse(handleMeta(data?.yoast_head))}</Head>

    <Box>
      {acf.enable_banner_section === 'true' && <HeroSection {...props} />}
      {acf.enable_content_section === 'true' && <WhatWeDo {...props} />}
    </Box>
  </>
}



export async function getStaticPaths() {
  const data = await axios.get('/menus/v1/menus/4')
  const paths = data.items[1].child_items.map(item => ({ params: { slug: item.slug } }))
  return { paths, fallback: false }
}



export async function getStaticProps(context) {
  const [data, homePageData] = await axios.all([
    axios.get(`/wp/v2/pages?slug=${context.params.slug}`),
    axios.get('/wp/v2/homepage')
  ])

  return {
    props: {
      data: pageApiFilter(data[0]),
      homePageData: homePageSectionApiFilter(homePageData[0], { so_far: true })
    },
    revalidate: config.apiRevalidateTime
  }
}
