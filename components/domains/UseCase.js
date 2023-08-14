import Image from 'next/image'
import { Box, Container, Stack, Typography } from '@mui/material'
import { upperCaseWords } from '@/utils'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/navigation"



export default function UseCase(props) {
  const { data } = props
  const sliders = data.acf.use_cases


  if (!sliders) return <></>
  else return (
    <Box component='section' className='section' data-section-name='Use Cases'>
      <Container>
        <Stack className='center' textAlign='center' mb={6}>
          <Typography variant='h2' className='heading'>{upperCaseWords(data.title.rendered)} USE CASES</Typography>
        </Stack>
        <Box sx={style.sliderContainer}>
          <Swiper
            navigation={true}
            modules={[Autoplay, Navigation]}
            spaceBetween={52}
            autoplay={{ delay: 6000, pauseOnMouseEnter: true }}
            className='styled-arrow'
            loop={true}
            breakpoints={{
              900: {
                slidesPerGroup: 3,
                slidesPerView: 3
              },
              600: {
                slidesPerGroup: 2,
                slidesPerView: 2
              },
              0: {
                slidesPerGroup: 1,
                slidesPerView: 1
              }
            }}
          >
            {Object.keys(sliders).map((item, index) =>
              sliders[item].image
                ? <SwiperSlide key={index}>
                  <Box sx={style.imageBox} className='center'>
                    <Image src={sliders[item].image} width={280} height={280} alt='Use Cases Images' />
                  </Box>
                  <Typography variant='h4' sx={style.title}>{sliders[item]?.title}</Typography>
                  <Typography variant='body1' sx={style.content} >{sliders[item]?.content}</Typography>
                </SwiperSlide>
                : null
            )}
          </Swiper>
        </Box>
      </Container>
    </Box>
  )
}



const style = {
  imageBox: { 'img': { border: 12, borderColor: 'primary.main', borderRadius: '100%' } },
  title: { fontFamily: 'var(--font-secondary-family)', textAlign: 'center', fontWeight: 500, mt: 3, mb: 2 },
  content: { textAlign: 'center' },
  sliderContainer: { position: 'relative', px: '50px', overflow: 'hidden' },
}