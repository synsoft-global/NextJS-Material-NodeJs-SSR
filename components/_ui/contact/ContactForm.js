import { useRef, useState } from 'react'
import { Stack, Box, Grid, Typography, Link as MuiLink, TextField, Select, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { addToast } from '@/utils'
import Recaptcha from 'react-google-invisible-recaptcha'
import Link from 'next/link'
import axios from 'axios'
const reCaptchaKey = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '6LdICbQZAAAAANE8u9s-n9iccBxf5MCmBivPRTVi' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'


export default function ContactForm(props) {
  const refRecaptcha = useRef(null)
  const [loading, setLoading] = useState(false)
  const { buttonText = 'send request', setLayout, handleClose } = props
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
        setLayout(items => ({ ...items, thankYouPopup: true, contactPopup: false }))
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

        {/* Name */}
        <TextField
          placeholder='Name *'
          {...register('username', {
            required: { value: true, message: 'Required*' },
            maxLength: { value: 150, message: 'Enter valid name' },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
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


        {/* Technology */}
        <Box>
          <Select variant="standard" native fullWidth
            {...register('technology', {
              required: { value: true, message: 'Required*' },
            })}
          >
            <option value="" hidden>What are you looking for? *</option>
            <option value="Website / Mobile Apps Development">Website / Mobile Apps Development</option>
            <option value="UI / UX Design">UI / UX Design </option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Blockchain / IOT">Blockchain / IOT</option>
            <option value="Other">Other</option>
          </Select>
          <FormHelperText error>{errors.technology?.message}</FormHelperText>
        </Box>


        {/* Budget */}
        <Box>
          <Select variant="standard" native fullWidth
            {...register('budget', {
              required: { value: true, message: 'Required*' },
            })}
          >
            <option value="" hidden>Budget</option>
            <option value="Upto $5K">Upto $5K</option>
            <option value="$5k to $10K">$5k to $10K</option>
            <option value="$10K to $25K">$10K to $25K</option>
            <option value="$25K to $50K">$25K to $50K</option>
            <option value="Above $50K">Above $50K</option>
          </Select>
          <FormHelperText error>{errors.budget?.message}</FormHelperText>
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
      </Stack>


      {/* Submit */}
      <Grid item xs={12} className='center' flexDirection='column'>
        <LoadingButton loading={loading} variant='underline' sx={style.button} type='submit'>{buttonText}</LoadingButton>
        <Typography variant='subtitle2' textAlign='center' component='div' mt={5} textTransform='unset'>If you are looking for a job, <Link href='/careers' onClick={() => handleClose && handleClose()}><MuiLink component='span'>click here to apply</MuiLink></Link></Typography>
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
  description: { ml: 'auto !important' }
}