import React, { useState, useEffect, useRef } from 'react'
import './GameBody.css'
import GameMenu from '../GameMenu/GameMenu'
import GameField from '../GameField/GameField'
import GameSetings from '../GameSetings/GameSetings'

export default function GameBody(props) {
    const [timer, setTimer] = useState(0)
    const [score, setScore] = useState(0)
    const [startNewGame, setStartNewGame] = useState(false)
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [gameLevel, setGameLevel] = useState(localStorage.getItem('SnakeGameLevel') || 'Low')
    const [playMusic, setPlayMusic] = useState(false)
    const [musicVolume, setMusicVolume] = useState(localStorage.getItem('SnakeGameMusicVolume') || 1)
    const [theme, setTheme] = useState(localStorage.getItem('SnakeGameTheme') || 'Light')


    const gameMusic = useRef(new Audio('./sound/game.mp3'))

    useEffect(() => {
        if (playMusic) {
            gameMusic.current.play()
            gameMusic.current.autoplay = true
            gameMusic.current.loop = true
        } else {
            gameMusic.current.pause()
        }
    }, [playMusic])

    useEffect(() => {
        gameMusic.current.volume = musicVolume
    }, [musicVolume])


    return (
        <div className={`game_body ${theme}`}  >
            <GameMenu score={score} timer={timer} onNewGameBtnClick={() => setStartNewGame(true)} onMenuBtnClick={() => setIsMenuActive(!isMenuActive)} isMenuActive={isMenuActive} />
            {
                isMenuActive
                    ? <GameSetings gameLevel={gameLevel} setGameLevel={setGameLevel} onPlaySoundBtnClick={setPlayMusic} playMusic={playMusic} musicVolume={musicVolume} onVolumeChangeBtnClick={setMusicVolume} theme={theme} setTheme={setTheme} setIsMenuActive={setIsMenuActive} />
                    : <GameField timer={timer} setTimer={setTimer} score={score} setScore={setScore} startNewGame={startNewGame} setStartNewGame={setStartNewGame} isMenuActive={isMenuActive} gameLevel={gameLevel} playMusic={playMusic} musicVolume={musicVolume} />
            }


        </div>
    )
}