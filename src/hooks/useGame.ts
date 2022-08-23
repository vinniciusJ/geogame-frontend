/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentCoordinate as currentCoordinateAtom, game as gameAtom, currentRound as currentRoundAtom, sortedCoordinates as sortedCoordinatesAtom } from '../context'
import { IGame } from '../interfaces/IGame'
import generateCoordinate from '../utils/generateCoordinate'
import generateRandomNumber from '../utils/generateRandomNumber'


const useGame = () => {
    const [gameStatus, setGameStatus] = useRecoilState(gameAtom)
    const [currentCoordinate, setCurrentCoordinate] = useRecoilState(currentCoordinateAtom)
    const [currentRound, setCurrentRound] = useRecoilState(currentRoundAtom)
    const [sortedCoordinates, setSortedCoordinates] = useRecoilState(sortedCoordinatesAtom)
    
    const [ time, setTime ] = useState(0)
   
    const isGameFinished = useMemo(() => gameStatus.every(data => data.status), [ gameStatus ])
    const hitPoints = useMemo(() => gameStatus.filter(status => status.status === 'right').length, [ gameStatus ]) 
    

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if(!isGameFinished){
            interval = setInterval(() => {
                setTime(time => time + 1)
            }, 1000)
        }
        else{
            clearInterval(interval as unknown as NodeJS.Timeout)
        }


        return () =>  clearInterval(interval as unknown as NodeJS.Timeout)
    }, [ isGameFinished ])

    const startGame = useCallback(() => {
        setGameStatus(Array.from({ length: 10 }).map((_, index) => ({ 
            round: index,
            status: null
        })))
        
        sortRandomCoordinates()
    }, [])

    const stopGame = useCallback(() => {
        setTime(0)
        setCurrentRound(0)
        
        setSortedCoordinates([])
    }, [])

    const restartGame = useCallback(() => {
        setTime(0)
        sortRandomCoordinates()

        setGameStatus(Array.from({ length: 10 }).map((_, index) => ({ 
            round: index,
            status: null
        })))

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

        if(currentRound === 9){
            console.log('oi')
            return stopGame()
        }

        sortRandomCoordinates()
        setCurrentRound(round => round + 1)

    }, [currentCoordinate, currentRound])

    const sortRandomCoordinates = useCallback(() => {
        const newCoordinates = Array.from({ length: 10 }).map(() => generateCoordinate())

        setSortedCoordinates(newCoordinates)
        setCurrentCoordinate(newCoordinates[generateRandomNumber(0, sortedCoordinates.length - 1)])
    }, [])

    return {    
        time,
        stopGame,
        startGame,
        restartGame,
        hitPoints,
        gameStatus,
        isGameFinished,
        sortedCoordinates,
        currentRound,
        currentCoordinate,
        sortRandomCoordinates,
        playRound
    }
}

export default useGame