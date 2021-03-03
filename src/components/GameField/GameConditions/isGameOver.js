import React from 'react'

export default function isGameOver(snake, context) {
    if (snake[0][0] < 1 || snake[0][0] > 20 || snake[0][1] < 1 || snake[0][1] > 20) {
        context.setState({
            isGameOver: true
        })
        return
    }

    snake.map((item, index) => {
        if (index === 0) {
            return
        }
        if (item[0] === snake[0][0]) {
            if (item[1] === snake[0][1]) {
                context.setState({
                    isGameOver: true
                })
                return
            }
        }
    })
}