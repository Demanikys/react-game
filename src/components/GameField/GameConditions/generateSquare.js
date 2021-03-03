export const generateSquare = (currentSquare, snake, context) => {
    if (currentSquare.length !== 0) {
        return
    }

    let newSquare = [Math.ceil(Math.random() * 20), Math.ceil(Math.random() * 20)]

    snake.map(item => {
        if (item[0] === newSquare[0]) {
            if (item[1] === newSquare[1]) {
                newSquare = []
            }
        }
    })
    context.setState({
        newSquare: newSquare
    })
}