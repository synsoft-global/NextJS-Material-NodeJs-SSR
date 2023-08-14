import { replaceUrl } from "@/utils"
import { Box, Container, Stack, Grid, Typography, List, ListItem } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import twitterIcon from '@/public/icon/twitter.png'
import linkedInIcon from '@/public/icon/linked-in.png'
import instagramIcon from '@/public/icon/instagram.png'
import facebookIcon from '@/public/icon/facebook.png'
import isoIcon from '@/public/image/iso.png'



export default function Footer(props) {
  const { footerMenus, setLayout, websiteInfo } = props


  const handleIsoOpen = () => {
    setLayout(items => ({
      ...items,
      isoPopup: true
    }))
  }


  return (
    <Box component='section' className="section" data-section-name='Quick Links' p='0 !important'>
      <Box component='footer' sx={style.root}>
        <Container>
          {/* Links */}
          <Grid container alignItems='start'>
            <Grid item xs={12} md={9} xl={8.5}>
              <Box>
                {footerMenus?.items?.map((item, index) =>
                  <Box key={index} sx={style.menuBox}>
                    <Typography variant='h4' component='h3' sx={style.menuHeading}>{item.title}</Typography>
                    <List>
                      {item?.child_items?.map((link, index) => {
                        let href = link.url
                        let newWindow = false
                        if (href.includes('/portfolio')) {
                          href = 'https://portfolio.synsoftglobal.com'
                          newWindow = true
                        }
                        return (
                          <ListItem disablePadding key={index}>
                            <Link href={replaceUrl(href)} className="w-100" rel='noreferrer' target={newWindow ? '_blank' : '_self'}>
                              <Typography variant='body1' component='span' sx={style.link}>{link.title}</Typography>
                            </Link>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Contact Details Box */}
            <Grid item xs={12} md={3} xl={3.5}>
              <Stack sx={style.contactBox} spacing={3.5}>
                <Box>
                  <Typography sx={style.contactBoxHeading} variant='h5' component='h3'>Mailing Address</Typography>
                  <Typography variant='body2' color='#9b8884' letterSpacing={0} fontWeight={400} dangerouslySetInnerHTML={{ __html: websiteInfo?.address }} />
                </Box>

                <Box>
                  <Typography sx={style.contactBoxHeading} variant='h5' component='h3'>Email Address</Typography>
                  <Link href={`mailto:${websiteInfo?.email}`}>
                    <Typography color='#9b8884' letterSpacing={0} component='span' className='link' variant='body1' fontWeight={400}>{websiteInfo?.email}</Typography>
                  </Link>
                </Box>

                <Box>
                  <Typography sx={style.contactBoxHeading} variant='h5' component='h3'>Phone Number</Typography>
                  <Typography variant='body1' color='#9b8884' className="link-a" fontWeight={400} sx={{ ...style.contactNumberBox, '& *': { mb: '0 !important' } }} dangerouslySetInnerHTML={{ __html: websiteInfo?.phone.replace(/<img/g, '<img loading="lazy" ') }} />
                </Box>

                <Stack direction='row' spacing={2} alignItems='center' flexWrap={{ xs: 'wrap', lg: 'nowrap' }}>
                  <Link href={websiteInfo?.instagram_url} target='_blank' className='link' rel='noopener noreferrer'>
                    <Image {...instagramIcon} width={25} height={25} alt='Instagram' />
                  </Link>
                  <Link href={websiteInfo?.twitter_url} target='_blank' className='link' rel='noopener noreferrer'>
                    <Image {...twitterIcon} width={25} height={25} alt='Twitter' />
                  </Link>
                  <Link href={websiteInfo?.linked_in_url} target='_blank' className='link' rel='noopener noreferrer'>
                    <Image {...linkedInIcon} width={25} height={25} alt='LinkedIn' />
                  </Link>
                  <Link href={websiteInfo?.facebook_url} target='_blank' className='link' rel='noopener noreferrer'>
                    <Image {...facebookIcon} width={25} height={25} alt='Facebook' />
                  </Link>
                  <Box>
                    <Image {...isoIcon} onClick={handleIsoOpen} className="link" width={100} height={70} alt='ISO certificate' />
                  </Box>
                </Stack>

              </Stack>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Copyright */}
        <Box sx={style.copyright}>
          <Container>
            <Stack direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' spacing={{ xs: 1, md: 3 }} justifyContent='space-between'>
              <Typography variant="body2" color="white">&copy; COPYRIGHT SYNSOFT GLOBAL {new Date().getFullYear()}</Typography>
              <Link href='/privacy-policy'>
                <Typography component='span' variant="body2" color='white' letterSpacing={0} className='link'>PRIVACY POLICY</Typography>
              </Link>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box >
  )
}



const style = {
  root: { bgcolor: 'secondary.main', display: 'flex', flexFlow: 'column', pt: 5, overflow: 'hidden' },
  copyright: { bgcolor: 'common.black', mt: { xs: 0, md: 6 }, py: { xs: 2, md: 0.8 } },
  menuBox: { float: 'left', mr: 2, mt: 3, width: { xs: 1, sm: 'auto', md: 250, xl: 310 } },
  menuHeading: { fontWeight: 600, fontFamily: 'var(--font-secondary-family)', color: 'primary.main' },
  link: {
    py: 0.3, transition: '0.3s', display: 'block',
    ':hover': { color: 'success.main' }
  },
  contactBox: {
    bgcolor: 'white', py: 3, px: { xs: 0, md: 3 }, mt: 3, width: 1, color: '#9b8884', zIndex: 1, position: 'relative',
    ':before': { content: `''`, position: 'absolute', height: 1, width: '200vw', bgcolor: 'white', zIndex: -1, left: { xs: -100, md: 0 }, top: 0 }
  },
  contactBoxHeading: { color: '#9b8884', letterSpacing: 0, mb: { xs: 0.5, xl: 1 } },
  contactNumberBox: {
    'a': {
      display: 'flex', alignItems: 'center', color: '#9b8884',
      'span': { mx: 1 },
      'img': { height: 18 }
    },
    'a:not(:last-child)': { mb: 1.5 }
  }
}