/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

import ClockIcon from '@mui/icons-material/AccessTime'
import Head from 'next/head'

import { Typography , Box, Stack, useTheme, Button} from '@mui/material'
import { CongratulationsTitle, CoordinatesBox, GameContainer, GameSidebar, ModalButton, StatusBox, TimeBox, WindRose } from './styles'
import useGame from '../../src/hooks/useGame'
import formatTime from '../../src/utils/formatTime'
import GameMap from '../../src/components/GameMap'
import Modal, { useModal } from '../../src/components/Modal'
import useUser from '../../src/hooks/useUser'
import Link from 'next/link'


const Game: React.FC = (props) => {
    const theme = useTheme()
    const audioRef = useRef<HTMLAudioElement>(null)

    const resultModal = useModal()

    const [ username ] = useUser()
    const { currentCoordinate, gameStatus, startGame, currentRound, hitPoints, isGameFinished, time, restartGame } = useGame()

    useEffect(() => {
        startGame()
    }, [])

    useEffect(() => {
        if(isGameFinished){
            resultModal.current?.openModal()
        }
        else{
            resultModal.current?.closeModal()
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
                    <CongratulationsTitle >Parabéns {username}!</CongratulationsTitle>
                   
                    <Typography fontSize={20}>
                        Você acertou <strong>{hitPoints}</strong> coordenadas geográficas em <strong>{formatTime(time, true)}</strong>. Deseja jogar mais uma partida?
                    </Typography>
                </Stack>

                <Stack direction='row' gap={4} mt={4}>
                    <Link href='/'>
                        <ModalButton className='go-back'>Voltar a tela inicial</ModalButton>
                    </Link>

                    <ModalButton
                        onClick={() => restartGame()}
                    >
                        Jogar novamente
                    </ModalButton>
                </Stack>
            </Modal>
        </>
    )
}


export default Game