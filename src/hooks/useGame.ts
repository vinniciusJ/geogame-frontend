/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentCoordinate as currentCoordinateAtom, game as gameAtom, currentRound as currentRoundAtom, sortedCoordinates as sortedCoordinatesAtom } from '../context'
import generateCoordinate from '../utils/generateCoordinate'


const useGame = () => {
    const [ gameStatus, setGameStatus ] = useRecoilState(gameAtom)
    const [ currentCoordinate, setCurrentCoordinate] = useRecoilState(currentCoordinateAtom)
    const [ currentRound, setCurrentRound ] = useRecoilState(currentRoundAtom)
    const [ sortedCoordinates, setSortedCoordinates ] = useRecoilState(sortedCoordinatesAtom)

    const [ time, setTime ] = useState(0)

    const timerRef = useRef<NodeJS.Timer | null>()

    

    const startGame = useCallback(() => {
        sortRandomCoordinates()

        timerRef.current = setInterval(() => {
            setTime(currentTime => currentTime + 1)
        }, 1000)
    }, [])

    const stopGame = useCallback(() => {
        setCurrentRound(1)
        setSortedCoordinates([])

        clearInterval(timerRef.current as NodeJS.Timer)
    }, [])

    const playRound = useCallback((coordinate: string) => {
        const isRight = currentCoordinate.includes(coordinate)

        setGameStatus(currentGameStatus => currentGameStatus.map((status) => {
            if(currentRound == status.round){
                if(isRight){
                    return { ...status, status: 'right' }
                }

                return { ...status, status: 'wrong' }
            }

            return { ...status }
        }))

        sortRandomCoordinates()
        setCurrentRound(round => round + 1)
        
    }, [ currentCoordinate, currentRound ])

    const sortRandomCoordinates = useCallback(() => {
        setSortedCoordinates(Array.from({ length: 10 }).map(() => generateCoordinate()))
    }, [])
    
    return {
        stopGame,
        startGame,
        gameStatus,
        realTime: time,
        sortedCoordinates,
        currentCoordinate,
        sortRandomCoordinates,
        verifyCoordinate: playRound
    }
}

export default useGame