import React from 'react'

import { Typography, Stack, Box, Link, Grid, Button } from '@mui/material'

import Header from '../src/components/Header'
import Image from 'next/image'
import Head from 'next/head'

const Home = () => {
	return (
		<>
			<Head>
				<title>Geogame</title>
			</Head>

			<Header />
			<Grid
				container
				columns={12}
				spacing={4}
				px={10}
			>
				<Grid item xs={7}>
					<Stack gap={2} mb={4}>
						<Typography variant='h1'>
							O JOGO DAS COORDENADAS GEOGRÁFICAS
						</Typography>
						<Typography variant='caption'>
							Pratique e teste seu conhecimento em coordenadas geográficas de um jeito divertido! 
						</Typography>
					</Stack>

					<Grid container columns={7} spacing={4}>
						<Grid item xs={3}>
							<Button>Jogar</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={5}>
					<Stack mt={12}>
						<Image 
							src='/globe.svg'
							alt='Mapa mundi'
							width={208}
							height={280}
						/>
					</Stack>
				</Grid>
			</Grid>


			<Stack 
				direction='row' 
				alignItems='flex-end'
				justifyContent='center'
				position='absolute'
				bottom={0}
				pb={3}
				width='100%'
			> 
				<Box
					position='absolute'
					left={24}
				>
					<Image 
						src='/wind-rose.svg'
						alt='Rosa dos ventos'
						width={80}
						height={80}
					/>
				</Box>

				<Typography>
					Inspirado no &nbsp;
					<Link 
						href='http://www.geografia7.com/jogo-das-coordenadas-geograacuteficas.html'
						sx={theme => ({ 
							color: theme.palette.geogame['black-100'],
							textDecorationColor: theme.palette.geogame['black-100']
						})}
					> 
						Jogo das coordenadas geográficas 
					</Link>  &nbsp;
					elaborado por Eduardo de Mendeiros
				</Typography>
			</Stack>
		</>
	)
}

export default Home
