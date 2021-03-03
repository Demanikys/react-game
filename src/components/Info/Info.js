import React from 'react'
import './Info.css'

export default function Info() {
    return (
        <div className={'game_info'}>
            <ul className='game_control'>
                <li>Use arrow keys for mooving</li>
                <li>Spacebar for pause game</li>
                <li>Chrome browser have some restrictions using audio tags in your project. So if you want some music, swith it on in game options please =)</li>
            </ul>
            <ul className='course_info'>
                <li className='logo'><a href='https://rs.school/js/'><img src='./icons/logo.svg' /></a></li>
                <li>2021</li>
                <li className='photo'><a href='https://github.com/Demanikys'><img src='./icons/photo.jpg' /></a></li>
            </ul>
        </div>
    )
}