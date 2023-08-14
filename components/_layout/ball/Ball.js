import { Box } from '@mui/material'
import config from '@/config/config.json'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'



export default function Ball() {
  const [show, setShow] = useState(false)
  const router = useRouter()


  useEffect(() => {
    if (router.pathname == '/') {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 20000)
    } else {
      setShow(false)
    }
  }, [router.pathname])


  if (!show) return <></>
  return (
    <Box>
      <Box id="traveler" sx={style.traveler}>
        <Box id="bouncer">
          <img width={600} height={600} src={config.basePath + '/image/ball.png'} decoding='sync' alt='' loading='lazy' />
        </Box>
      </Box>
    </Box>
  )
}



const style = {
  traveler: { zIndex: theme => theme.zIndex.mobileStepper },
  img: { position: 'relative', left: '100vw', filter: 'drop-shadow(-100vw 4px 0 black)' }
}