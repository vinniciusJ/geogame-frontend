import React, { useCallback } from 'react'

import { Typography, Stack, Box, Link, Grid, Button, TextField, useTheme } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import Header from '../src/components/Header'
import Image from 'next/image'
import Head from 'next/head'
import Modal, { useModal } from '../src/components/Modal'
import useUser from '../src/hooks/useUser'
import { useRouter } from 'next/router'

interface IUser{
	user: string
}

const Home = () => {
	const [ user, setUser ] = useUser()

	const theme = useTheme()

	const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
		defaultValues: {
			user: ''
		}
	})

	const router = useRouter()
	const startGameModal = useModal()

	const openStartGameModal = useCallback(() => startGameModal.current?.openModal(), [ startGameModal ])
	
	const startGame = useCallback((data: IUser) => {
		setUser(data.user)

		router.push('/game')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
							<Button onClick={openStartGameModal}>JOGAR</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={5}>
					<Stack mt={28}>
						<Image 
							src='/globe.svg'
							alt='Mapa mundi'
							width={theme.spacing(40)}
							height={theme.spacing(40)}
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

			<Modal ref={startGameModal}>
				<Typography 
					textAlign='center'
					fontSize={40}
					fontWeight={700}
					mb={3}

				>
					Qual é o seu nome?
				</Typography>

				<form onSubmit={handleSubmit(startGame)}>
					
					<Stack gap={4}>
						<Controller 
							control={control}
							name='user'
							rules={{ required: true }}
							render={({ field }) => (
								<TextField 
									{...field}
									 placeholder='Digite aqui...' 
									sx={{ w: '100%' }}
									error={!!errors.user}
									helperText={errors.user && 'Campo obrigatório'}
								/>
							)}
						/>

						<Button type='submit'>Iniciar</Button>
					</Stack>

						
				</form>
			</Modal>
		</>
	)
}

export default Home
