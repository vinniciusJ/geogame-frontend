
import { useTheme } from '@mui/material'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import useGame from '../../../hooks/useGame'

interface Props{
    path: string
    coord: string
}

const Coordinate: React.FC<Props> = ({  coord, path }) => {
    const { sortedCoordinates, currentCoordinate, playRound } = useGame()
    const [ coordinate, setCoordinate ] = useState('')

    const theme = useTheme()

    useEffect(() => {
        setCoordinate(coord)
    }, [ coord ])

    if(!sortedCoordinates.includes(coordinate)){
        return null
    }

    return (
        <path
            d={path}
            id={coord}
            fill={theme.palette.geogame['orange-500']}
            fillOpacity={1}
            className="points"
            onClick={() => playRound(coordinate)}
        />
    )
}

export default memo(Coordinate)