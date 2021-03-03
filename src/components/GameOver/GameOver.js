import React, { useEffect } from 'react'
import './GameOver.css'
import timerCount from '../GameField/GameConditions/timerCount'

export default function GameOver(props) {
    const gameScore = [props.gameLevel, timerCount(props.timer), props.score]

    localStorage.removeItem('snakeGameSave')
    let gameLeaders = JSON.parse(localStorage.getItem('SnakeGameLeaders')) || []

    useEffect(() => {
        gameLeaders.push(gameScore)
        if (gameLeaders.length > 10) {
            gameLeaders.sort((a, b) => b[2] - a[2])
            gameLeaders = gameLeaders.slice(0, 9)
        } else {
            gameLeaders.sort((a, b) => b[2] - a[2])
        }
        localStorage.setItem('SnakeGameLeaders', JSON.stringify(gameLeaders))
    }, [])

    return (
        <div className='game_over_screen'>
            <div>
                <div>GAME OVER</div>
                <div className='restart_button' onClick={props.onRestartBtnClick}>Restart</div>
            </div>
        </div>
    )
} 