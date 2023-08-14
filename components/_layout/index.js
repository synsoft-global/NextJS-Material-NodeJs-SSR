import { removeToast } from "@/utils"
import { Box, CssBaseline, useMediaQuery, Snackbar, Alert, CircularProgress } from "@mui/material"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import CssVariables from "./cssVariables/CssVariables"
import useCssVariables from "@/hooks/useCssVariables"
import dynamic from 'next/dynamic'
import Ball from "./ball/Ball"
import SectionNavigation from "./sectionNavigation/SectionNavigation"
import ContactSpeedDial from "../_ui/contact/ContactSpeedDial"
import ExitPopup from "../_ui/contact/ExitPopup"



const ContactPopup = dynamic(() => import("../_ui/contact/ContactPopup"), { ssr: false })
const RequestPortfolio = dynamic(() => import("../_ui/contact/RequestPortfolio"), { ssr: false })
const IsoPopup = dynamic(() => import("../_ui/isoPopup/IsoPopup"), { ssr: false })
const ThankYouPopup = dynamic(() => import("../_ui/thankYouPopup/ThankYouPopup"), { ssr: false, loading: () => <Box className='center' my={10}><CircularProgress /></Box> })



export default function Layout(props) {
  const { children, layout, setLayout } = props
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  useCssVariables()


  return <>
    <Box sx={style.root}>
      <Header {...props} />
      <Box component='main' flexGrow={1}>
        {props.layout.thankYouPopup
          ? <ThankYouPopup {...props} />
          : children
        }
      </Box>
      <Footer {...props} />
    </Box>


    <CssBaseline />
    <CssVariables {...props} />
    <ContactSpeedDial {...props} />
    <ExitPopup {...props} />
    {layout.isoPopup && <IsoPopup {...props} />}
    {layout.requestPortfolioPopup && <RequestPortfolio {...props} />}
    {layout.contactPopup && <ContactPopup {...props} />}
    {isLgUp && <Ball />}
    {isLgUp && !props.layout.thankYouPopup && <SectionNavigation />}


    {layout.toast.map((item, index) =>
      <Snackbar open key={index} autoHideDuration={4000} onClose={() => removeToast(item.key, setLayout)}>
        <Alert severity={item.type} variant="filled" sx={style.alert}>{item.message}</Alert>
      </Snackbar>
    )}
  </>
}


const style = {
  root: { minHeight: '100vh', display: 'flex', flexFlow: 'column' },
  alert: { color: 'white' }
}