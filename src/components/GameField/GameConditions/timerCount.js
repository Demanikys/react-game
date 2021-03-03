export default function timerCount(timer) {
    let min = Math.floor(timer / 60)
    let sec = timer - Math.floor(timer / 60) * 60

    if (sec < 10) {
        sec = `0${sec}`
    }

    return (`${min}:${sec}`).toString()
}