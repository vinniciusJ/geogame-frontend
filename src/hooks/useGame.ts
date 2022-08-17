/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentCoordinate as currentCoordinateAtom, game as gameAtom, currentRound as currentRoundAtom, sortedCoordinates as sortedCoordinatesAtom } from '../context'
import generateCoordinate from '../utils/generateCoordinate'
import generateRandomNumber from '../utils/generateRandomNumber'


const useGame = () => {
    const [gameStatus, setGameStatus] = useRecoilState(gameAtom)
    const [currentCoordinate, setCurrentCoordinate] = useRecoilState(currentCoordinateAtom)
    const [currentRound, setCurrentRound] = useRecoilState(currentRoundAtom)
    const [sortedCoordinates, setSortedCoordinates] = useRecoilState(sortedCoordinatesAtom)

    const [time, setTime] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(true)

    useEffect(() => {
        let interval: NodeJS.Timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)

        if (!isTimerRunning) clearInterval(interval) 

        return () => clearInterval(interval)

    }, [isTimerRunning])


    const startGame = useCallback(() => {
        sortRandomCoordinates()
    }, [])

    const stopGame = useCallback(() => {
        setCurrentRound(1)
        setSortedCoordinates([])

        setIsTimerRunning(false)
    }, [])

    const playRound = useCallback((coordinate: string) => {
        const isRight = currentCoordinate.includes(coordinate)

        setGameStatus(currentGameStatus => currentGameStatus.map((status) => {
            if (currentRound == status.round) {
                if (isRight) {
                    return { ...status, status: 'right' }
                }

                return { ...status, status: 'wrong' }
            }

            return { ...status }
        }))

        sortRandomCoordinates()
        setCurrentRound(round => round + 1)

    }, [currentCoordinate, currentRound])

    const sortRandomCoordinates = useCallback(() => {
        const newCoordinates = Array.from({ length: 10 }).map(() => generateCoordinate())

        setSortedCoordinates(newCoordinates)
        setCurrentCoordinate(newCoordinates[generateRandomNumber(0, sortedCoordinates.length - 1)])
    }, [])

    return {
        stopGame,
        startGame,
        gameStatus,
        realTime: time,
        sortedCoordinates,
        currentCoordinate,
        sortRandomCoordinates,
        playRound
    }
}

export default useGame