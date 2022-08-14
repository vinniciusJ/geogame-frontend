/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Image from 'next/image'

import ClockIcon from '@mui/icons-material/AccessTime'
import Head from 'next/head'

import { Typography , Box, Stack, useTheme} from '@mui/material'
import { CoordinatesBox, GameSidebar, StatusBox, TimeBox } from './styles'
import useGame from '../../src/hooks/useGame'
import formatTime from '../../src/utils/formatTime'

const Game: React.FC = () => {
    const theme = useTheme()
    const { currentCoordinate, gameStatus, realTime, startGame } = useGame()

    useEffect(() => {
        startGame()
    }, [])

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
                        { currentCoordinate }
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
                        { gameStatus.map(status => (
                            <StatusBox 
                                status={status.status}
                                key={status.round}
                            />
                        )) }
                    </Stack>

                    <TimeBox>
                        <ClockIcon />
                        { formatTime(realTime) }
                    </TimeBox>
                </Box>   
            </GameSidebar>
        </>
    )
}

export default Game