import { useState } from "react"
import { Box, Container, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery } from "@mui/material"
import Image from "next/image"
import Accordians from "@/components/_ui/accordians/Accordians"



export default function DomainFeatures(props) {
  const { data } = props
  const [activeItem, setActiveItem] = useState(0)
  const features = Object.values(data.acf.features).filter(item => item.title)
  const faqList = features.map(item => ({ title: item.title, description: item.content }))
  const isMdDown = useMediaQuery(theme => theme.breakpoints.down('md'))

  if (!features) return <></>
  else return (
    <Box className='section' component='section' sx={style.root} data-section-name='Domains'>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Stack sx={style.imgBoxContainer}>
              {features.map((item, index) =>
                <Box key={index} sx={{ display: { xs: 'none', md: activeItem == index ? 'block' : 'none' }, pr: 3 }}>
                  <Stack direction='row' alignItems='center' spacing={3}>
                    <Image width='350' height='350' src={item.image} loading='eager' alt={item.title} />
                    <Box>
                      <Typography variant='h2' sx={style.heading}>{item.title}</Typography>
                      <Typography variant='body2'>{item.content}</Typography>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box component='nav' sx={style.navBox}>
              <Typography variant="h2" className="heading" width={1} mb={3}>FEATURES</Typography>
              {isMdDown
                ? <Accordians list={faqList} />
                : <List disablePadding sx={style.list}>
                  {features.map((item, index) =>
                    <ListItem disablePadding key={index} onMouseOver={() => setActiveItem(index)} onTouchStart={() => setActiveItem(index)}>
                      <ListItemText primary={item.title} sx={style.listItem} />
                    </ListItem>
                  )}
                </List>
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}



const style = {
  root: { overflow: 'hidden' },
  heading: { color: 'text.primary', textTransform: 'unset', mb: 3 },
  navBox: { pl: { xs: 0, md: 10 }, width: { xs: 1, md: 'unset' } },
  list: {},
  listItem: { width: 1, m: 0, py: 1.5 },
  imgBoxContainer: {
    position: 'relative', zIndex: 1, height: 1, justifyContent: 'center',
    ':before': { content: `''`, display: { xs: 'none', md: 'block' }, position: 'absolute', right: 0, bgcolor: 'secondary.main', height: '200%', width: '100vw', zIndex: -1, top: '50%', transform: 'translateY(-50%)' }
  }
}