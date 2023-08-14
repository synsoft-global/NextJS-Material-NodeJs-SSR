import { createTheme } from '@mui/material/styles'
import { teal } from '@mui/material/colors'



var theme = createTheme({
  palette: {
    primary: { main: '#d4b97c' },
    secondary: { main: '#f6eeea', dark: '#f3e7e2', light: '#fff9f6' },
    success: { main: '#70b9c6', dark: '#48c2c5', light: '#a1e1ed' },
    common: { black: '#293039', subheading: '#415164' },
    text: { primary: '#293039', secondary: '#6c757d', light: '#999', dark: '#415164' }
  }
})



theme = createTheme({
  palette: {
    ...theme.palette
  },
  typography: {
    fontFamily: 'var(--font-primary-family)',
    h1: {
      fontSize: '3rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-primary-family)', color: theme.palette.text.primary, letterSpacing: 2,
      [theme.breakpoints.up('xl')]: { fontSize: '3.75rem' },
      [theme.breakpoints.down('lg')]: { fontSize: '2.3125rem' }
    },
    h2: {
      fontSize: '1.8125rem', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-secondary-family)', color: theme.palette.primary.main, letterSpacing: 0.5, wordSpacing: 1,
      [theme.breakpoints.up('xl')]: { fontSize: '2.20rem' },
    },
    h3: {
      fontSize: '1.5rem', fontWeight: 400, textTransform: 'uppercase', fontFamily: 'var(--font-secondary-family)', color: theme.palette.primary.main, letterSpacing: 0.5, wordSpacing: 1,
      [theme.breakpoints.up('xl')]: { fontSize: '1.875rem' },
    },
    h4: {
      fontSize: '1.3125rem', fontWeight: 400, textTransform: 'unset', fontFamily: 'var(--font-primary-family)', color: theme.palette.text.primary, letterSpacing: 0, wordSpacing: 0,
    },
    h5: {
      fontSize: '1rem', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'var(--font-secondary-family)', color: theme.palette.text.secondary, letterSpacing: '1.5px', wordSpacing: 0.7,
      [theme.breakpoints.up('xl')]: { fontSize: '1.1875rem' },
    },
    h6: { fontSize: '0.9375rem', fontWeight: 400, textTransform: 'unset', fontFamily: 'var(--font-secondary-family)', color: theme.palette.text.primary, letterSpacing: 0, wordSpacing: 0 },
    subtitle1: {
      fontSize: '1.0625rem', fontWeight: 500, textTransform: 'capitalize', color: theme.palette.text.primary,
      [theme.breakpoints.up('xl')]: { fontSize: '1.125rem' },
    },
    subtitle2: {
      fontSize: '1rem', fontWeight: 500, textTransform: 'capitalize', color: theme.palette.text.primary, letterSpacing: 0, wordSpacing: 0,
      [theme.breakpoints.up('xl')]: { fontSize: '1.0625rem' },
    },
    body1: {
      fontSize: '0.9375rem', fontWeight: 400, letterSpacing: '1.3px', color: theme.palette.text.primary,
      [theme.breakpoints.up('xl')]: { fontSize: '1rem' },
    },
    body2: {
      fontSize: '0.875rem', fontWeight: 400, letterSpacing: '1.6px', color: theme.palette.text.primary,
      [theme.breakpoints.up('xl')]: { fontSize: '0.9375rem' },
    },
  },
  shape: {
    borderRadius: 7
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: { fontFamily: 'var(--font-secondary-family)', fontSize: '1.5625rem', fontWeight: 400, color: theme.palette.text.primary }
      }
    },
    MuiButton: {
      defaultProps: {
        color: 'success',
      },
      styleOverrides: {
        text: {
          color: theme.palette.success.main, fontFamily: 'var(--font-secondary-family)', fontSize: '1rem', fontWeight: 400,
          ':hover': { backgroundColor: teal[50] }
        },
        contained: { color: 'white' },
        root: { textTransform: 'unset' }
      },
      variants: [
        {
          props: { variant: 'underline' },
          style: {
            fontSize: '2.25rem', fontFamily: 'var(--font-secondary-family)', fontWeight: 400, background: 'transparent !important',
            ':before': { content: `''`, position: 'absolute', height: 5, width: '100%', background: theme.palette.text.primary, bottom: 0, transition: '0.3s' },
            '.MuiTouchRipple-root': { display: 'none' }
          }
        },
        {
          props: { variant: 'link' },
          style: {
            color: theme.palette.success.main, whiteSpace: 'nowrap', fontSize: '0.9375rem', fontWeight: 500, letterSpacing: 0, background: 'transparent !important',
            ':before': { content: `''`, position: 'absolute', height: 3, width: 0, background: theme.palette.success.main, bottom: 0, transition: '0.3s' },
            ':hover:before': { width: '100%' },
            '.MuiTouchRipple-root': { display: 'none' }
          }
        }
      ]
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: `min(${theme.breakpoints.values.xl}px, calc(100vw - 138px)) !important`,
          [theme.breakpoints.down('xl')]: { maxWidth: `${theme.breakpoints.values.lg}px !important` }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ theme }) => theme.unstable_sx({
          'span': { fontSize: 'var(--font-size-subtitle1)' }
        }),
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'input, textfield': {
            fontFamily: 'var(--font-special-family)',
            letterSpacing: 0,
          }
        },
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          letterSpacing: 0.5,
          fontFamily: 'var(--font-secondary-family)',
          fontWeight: 300,
          fontSize: '0.875rem'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'standard' && {
            flex: 1,
            '.MuiInputBase-root:before': {
              borderBottomWidth: '2px !important',
              borderColor: `${theme.palette.text.primary} !important`,
            },
            '.MuiInputBase-root:after': {
              borderColor: `${theme.palette.text.primary} !important`,
            },
            'input, textarea': {
              fontFamily: 'var(--font-special-family)',
              fontSize: 'var(--font-size-subtitle1)',
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              '::placeholder': {
                color: theme.typography.subtitle1.color,
                opacity: 1
              }
            },
          })
        })
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-root:before': {
            borderBottomWidth: '2px !important',
            borderColor: `${theme.palette.text.primary} !important`,
          },
          '&.MuiInputBase-root:after': {
            borderColor: `${theme.palette.text.primary} !important`,
          },
        }
      }
    },
    MuiNativeSelect: {
      styleOverrides: {
        select: {
          fontFamily: 'var(--font-special-family) !important',
          fontSize: `var(--font-size-subtitle1) !important`,
          paddingLeft: `${theme.spacing(2)} !important`,
          paddingRight: `${theme.spacing(3.5)} !important`
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontFamily: 'var(--font-special-family) !important',
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          letterSpacing: 0,
          fontWeight: 300,
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': theme.unstable_sx({
            mx: 2.5,
            '.close': {
              position: 'absolute', top: { xs: -17, sm: -22.5 }, right: { xs: -17, sm: -22.5 }, background: 'unset', p: 0, display: 'flex',
              'img': { height: { xs: 34, sm: 45 }, width: { xs: 34, sm: 45 }, background: 'transparent' }
            }
          }),
          '.MuiDialog-paper': {
            [theme.breakpoints.down('sm')]: { maxWidth: '100% !important' }
          },
          '.MuiDialog-paperFullScreen': {
            margin: 0
          }
        }
      }
    }
  }
})


export var theme = theme



export function generateResponsiveFontSizeVariables(theme) {
  let css = ''
  Object.keys(theme.typography).forEach((key) => {
    if (typeof theme.typography[key] === 'object') {
      Object.keys(theme.breakpoints.values).forEach((breakpoint) => {
        if (theme.typography[key][theme.breakpoints.up(breakpoint)]) {
          const fontSize = theme.typography[key][theme.breakpoints.up(breakpoint)].fontSize;
          css += `
            ${theme.breakpoints.up(breakpoint)}{
              :root{
                --font-size-${key}: ${handleFontSize(fontSize)};
              }
            }
          `
        }

        if (theme.typography[key][theme.breakpoints.down(breakpoint)]) {
          const fontSize = theme.typography[key][theme.breakpoints.down(breakpoint)].fontSize;
          css += `
            ${theme.breakpoints.down(breakpoint)}{
              :root{
                --font-size-${key}: ${handleFontSize(fontSize)};
              }
            }
          `
        }
      })
    }
  })
  return css
}



export function generateFontSizeVariables(theme) {
  let css = ''
  css += `--font-size-base: ${handleFontSize(theme.typography.fontSize)};`

  Object.keys(theme.typography).forEach((key) => {
    if (key !== 'fontSize' && typeof theme.typography[key] === 'object') {
      css += `--font-size-${key}: ${handleFontSize(theme.typography[key].fontSize)};`
    }
  })
  return css
}



const handleFontSize = (fontSize) => /^\d+$/.test(fontSize) ? `${fontSize}px` : fontSize