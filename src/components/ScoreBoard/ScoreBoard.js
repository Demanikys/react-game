import React from 'react'
import './ScoreBoard.css'

export default function ScoreBoard(props) {
    const leaders = JSON.parse(localStorage.getItem('SnakeGameLeaders'))
    return (
        <div className="score_board">
            {
                leaders
                    ? (
                        <>
                            <table cellSpacing='10px'>
                                <caption>Leaders board</caption>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Time</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaders.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {
                                                        item.map((item, index) => {
                                                            return (<td key={index}>{item}</td>)
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className='reset_score_btn' onClick={() => {
                                localStorage.removeItem('SnakeGameLeaders')
                                props.setIsMenuActive(false)
                            }}>Reset score</div>
                        </>
                    )
                    : <span>There is no leaders yet</span>
            }
        </div >
    )
}