import React, { useEffect } from 'react'
import './GameMenu.css'
import timerCount from '../GameField/GameConditions/timerCount'

export default function GameMenu(props) {
    const cls = ['game_menu_btn']

    if (props.isMenuActive) {
        cls.push('game_menu_btn_active')
    }

    return (
        <div className='game_menu'>
            <div>Time: <span className='time'>{timerCount(props.timer)}</span></div>
            <div>Score: <span className='score'>{props.score}</span></div>
            <div className='new_game_btn' onClick={props.onNewGameBtnClick}>New Game</div>
            <ul onClick={props.onMenuBtnClick} className={cls.join(' ')}>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}