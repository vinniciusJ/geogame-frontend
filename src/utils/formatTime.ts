const formatTime = (timeInSeconds: number) => {
    const padNumber = (number: number) => {
        if(number < 10){
            return `0${number}`
        }

        return number
    }

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60

    return `${padNumber(minutes)}:${padNumber(seconds)}`
}

export default formatTime