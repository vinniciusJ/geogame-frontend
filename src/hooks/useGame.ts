/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentCoordinate as currentCoordinateAtom, game as gameAtom, currentRound as currentRoundAtom } from '../context'
import generateCoordinate from '../utils/generateCoordinate'


const useGame = () => {
    const [ gameStatus, setGameStatus ] = useRecoilState(gameAtom)
    const [ currentCoordinate, setCurrentCoordinate] = useRecoilState(currentCoordinateAtom)
    const [ currentRound, setCurrentRound ] = useRecoilState(currentRoundAtom)

    const [ time, setTime ] = useState(0)

    const timerRef = useRef<NodeJS.Timer | null>()

    const startGame = useCallback(() => {
        generateNewCoordinate()

        timerRef.current = setInterval(() => {
            setTime(currentTime => currentTime + 1)
        }, 1000)
    }, [])

    const stopGame = useCallback(() => {
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

        generateNewCoordinate()
        setCurrentRound(round => round + 1)
        
    }, [ currentCoordinate, currentRound ])

    const generateNewCoordinate = useCallback(() => {
        setCurrentCoordinate(generateCoordinate())
    }, [])
    
    return {
        stopGame,
        startGame,
        gameStatus,
        realTime: time,
        currentCoordinate,
        generateNewCoordinate,
        verifyCoordinate: playRound
    }
}

export default useGame