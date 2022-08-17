const LONGITUDE_ORIENTATION = ['O', 'L']
const LATITUDE_ORIENTATION = ['N', 'S']

const generateCoordinate = () => {
    const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

    const [ latitudeOrientation, longitudeOrientation ] = [
        LATITUDE_ORIENTATION[generateRandomNumber(0, 1)],
        LONGITUDE_ORIENTATION[generateRandomNumber(0, 1)]
    ]

    const [ latitude, longitude ] = [
        generateRandomNumber(0, 18) * 10,
        generateRandomNumber(0, 8) * 10
    ]

    return `${latitude}°${latitude != 0 ? latitudeOrientation : ''}:${longitude}°${longitude != 0 ? longitudeOrientation : ''}`
}

export default generateCoordinate