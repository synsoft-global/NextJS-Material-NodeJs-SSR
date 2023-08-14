import React, { useRef, useState } from 'react'
import { Stack, Box, Grid, Typography, Link as MuiLink, TextField, Select, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { addToast } from '@/utils'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Recaptcha from 'react-google-invisible-recaptcha'
import axios from 'axios'
const reCaptchaKey = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '6LdICbQZAAAAANE8u9s-n9iccBxf5MCmBivPRTVi' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'



export default function QuoteContactForm(props) {
  let refRecaptcha = useRef(null)
  const [loading, setLoading] = useState(false)
  const { buttonText = 'send request', setLayout } = props
  const { register, handleSubmit, formState: { errors }, reset, watch, control } = useForm()


  const onSubmit = async (data) => {
    setLoading(true)
    data.form_url = window.location.href
    data['g-recaptcha-response'] = refRecaptcha.current?.callbacks?.getResponse()
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))

    if (data['g-recaptcha-response']) {
      try {
        const respone = await axios.post('/wp/v2/savecontact', formData)
        if (!respone.success) throw respone
        setLayout(items => ({ ...items, thankYouPopup: true }))
        refRecaptcha.current.callbacks.reset()
        reset()
      } catch (error) {
        console.log(error)
        addToast(error?.message || 'Something went wrong', 'error', setLayout)
      }
    } else {
      addToast('Captcha verification failed', 'error', setLayout)
    }

    setLoading(false)
  }


  return (
    <Grid container component='form' sx={style.root} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1.5} width={1}>

        {/* Technology */}
        <Box>
          <Select variant="standard" native fullWidth
            {...register('technology', {
              required: { value: true, message: 'Required*' },
            })}
          >
            <option value="" hidden>I would like a quote for</option>
            <option value="Website / Mobile Apps Development">Website / Mobile Apps Development</option>
            <option value="UI / UX Design">UI / UX Design </option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Blockchain / IOT">Blockchain / IOT</option>
            <option value="Other">Other</option>
          </Select>
          <FormHelperText error>{errors.technology?.message}</FormHelperText>
        </Box>


        {/* Description */}
        <TextField multiline rows={3}
          inputProps={{ spellCheck: false, maxLength: 1000 }}
          placeholder='Describe your requirement'
          {...register('topic', {
            maxLength: { value: 1000, message: 'Describe under 1000 characters' },
          })}
          error={!!errors.topic}
          helperText={errors.topic?.message}
        />
        <FormHelperText sx={style.description}>{watch('topic')?.length || 0}/1000</FormHelperText>


        {/* Company */}
        <TextField
          type='text'
          placeholder='Company *'
          {...register('company', {
            required: { value: true, message: 'Required*' },
            maxLength: { value: 100, message: 'Enter valid company name' },
          })}
          error={!!errors.company}
          helperText={errors.company?.message}
        />


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


        {/* Phone */}
        <TextField
          type='tel'
          placeholder='Phone Number *'
          {...register('usermobile', {
            required: { value: true, message: 'Required*' },
            minLength: { value: 10, message: 'Enter valid phone number' },
            maxLength: { value: 14, message: 'Enter valid phone number' },
          })}
          error={!!errors.usermobile}
          helperText={errors.usermobile?.message}
        />
      </Stack>


      {/* Submit */}
      <Grid item xs={12} className='center' flexDirection='column'>
        <LoadingButton loading={loading} variant='underline' sx={style.button} type='submit'>{buttonText}</LoadingButton>
        <Typography variant='subtitle2' textAlign='center' component='div' mt={5} textTransform='unset'>If you are looking for a job, <Link href='/careers'><MuiLink component='span'>click here to apply</MuiLink></Link></Typography>
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
  input: {
    bgcolor: 'transparent', borderRadius: 0, border: 0, outline: 0, fontFamily: 'var(--font-special-family)', fontSize: 'var(--font-size-subtitle1)', color: 'text.primary', px: 2, borderBottom: 2, borderColor: 'text.primary', width: 1, py: 1,
    '::placeholder': { color: 'text.primary' }
  },
  description: { ml: 'auto !important' }
}



QuoteContactForm.propTypes = {
  buttonText: PropTypes.string
}