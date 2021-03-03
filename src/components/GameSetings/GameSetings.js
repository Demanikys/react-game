import React, { useState } from 'react'
import './GameSetings.css'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import Info from '../Info/Info'

export default function GameSetings(props) {

    const [settingsPage, setSettingsPage] = useState('main')

    switch (settingsPage) {
        case 'leaders':
            return (
                <ScoreBoard setIsMenuActive={props.setIsMenuActive} />
            )
        case 'info':
            return (
                <Info />
            )
        case 'main':
            return (
                <div className='game_setings'>
                    <ul>
                        <li className='speed_seting'><span>Speed:</span>
                            {
                                ['Low', 'Medium', 'High'].map((item, index) => {
                                    const cls = []
                                    if (item === props.gameLevel) {
                                        cls.push('active')
                                    }

                                    return (
                                        <div key={index} className={cls.join(' ')} onClick={() => {
                                            props.setGameLevel(item)
                                            localStorage.setItem('SnakeGameLevel', item)
                                        }}>{item}</div>
                                    )
                                })
                            }
                        </li>
                        <li className='theme_seting'><span>Theme:</span>
                            {
                                ['Light', 'Dark'].map((item, index) => {
                                    const cls = []
                                    if (item === props.theme) {
                                        cls.push('active')
                                    }

                                    return (
                                        <div key={index} className={cls.join(' ')} onClick={() => {
                                            props.setTheme(item)
                                            localStorage.setItem('SnakeGameTheme', item)
                                        }}>{item}</div>
                                    )
                                })
                            }
                        </li>
                        <li className='music_seting'><span>Music volume:</span><ul className='music_volume_bar'>
                            {
                                [1, 2, 3, 4, 5].map((item, index) => {
                                    const cls = []

                                    if (item <= props.musicVolume * 5) {
                                        cls.push('active')
                                    }

                                    return (
                                        <li key={index} className={cls.join(' ')} style={{ height: `${20 * item}%` }} onClick={() => {
                                            props.onVolumeChangeBtnClick(0.2 * item)
                                            localStorage.setItem('SnakeGameMusicVolume', 0.2 * item)
                                        }}></li>
                                    )
                                })
                            }
                        </ul>
                            {


                                [1].map(item => {
                                    let color = 'rgba(255, 255, 255, 0.7)'

                                    if (!props.playMusic) {
                                        color = 'rgba(128, 255, 0, 0.7)'
                                    }

                                    return (
                                        <svg key={item} className='sound_off_btn' version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16" onClick={() => {
                                            props.onPlaySoundBtnClick(!props.playMusic)
                                        }}>
                                            <path fill={color} d="M4 5h-4v6h4l5 4v-14z"></path>
                                            <path fill={color} d="M15.9 5.6l-0.8-0.7-2.3 2.4-2.4-2.4-0.8 0.7 2.4 2.4-2.4 2.4 0.8 0.7 2.4-2.4 2.3 2.4 0.8-0.7-2.4-2.4z"></path>
                                        </svg>
                                    )

                                })
                            }

                        </li>
                        <li className='leader_board'><span onClick={() => setSettingsPage('leaders')}>Leader Board</span></li>
                        <li className='info'><span onClick={() => setSettingsPage('info')}>Info</span></li>
                    </ul>
                </div >
            )
        // default:
        //     break;
    }

}