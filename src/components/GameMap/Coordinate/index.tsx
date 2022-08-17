import React, { memo, useEffect, useState } from 'react'
import useGame from '../../../hooks/useGame'

interface Props{
    path: string
    coord: string
}

const Coordinate: React.FC<Props> = ({  coord, path }) => {
    const { sortedCoordinates } = useGame()

    const [ coordinate, setCoordinate ] = useState('')

    useEffect(() => {
        setCoordinate(coord)
    }, [ coord ])

    // console.log(sortedCoordinates.includes(coord))
    if(!sortedCoordinates.includes(coordinate)){
        return null
    }

    return (
        <path
            id={coord}
            d={path}
            fill="#ef3535"
            className="points"
            style={{
                fill: '#ff7544',
                fillOpacity: 1
            }}
        />
    )
}

export default memo(Coordinate)