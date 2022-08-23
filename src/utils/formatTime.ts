const formatTime = (timeInSeconds: number, extended?: boolean) => {
    const padNumber = (number: number) => {
        if(number < 10){
            return `0${number}`
        }

        return number
    }

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60

    if(extended){
        return minutes === 0 ? `${padNumber(seconds)} segundos` :  `${padNumber(minutes)} minutos ${padNumber(seconds)} segundos`
    }

    return `${padNumber(minutes)}:${padNumber(seconds)}`
}

export default formatTime