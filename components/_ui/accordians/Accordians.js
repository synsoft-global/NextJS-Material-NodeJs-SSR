import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'



export default function Accordians(props) {
  const { list, count } = props
  const [expanded, setExpanded] = useState(0)


  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }


  useEffect(() => {
    if (expanded !== false && expanded !== 0) {
      const element = document.querySelectorAll('.accordian-box')[expanded]?.querySelector('.title')
      setTimeout(() => {
        if (element && !isElementVisible(element)) element.scrollIntoView({ block: 'center' })
      }, 10)
    }
  }, [expanded])


  const isElementVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };


  return (
    <Box sx={style.root}>
      {list.map((item, index) => {
        let isActive = expanded === index
        return (
          <Stack key={index} className='accordian-box'>
            {count && <Typography variant='h3' component='div' sx={style.accordianCount}>{(index + 1).toString().padStart(2, '0')}</Typography>}
            <Stack pl={count ? 6 : 0}>
              <Accordion expanded={isActive} disableGutters elevation={0} onChange={handleExpand(index)}>
                <AccordionSummary expandIcon={isActive ? <RemoveIcon sx={style.accordianIcon} /> : <AddIcon sx={style.accordianIcon} />} sx={{ p: 0 }}>
                  <Typography variant='subtitle1' className='title' letterSpacing={0}>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={style.accordianContent}>
                  <Stack>
                    <Typography variant='body2' component='div' className='ckeditor_content' dangerouslySetInnerHTML={{ __html: item.description }} />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Stack>
        )
      })}
    </Box>
  )
}



const style = {
  root: {
    pl: { md: 10 },
    '.MuiCollapse-root': { transitionDuration: 'unset !important' }
  },
  accordianCount: {
    color: 'text.primary', position: 'relative',
    ':before': { content: `''`, position: 'absolute', height: 5, bgcolor: theme => theme.palette.text.primary, width: 'calc(100% - 2.5rem)', right: 0, top: '50%', transform: 'translateY(-50%)' }
  },
  accordianContent: { borderLeft: 4, borderColor: '#fdb8b6', mb: 3 },
  accordianIcon: { color: 'text.primary' }
}