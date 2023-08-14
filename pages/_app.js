import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { footerApiFilter, menuApiFilter, theme } from '@/utils'
import Layout from "@/components/_layout"
import axios from "axios"
import config from "@/config/config.json"
import ErrorBoundary from '@/components/_ui/errorBoundary/ErrorBoundary'
import useNProgress from '@/hooks/useNProgress'
import '@/public/style/global.css'



export default function App({ menus, Component, pageProps }) {
  useNProgress()
  const [layout, setLayout] = useState({
    contactPopup: false,
    requestPortfolioPopup: false,
    thankYouPopup: false,
    exitPopup: false,
    testimonialPopup: false,
    isoPopup: false,
    toast: []
  })


  return (
    <ThemeProvider theme={theme}>
      <Layout layout={layout} setLayout={setLayout} {...menus}>
        <ErrorBoundary>
          <Component layout={layout} setLayout={setLayout} {...pageProps} {...menus} />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  )
}



/* == Axios Interceptors == */
axios.defaults.baseURL = config.apiBaseUrl
axios.interceptors.response.use(
  response => response.config?.dataReturn !== false && response.status < 400 ? response.data : response,
  error => {
    console.error(`😲 OMG Api Failed - Details:`, { url: error.config?.url, error: error })
    return Promise.reject(error)
  }
)



/* == API == */
App.getInitialProps = async () => {
  const [headerMenus, footerMenus, websiteInfo] = await axios.all([
    axios.get('/menus/v1/menus/4'),
    axios.get('/menus/v1/menus/10'),
    axios.get('wp/v2/siteoptions')
  ])

  return {
    menus: {
      headerMenus: menuApiFilter(headerMenus),
      footerMenus: footerApiFilter(footerMenus),
      websiteInfo
    }
  }
}