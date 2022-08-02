import React from 'react'

import { Typography, Stack, Box, Link } from '@mui/material'

import Image from 'next/image'
import Anchor from 'next/link'

const Home = () => {
	return (
		<>
			<Stack
				component='nav'
				direction='row'
				justifyContent='space-between'
				px={10}
				py={4}
			>
				<Stack direction='row'>
					<Image 
						src='/logo.svg'
						alt='Geogame logo'
						width={40}
						height={40}
					/>
					<Typography variant='h2'>GEOGAME</Typography>
				</Stack>

				<Stack
					gap={8}
					direction='row'
				>
					<Anchor href='/history' passHref>
						<Link
							sx={theme => ({
								textDecoration: 'none',
								fontSize: theme.spacing(3),
								color: theme.palette.geogame['black-100'] 	
							})}
						>
							Histórico
						</Link>
					</Anchor>
					<Anchor href='/about-us' passHref>
						<Link
							sx={theme => ({
								textDecoration: 'none',
								fontSize: theme.spacing(3),
								color: theme.palette.geogame['black-100'] 	
							})}
						>
							Sobre nós
						</Link>
					</Anchor>
				</Stack>
			</Stack>
			
		</>

	)
}

export default Home
