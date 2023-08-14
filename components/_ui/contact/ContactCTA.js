import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material'


export default function ContactCTA(props) {
	const { setLayout } = props


	const handleOpen = () => {
		setLayout(items => ({
			...items,
			contactPopup: true
		}))
	}


	return (
		<Box sx={style.root}>
			<Container>
				<Stack className='center' py={{ xs: 5, md: 2 }}>
					<Typography variant='h4' textAlign='center'>To know how we can help bring your next project to life...</Typography>
					<Button variant='underline' sx={style.button} onClick={handleOpen}>contact us today</Button>
				</Stack>
			</Container>
		</Box>
	)
}


const style = {
	root: { bgcolor: '#8ff5ff' },
	button: {
		':before': { width: 0.6 }
	}
}