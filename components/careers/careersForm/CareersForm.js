import { Container, Box, Stack, Typography, Grid, TextField, FormControl, InputLabel, Select, NativeSelect, MenuItem, FormGroup, FormControlLabel, Checkbox, InputBase, FormHelperText } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { addToast } from "@/utils"
import Recaptcha from 'react-google-invisible-recaptcha'
import axios from "axios"
const reCaptchaKey = process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '6LdICbQZAAAAANE8u9s-n9iccBxf5MCmBivPRTVi' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'



export default function CareersForm(props) {
  const { data } = props

  return (
    <Box className='section' id="connect-with-us" component='section' sx={style.root} data-section-name='Connect With Us'>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Stack spacing={1} className="section-padding">
              <Typography variant="h2" sx={style.heading}>Vacancies</Typography>
              <Typography component='div' className='ckeditor_content' variant='body1' sx={style.html} dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={style.form} className='center section-padding'>
              <Form {...props} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}



function Form({ setLayout }) {
  const jobPosts = ['ASP.Net, C#', 'React Native / Ionic', 'iOS / Android', 'Blockchain', 'Angular / React / Vue / Node', 'UI/UX Designer', 'Business Development', 'Digital Marketing', 'System Admin', 'QA / Testing']
  let refRecaptcha = useRef(null)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()


  const onSubmit = async (data) => {
    if (!file) return addToast('Upload Resume or CV', 'error', setLayout)
    setLoading(true)
    data.form_url = window.location.href
    data['g-recaptcha-response'] = refRecaptcha.current?.callbacks?.getResponse()
    const formData = new FormData()
    formData.append("resume", file)

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, value)
      }
    })

    if (data['g-recaptcha-response']) {
      try {
        const respone = await axios.post('/wp/v2/savecareerform', formData)
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


  const handleFile = (event) => {
    const file = event.target.files[0] || undefined
    const size = file.size / (1024 * 1024)

    if (size > 5) {
      addToast('File size exceeds the limit of 5MB. Please choose a smaller file.', 'error', setLayout)
      event.target.value = ''
      return undefined
    }

    setFile(file)
  }


  return (
    <Box component='form' width={1} onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={style.root}>
        <Stack width={1} spacing={{ xs: 3, sm: 1 }}>

          {/* Name */}
          <Stack sx={style.inputBox} direction={{ xs: 'column', sm: 'row' }} component='label'>
            <Typography variant='body1' sx={style.label}>My name is <Box color='error.light' component='span'>*</Box></Typography>
            <TextField
              fullWidth
              {...register('username', {
                required: { value: true, message: 'Required*' },
                maxLength: { value: 150, message: 'Enter valid name' },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Stack>


          {/* Email */}
          <Stack sx={style.inputBox} direction={{ xs: 'column', sm: 'row' }} component='label'>
            <Typography variant='body1' sx={style.label}>and my email id is <Box color='error.light' component='span'>*</Box></Typography>
            <Controller name='useremail' control={control}
              rules={{
                required: { value: true, message: 'Required*' },
                maxLength: { value: 250, message: 'Enter valid email' },
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' },
              }}
              render={({ fieldState: { error }, field: { value, onChange } }) =>
                <TextField type='email' fullWidth value={value || ''} onChange={event => { onChange(event); refRecaptcha.current.callbacks.execute() }} error={!!error} helperText={error?.message} />
              }
            />
          </Stack>


          {/* Phone */}
          <Stack sx={style.inputBox} direction={{ xs: 'column', sm: 'row' }} component='label'>
            <Typography variant='body1' sx={style.label}>You can also call me on <Box color='error.light' component='span'>*</Box></Typography>
            <TextField
              fullWidth
              type='tel'
              placeholder='+1 123 456 7890'
              {...register('usermobile', {
                required: { value: true, message: 'Required*' },
                minLength: { value: 10, message: 'Enter valid phone number' },
                maxLength: { value: 14, message: 'Enter valid phone number' },
                pattern: { value: /[+()0-9 ]{10,20}/i, message: 'Enter valid phone number' },
              })}
              error={!!errors.usermobile}
              helperText={errors.usermobile?.message}
            />
          </Stack>


          {/* Expirence */}
          <Stack sx={style.inputBox} direction={{ xs: 'column', sm: 'row' }} component='label'>
            <Typography variant='body1' sx={style.label}>I have an experience of <Box color='error.light' component='span'>*</Box></Typography>
            <Box width={{ xs: 1, sm: 'auto' }} mb={{ xs: 1, sm: 0 }}>
              <Select variant="standard" native sx={{ minWidth: { xs: 1, sm: 120 } }}
                {...register('experience', {
                  required: { value: true, message: 'Required*' },
                })}
              >
                <option></option>
                <option value="0-1">0-1</option>
                <option value="1-2">1-2</option>
                <option value="2-3">2-3</option>
                <option value="3-4">3-4</option>
                <option value="4-5">4-5</option>
                <option value="5-6">5-6</option>
                <option value="6-7">6-7</option>
                <option value="7-8">7-8</option>
                <option value="8-9">8-9</option>
                <option value="9-10">9-10</option>
                <option value="10+">10+</option>
              </Select>
              <FormHelperText error>{errors.experience?.message}</FormHelperText>
            </Box>
            <Typography variant='body1' sx={style.label}>&nbsp; year(s)</Typography>
          </Stack>


          {/* Job Positions */}
          <Stack direction='column' component='label' py={2}>
            <Typography variant='body1' sx={style.label}>and I want to apply for <Box color='error.light' component='span'>*</Box></Typography>
            <Box pl={2.5}>
              <FormGroup row>
                {jobPosts.map((item, index) =>
                  <FormControlLabel control={<Checkbox value={item} {...register('application[]', { required: { value: true, message: 'Required*' } })} />} label={item} key={index} />
                )}
              </FormGroup>
            </Box>
            <FormHelperText error>{errors.application?.message}</FormHelperText>
          </Stack>

          {/* Resume Upload */}
          <Stack sx={style.inputBox} direction={{ xs: 'column', sm: 'row' }} component='label' spacing={2}>
            <Typography variant='body1' sx={style.label}>Here is my CV <Box color='error.light' component='span'>*</Box></Typography>
            <InputBase type='file' name='resume' onChange={handleFile} inputProps={{ accept: '.doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain' }} required />
          </Stack>

        </Stack>


        {/* Submit */}
        <Grid item xs={12} className='center' flexDirection='column' mt={2}>
          <LoadingButton loading={loading} variant='underline' sx={style.button} type='submit'>send request</LoadingButton>
        </Grid>


        {/* Recaptcha */}
        <Recaptcha
          ref={refRecaptcha}
          sitekey={reCaptchaKey}
        />
      </Grid>
    </Box>
  )
}



const style = {
  root: { p: '0 !important', overflow: 'hidden' },
  heading: { fontFamily: 'var(--font-special-family)', color: 'text.dark', fontWeight: 400, textTransform: 'unset' },
  html: {
    'ul li ul': { listStyle: 'disc', fontSize: '85%' }
  },
  button: { px: 6 },
  form: {
    height: 1, position: 'relative', zIndex: 1, pl: { xs: 0, md: 10 },
    ':before': { content: `''`, position: 'absolute', left: { xs: -50, md: 0 }, top: 0, bgcolor: 'secondary.dark', height: 1, width: '200vw', zIndex: -1 }
  },
  input: { width: { xs: 1, sm: 'auto' } },
  inputBox: { alignItems: { xs: 'start', sm: 'center' } },
  label: { letterSpacing: 0, fontFamily: 'var(--font-special-family)' }
}