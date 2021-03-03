import isGameOver from './isGameOver'
import { generateSquare } from './generateSquare'

const moveSnake = (state, context, score, setScore, isMenuActive, isMusicOn, musicVolume) => {
    checkForSnakeGrow(state, context, score, setScore, isMusicOn, musicVolume)

    if (!context.state.pause && !context.state.isGameOver && !isMenuActive) {
        switch (state.direction) {
            case 38:
                moveSnakeUp(state.snake, context)
                break
            case 37:
                moveSnakeLeft(state.snake, context)
                break
            case 40:
                moveSnakeDown(state.snake, context)
                break
            case 39:
                moveSnakeRight(state.snake, context)
                break
            default:
                break
        }
    }

    context.setState({
        canChangeDirection: true
    })
}

const moveSnakeUp = (snake, context) => {
    if (snake[0][0] > snake[1][0] && snake[0][1] === snake[1][1]) {
        return
    }

    const newSnake = []
    newSnake.push([snake[0][0] - 1, snake[0][1]])
    snake.map((item, index) => {
        if (index === snake.length - 1) {
            return
        }
        newSnake.push(item)
    })

    checkMoveForAvailable(newSnake, context)
}

const moveSnakeDown = (snake, context) => {
    if (snake[0][0] < snake[1][0] && snake[0][1] === snake[1][1]) {
        return
    }

    const newSnake = []
    newSnake.push([snake[0][0] + 1, snake[0][1]])
    snake.map((item, index) => {
        if (index === snake.length - 1) {
            return
        }
        newSnake.push(item)
    })

    checkMoveForAvailable(newSnake, context)
}

const moveSnakeLeft = (snake, context) => {
    if (snake[0][0] === snake[1][0] && snake[0][1] > snake[1][1]) {
        return
    }

    const newSnake = []
    newSnake.push([snake[0][0], snake[0][1] - 1])
    snake.map((item, index) => {
        if (index === snake.length - 1) {
            return
        }
        newSnake.push(item)
    })

    checkMoveForAvailable(newSnake, context)
}

const moveSnakeRight = (snake, context) => {
    if (snake[0][0] === snake[1][0] && snake[0][1] < snake[1][1]) {
        return
    }

    const newSnake = []
    newSnake.push([snake[0][0], snake[0][1] + 1])
    snake.map((item, index) => {
        if (index === snake.length - 1) {
            return
        }
        newSnake.push(item)
    })

    checkMoveForAvailable(newSnake, context)
}

const checkMoveForAvailable = (snake, context) => {
    isGameOver(snake, context)

    if (!context.state.isGameOver) {
        context.setState({
            snake: snake
        })
    }
}

const checkForSnakeGrow = (state, context, score, setScore, isMusicOn, musicVolume) => {
    const newSnake = context.state.snake

    if (state.snake[0][0] === state.newSquare[0] && state.snake[0][1] === state.newSquare[1]) {
        setScore(score + 1)
        if (isMusicOn) {
            const audio = new Audio('./sound/newSquare.mp3')
            audio.volume = musicVolume
            audio.play()
        }

        newSnake.push(state.snake[state.snake.length - 1])

        context.setState({
            newSquare: []
        })
    }

    generateSquare(context.state.newSquare, newSnake, context)

    context.setState({
        snake: newSnake,
    })
}

export default moveSnake