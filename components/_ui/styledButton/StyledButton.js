import { ButtonBase } from "@mui/material"
import config from '@/config/config.json'



export default function StyledButton(props) {
  const { children, ...other } = props
  return (
    <ButtonBase disableRipple sx={style.root} {...other}>
      {children}
    </ButtonBase>
  )
}


const style = {
  root: {
    px: '72px', py: '28px', transition: 'transform 0.4s, opacity 0.4s !important', lineHeight: 1, mt: 5, background: `url(${config.basePath}/image/explore-btn-bg.png) 0 0/100% 100%`, fontSize: { xs: '2rem' },
    ':before': { content: `''`, position: 'absolute', bottom: -10, left: 15, transform: 'rotate(0deg)', width: 46, bgcolor: 'red', height: 4, background: `url(${config.basePath}/image/explore-btn-shadow.png)` },
    ':hover': { transform: 'translateY(-8px)' }
  }
}