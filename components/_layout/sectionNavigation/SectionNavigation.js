import React, { useEffect, useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot } from '@mui/lab'
import Router from 'next/router'
import { scrollToSection, debounce, capitalizeWords } from '@/utils'



function SectionNavigation() {
  const [sectionNavigation, setSectionNavigation] = useState()


  useEffect(() => {
    const handleNavigation = () => {
      const items = []
      document.querySelectorAll('.section').forEach(item => {
        const name = item.dataset.sectionName
        items.push({ section: item, name, active: false })
      })
      setSectionNavigation(items)
      handleSectionActive()
    }

    Router.ready(() => {
      handleNavigation()
      Router.events.on('routeChangeComplete', () => {
        let count = 0
        let check = setInterval(() => {
          handleNavigation()
          count += 1
          if (count >= 5) clearInterval(check)
        }, 1000)
      })
      window.addEventListener('scroll', debounce(handleSectionActive, 10))
    })
  }, [])


  const handleClick = (item) => {
    scrollToSection(item.section)
  }


  const handleSectionActive = () => {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop
    const sections = document.querySelectorAll('.section')

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - (window.innerHeight / 2)
      const sectionBottom = sectionTop + section.offsetHeight

      if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
        setSectionNavigation(items => items.map((item, itemIndex) => {
          if (itemIndex === index) item.active = true
          else item.active = false
          return item
        }))
      }
    })
  }


  if (!sectionNavigation || sectionNavigation.length <= 1) return <></>
  return (
    <Box sx={style.root}>
      <Timeline position='left'>
        {sectionNavigation.map((item, index) =>
          <TimelineItem key={index} sx={style.item} onClick={() => handleClick(item)}>
            <TimelineSeparator>
              <Tooltip title={<Box component='span' textTransform='capitalize'>{capitalizeWords(item.name)}</Box>} placement='left'>
                <TimelineDot variant='outlined' sx={{ ...style.dot, bgcolor: item.active ? 'primary.main' : 'white', borderColor: item.active ? 'primary.main' : 'divider' }} />
              </Tooltip>
              {(sectionNavigation.length - 1) !== index && <TimelineConnector sx={style.connector} />}
            </TimelineSeparator>
          </TimelineItem>
        )}
      </Timeline>
    </Box>
  )
}



const style = {
  root: { position: 'fixed', top: '50%', transform: 'translateY(-50%)', right: 0, zIndex: theme => theme.zIndex.speedDial, visibility: { xs: 'hidden', md: 'unset' } },
  dot: { my: 0, p: '7px', borderWidth: 1 },
  connector: { bgcolor: 'text.primary', height: 13 },
  item: { minHeight: 0, cursor: 'pointer', ':before': { display: 'none' } }
}



export default React.memo(SectionNavigation)