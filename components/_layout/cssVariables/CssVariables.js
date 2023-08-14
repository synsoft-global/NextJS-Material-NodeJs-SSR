import { useTheme } from '@mui/material'
import { generateFontSizeVariables, generateResponsiveFontSizeVariables } from '@/utils'



export default function CssVariables(props) {
  const theme = useTheme()

  return <>
    <style jsx global>
      {`
        :root{
          --palette-primary-main: ${theme.palette.primary.main};
          --palette-primary-dark: ${theme.palette.primary.dark};
          --palette-primary-light: ${theme.palette.primary.light};

          --palette-secondary-main: ${theme.palette.secondary.main};
          --palette-secondary-dark: ${theme.palette.secondary.dark};
          --palette-secondary-light: ${theme.palette.secondary.light};

          --palette-success-main: ${theme.palette.success.main};
          --palette-success-dark: ${theme.palette.success.dark};
          --palette-success-light: ${theme.palette.success.light};

          --palette-text-primary: ${theme.palette.text.primary};
          --palette-text-secondary: ${theme.palette.text.secondary};
          --palette-text-light: ${theme.palette.text.light};
          --palette-text-disabled: ${theme.palette.text.disabled};
          --palette-text-dark: ${theme.palette.text.dark};

          --font-primary-family: Poppins;
          --font-secondary-family: Oswald;
          --font-special-family: Special Elite;
          --border-radius: ${theme.shape.borderRadius}px;
          
          font-size:19px;
          ${generateFontSizeVariables(theme)}
        }

        ${generateResponsiveFontSizeVariables(theme)}

        ${theme.breakpoints.down('xl')}{
          :root{
            font-size:16px;
          }
        }

        ${theme.breakpoints.up('xl')}{
          :root{
            --section-spacing: 80px;
          }
        }
      `}
    </style>
  </>
}
