import React, { useRef, useState } from 'react'
import { Stack, Grid, Typography, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { addToast } from '@/utils'
import Recaptcha from 'react-google-invisible-recaptcha'
import axios from 'axios'
const reCaptchaKey = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '6LdICbQZAAAAANE8u9s-n9iccBxf5MCmBivPRTVi' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'


export default function SendPortfolioForm(props) {
  let refRecaptcha = useRef(null)
  const [loading, setLoading] = useState(false)
  const { buttonText = 'send request', setLayout } = props
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()

  const handleClose = () => {
    setLayout(items => ({ ...items, requestPortfolioPopup: false }))
  }

  const onSubmit = async (data) => {
    setLoading(true)
    data.form_url = window.location.href
    data['g-recaptcha-response'] = refRecaptcha.current?.callbacks?.getResponse()
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))

    if (data['g-recaptcha-response']) {
      try {
        await axios.post('/wp/v2/sendportfolio', formData)
        addToast('Our Portfolio has been mailed to you. Thank you for contacting us!', 'success', setLayout)
        refRecaptcha.current.callbacks.reset()
        reset()
        handleClose()
      } catch (error) {
        console.log(error)
        addToast('Something went wrong', 'error', setLayout)
      }
    } else {
      addToast('Captcha verification failed', 'error', setLayout)
    }

    setLoading(false)
  }



  return (
    <Grid container component='form' sx={style.root} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1.5} width={1}>
        <Typography variant='h3' sx={style.contactHeading} mb={3}>Could you send me the portfolio</Typography>
        <Typography variant='h4' component='div' sx={style.contactHeading}>My email id is</Typography>

        {/* Email */}
        <Controller name='useremail' control={control}
          rules={{
            required: { value: true, message: 'Required*' },
            maxLength: { value: 250, message: 'Enter valid email' },
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' },
          }}
          render={({ fieldState: { error }, field: { value, onChange } }) =>
            <TextField placeholder='Email Id *' type='email' value={value || ''} onChange={event => { onChange(event); refRecaptcha.current.callbacks.execute() }} error={!!error} helperText={error?.message} />
          }
        />

      </Stack>


      {/* Submit */}
      <Grid item xs={12} className='center' flexDirection='column'>
        <LoadingButton loading={loading} variant='underline' sx={style.button} type='submit'>{buttonText}</LoadingButton>
      </Grid>


      {/* Recaptcha */}
      <Recaptcha
        ref={refRecaptcha}
        sitekey={reCaptchaKey}
      />
    </Grid>
  )
}


const style = {
  root: { zIndex: 1 },
  button: { px: 6 },
  contactHeading: { fontFamily: 'var(--font-special-family)', color: 'text.primary', textTransform: 'unset', textAlign: 'center' },
}