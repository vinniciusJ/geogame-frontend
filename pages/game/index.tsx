/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

import ClockIcon from '@mui/icons-material/AccessTime'
import Head from 'next/head'

import { Typography , Box, Stack, useTheme} from '@mui/material'
import { CoordinatesBox, GameContainer, GameSidebar, StatusBox, TimeBox, WindRose } from './styles'
import useGame from '../../src/hooks/useGame'
import formatTime from '../../src/utils/formatTime'
import GameMap from '../../src/components/GameMap'
import Modal, { useModal } from '../../src/components/Modal'
import useUser from '../../src/hooks/useUser'


const Game: React.FC = (props) => {
    const theme = useTheme()
    const audioRef = useRef<HTMLAudioElement>(null)

    const resultModal = useModal()

    const [ username ] = useUser()
    const { currentCoordinate, gameStatus, startGame, currentRound, hitPoints, isGameFinished, time } = useGame()

    useEffect(() => {
        startGame()
    }, [])

    useEffect(() => {
        if(isGameFinished){
            console.log('oi')
            resultModal.current?.openModal()
        }
    }, [ isGameFinished ])

    useEffect(() => {
        if(currentRound - 1 >= 0){
            const status = gameStatus[currentRound - 1].status as string

            if(['right', 'wrong'].includes(status)){
                audioRef.current?.play()
            }
        }
    }, [ gameStatus, currentRound ])
    

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
                        { formatTime(time) }
                    </TimeBox>
                </Box>   
            </GameSidebar>
            <GameContainer>
                <GameMap />
            </GameContainer>

            <WindRose>
                <Image 
                    src='/wind-rose.svg'
                    alt='Rosa dos ventos'
                    width={80}
                    height={80}
                />
            </WindRose>

            { currentRound - 1>= 0  && (
                <audio 
                    hidden
                    ref={audioRef}
                    src={`/${gameStatus[currentRound - 1].status}.mp3`}
                />
            )}
        
            <Modal ref={resultModal} >
                <Stack>
                    <Typography textAlign='center'>Parabéns {username}!</Typography>
                   
                    <Typography>
                        Você acertou {hitPoints} coordenadas geográficas em <strong>2min e 22seg</strong>. Deseja jogar mais uma partida?
                    </Typography>
                </Stack>
            </Modal>
        </>
    )
}


export default Game