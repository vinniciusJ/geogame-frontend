import React from 'react'
import Image from 'next/image'

import ClockIcon from '@mui/icons-material/AccessTime'
import Head from 'next/head'

import { Typography , Box, Stack, useTheme} from '@mui/material'
import { CoordinatesBox, GameSidebar, TimeBox } from './styles'

const Game: React.FC = () => {
    const theme = useTheme()
    return (
        <>
            <Head>
                <title>Geogame</title>
            </Head>
            <GameSidebar>
                <Stack justifyContent='center' alignItems='center'>
                    <Box mb={6}>
                        <Image
                            src='/logotype.svg'
                            alt='Geogame logo'
                            width={theme.spacing(28)}
                            height={theme.spacing(6)}
                        />
                    </Box>

                    <Typography>
                        Localize o ponto no mapa que corresponde as seguintes coordenadas geográficas:
                    </Typography>

                    <CoordinatesBox>
                        10°S : 120°O
                    </CoordinatesBox>
                </Stack>

                <Box>
                    <Typography 
                        textAlign='center'
                        sx={theme => ({ mb: theme.spacing(2) })}
                    >
                        PONTUAÇÃO:
                    </Typography>

                    <Stack
                        direction='row'
                        flexWrap='wrap'
                        gap={1.75}
                        mb={6}
                    >
                        {  Array.from({ length: 10 }).map((element, index) => (
                            <Box 
                                key={index}
                                sx={theme => ({
                                    width: theme.spacing(3),
                                    height: theme.spacing(3),
                                    background: theme.palette.geogame['green-500'],
                                    borderRadius: '50%'
                                })}
                            />
                        )) }
                    </Stack>

                    <TimeBox>
                        <ClockIcon />

                        02:45
                    </TimeBox>
                </Box>   
            </GameSidebar>
        </>
    )
}

export default Game