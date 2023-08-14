import { useEffect, useState } from 'react'
import { Box, Collapse, Container, Dialog, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import { replaceUrl } from '@/utils'
import { Scrollbar } from '@/components/_ui/scrollbar/Scrollbar'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import logoLightImage from '@/public/image/logo-light.png'
import cancelIcon from '@/public/image/cancel.png'



export default function MenuPopup(props) {
  const { headerMenus, openMenu, setOpenMenu } = props
  const [activeMenu, setActiveMenu] = useState(0)
  const isMediumDeviceUp = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const isSubmenu = headerMenus?.items[activeMenu]?.child_items?.length > 0


  useEffect(() => {
    Router.events.on('routeChangeStart', () => setOpenMenu(false))
  }, [])


  useEffect(() => {
    setTimeout(() => {
      if (openMenu) document.querySelectorAll('.menu-content').forEach(item => item.style.opacity = 1)
    }, [300])
  }, [openMenu])


  const handleClose = () => {
    document.querySelector('#menu-dialog').classList.add('hide')
    document.querySelectorAll('.menu-content').forEach(item => item.style.opacity = 0)
    setTimeout(() => {
      setOpenMenu(false)
      setActiveMenu(0)
    }, 500)
  }


  return (
    <Dialog open={true} fullScreen sx={style.root} id='menu-dialog' transitionDuration={0} maxWidth='md' keepMounted>
      <Scrollbar style={{ maxHeight: '100vh' }}>

        {/* == Logo & Close == */}
        <Container sx={style.closeContainer} className='max-width-unset menu-content'>
          <Stack direction='row' justifyContent='space-between' alignItems='center' py='20px'>

            {/* Logo */}
            <Link href='/'>
              <Stack sx={style.logoImage}>
                <Image {...logoLightImage} width={280} height={25} alt='logo' />
              </Stack>
            </Link>

            {/* Close */}
            <Stack sx={style.close} onClick={handleClose} id='closeMenu'>
              <Image {...cancelIcon} width={30} height={30} alt='close icon' />
            </Stack>

          </Stack>
        </Container>


        {/* == Menu Content == */}
        <Container sx={style.container} className='menu-content'>
          <Grid container spacing={0}>

            <Grid item xs={12} md={7} sx={style.subMenu}>
              <Stack width={1} overflow='hidden' direction='column'>

                {/* Blog & Contact */}
                <Stack direction='row' color='white' justifyContent='end' className='top-links'>
                  {headerMenus?.items?.filter(item => item.classes.includes('top_menu')).reverse().map((item, index) =>
                    <Link href={replaceUrl(item.url)} className='d-inline-block' key={index}>
                      <Box component='span' sx={style.topLinks}>{item?.title}</Box>
                    </Link>
                  )}
                </Stack>

                {(headerMenus?.items[activeMenu]?.description || isSubmenu) &&
                  <Box sx={style.subMenuBox}>
                    <Stack direction='row' flex={1}>

                      {/* Featured */}
                      {headerMenus?.items[activeMenu]?.description && headerMenus?.items[activeMenu]?.attr_title &&
                        <Grid item xs={isSubmenu ? 5 : 12} key={activeMenu}>
                          <Box bgcolor={isSubmenu ? 'secondary.main' : 'white'} height={1} p={3}>
                            <Typography variant='h3' fontFamily='var(--font-secondary-family)' mb={2.5} textAlign={isSubmenu ? 'center' : 'left'}>FEATURED</Typography>
                            <Link href={replaceUrl(headerMenus?.items[activeMenu]?.url)} className='link w-100' style={{ pointerEvents: isSubmenu ? '' : 'none' }}>
                              <Stack direction='row' alignItems='center' component='span' textAlign='center' justifyContent='center'>
                                <Typography variant='subtitle1' component='span' sx={style.featureHeading} dangerouslySetInnerHTML={{ __html: headerMenus?.items[activeMenu]?.attr_title }} />
                              </Stack>
                            </Link>

                            <Link href={replaceUrl(headerMenus?.items[activeMenu]?.url)} style={{ pointerEvents: isSubmenu ? '' : 'none' }}>
                              <Box mt={3} sx={style.imgBox} component='span'>
                                <Image src={headerMenus.items[activeMenu]?.description} width={600} height={0} style={{ width: '100%' }} alt={headerMenus.items[activeMenu]?.attr_title || ''} />
                              </Box>
                            </Link>
                          </Box>
                        </Grid>
                      }

                      {/* Submenu */}
                      {isSubmenu &&
                        <Grid item xs={7}>
                          <Box component='nav' bgcolor='white' p={2}>
                            <List disablePadding>
                              {headerMenus?.items[activeMenu]?.child_items?.map((item, index) =>
                                <ListItem disablePadding key={index}>
                                  <Link href={replaceUrl(item?.url)} className='w-100'>
                                    <ListItemButton sx={style.subMenuButton}>
                                      <KeyboardArrowRightIcon sx={style.linkArrow} />
                                      <ListItemText primary={item?.title} />
                                    </ListItemButton>
                                  </Link>
                                </ListItem>
                              )}
                            </List>
                          </Box>
                        </Grid>
                      }

                    </Stack>
                  </Box>
                }
              </Stack>
            </Grid>


            {/* Menu */}
            <Grid item xs={12} md={5}>
              <Box component='nav'>
                <List sx={style.menuList}>
                  {headerMenus?.items?.filter(item => !item.classes.includes(isMediumDeviceUp ? 'top_menu' : null))?.map((item, index) =>
                    <div key={index}>
                      <ListItem disablePadding>
                        <Stack direction='row' width={1} alignItems='center'>
                          <Link href={replaceUrl(item?.url)} className='w-100' onClick={() => item.url == '#' && setActiveMenu(index)}>
                            <ListItemButton sx={style.linksButton} className={index == activeMenu ? 'active' : ''} onMouseOver={() => isMediumDeviceUp && setActiveMenu(index)} onTouchStart={() => isMediumDeviceUp && setActiveMenu(index)}>
                              <ListItemText primary={item?.title} sx={{ 'span': { ...style.listItem, color: (index == activeMenu && isMediumDeviceUp) ? 'primary.main' : 'white' } }} />
                            </ListItemButton>
                          </Link>

                          {Boolean(item?.child_items?.length) &&
                            <IconButton color='secondary' sx={style.dropdownArrow} onClick={() => setActiveMenu(value => value == index ? -1 : index)}>
                              {activeMenu == index ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          }
                        </Stack>
                      </ListItem>

                      {!isMediumDeviceUp && Boolean(item?.child_items?.length) &&
                        <Collapse in={activeMenu == index} timeout={500} unmountOnExit>
                          <Box sx={style.mobileDropdownBox}>
                            <List component="div" disablePadding>
                              {item.child_items.map((item, index) =>
                                <Link href={replaceUrl(item?.url)} className='w-100' key={index}>
                                  <ListItemButton sx={style.linksButton}>
                                    <ListItemText primary={item?.title} />
                                  </ListItemButton>
                                </Link>
                              )}
                            </List>
                          </Box>
                        </Collapse>
                      }
                    </div>
                  )}
                </List>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Scrollbar>
    </Dialog>
  )
}



/* == Style == */
const style = {
  root: {
    '.menu-content': { transition: '0.3s', opacity: 0 },
    '.MuiBackdrop-root': { bgcolor: '#293039' },
    ':not(.MuiModal-hidden) .MuiBackdrop-root': { animation: 'menuSlideDown 0.5s ease-in-out forwards' },
    '&.hide .MuiBackdrop-root': { animation: 'menuSlideUp 0.5s ease-in-out forwards' },
    '.MuiDialog-container > .MuiPaper-root': { bgcolor: 'transparent' },
    '.top-links a:nth-of-type(even) span:before': { bgcolor: 'success.dark' },
    '.top-links a:nth-of-type(odd) span:before': { bgcolor: 'success.light' },
    '.top-links a:nth-of-type(odd):last-child': { bgcolor: 'success.light' },
    '.top-links a:nth-of-type(even):last-child': { bgcolor: 'success.dark' },
  },
  subMenu: { display: { xs: 'none', md: 'flex' }, overflow: 'hidden' },
  linksButton: {
    textAlign: { xs: 'left', md: 'right' }, borderRadius: 0, px: { xs: 3, md: 2 }, mr: { xs: 0, md: -2 }, py: 1.6,
    'span': { color: 'rgba(255, 255, 255, 0.85)' }
  },
  subMenuButton: { borderRadius: 0.6 },
  menuList: {
    p: 0, mt: { xs: 0, md: '57px', xl: '63px' },
    '.MuiListItemButton-root': { position: 'relative', },
    '.MuiListItemButton-root:before': { content: `''`, position: 'absolute', transition: '1s', height: 1, right: 0, top: 0, left: '100%', bgcolor: 'rgba(173, 173, 173, 0.3)', opacity: 0 },
    '.MuiListItemButton-root:hover, .MuiListItemButton-root.active': { 'span': { color: 'primary.dark' } },
    '.MuiListItemButton-root:hover:before, .MuiListItemButton-root.active:before': { left: { xs: '100%', md: '0' }, opacity: 1 }
  },
  featureHeading: { fontFamily: 'var(--font-secondary-family)', textTransform: 'uppercase', color: 'text.primary', fontWeight: 400, letterSpacing: '2px' },
  closeContainer: {},
  close: { cursor: 'pointer' },
  subMenuBox: { bgcolor: 'white', flex: 1, flexFlow: 'row', animation: 'fadeIn 0.3s forwards', display: 'flex' },
  imgBox: { overflow: 'hidden', display: 'flex' },
  container: { py: { xs: 3, lg: 4, xl: 10 } },
  dropdownArrow: { display: { xs: 'flex', md: 'none' } },
  mobileDropdownBox: { bgcolor: 'rgb(255, 255, 255, 0.1)', borderRadius: 1 },
  topLinks: {
    py: 1.6, px: 8, display: 'flex', transition: '0.3s', ml: '-1px', position: 'relative', zIndex: 1, color: 'text.primary', fontFamily: 'var(--font-secondary-family)', fontWeight: 400, fontSize: 'var(--font-size-h4)',
    ':before': { content: `''`, position: 'absolute', inset: 0, zIndex: -1, transform: 'skewX(21deg)' },
    ':hover': { color: 'white' }
  },
  linkArrow: { color: 'text.secondary', fontSize: '75%', mr: 0.5 },
  listItem: { fontFamily: 'var(--font-secondary-family)', fontSize: 'var(--font-size-h3)', letterSpacing: '2px', fontWeight: 400 },
  logoImage: {
    'img': { maxWidth: { xs: 210, xl: 280 } }
  },
}