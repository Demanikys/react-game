import React from 'react'
import './GameField.css'
import moveSnake from './GameConditions/snakeMoves'
import GameOver from '../GameOver/GameOver'
import GamePause from '../GamePause/GamePause'

export default class GameField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snake: [[10, 5], [10, 4], [10, 3], [10, 2], [10, 1]],
            direction: 39,
            canChangeDirection: true,
            newSquare: [],
            pause: false,
            level: this.props.gameLevel,
            isGameOver: false,
        }
        this.moveInterval = null
        this.timeInterval = null
    }

    restartGame = () => {
        this.setState({
            snake: [[10, 5], [10, 4], [10, 3], [10, 2], [10, 1]],
            direction: 39,
            canChangeDirection: true,
            newSquare: [],
            pause: false,
            level: this.props.gameLevel,
            isGameOver: false,
        })

        this.props.setTimer(0)
        this.props.setScore(0)
        this.props.setStartNewGame(false)
    }

    setGameLevel = (level) => {
        switch (level) {
            case 'Low':
                return 400
            case 'Medium':
                return 250
            case 'High':
                return 100
        }
    }

    saveGame = () => {
        let save = [{ ...this.state }, this.props.score, this.props.timer]

        return JSON.stringify(save)
    }

    componentDidMount() {
        //Load saved game
        if (localStorage.getItem('snakeGameSave')) {
            const save = JSON.parse(localStorage.getItem('snakeGameSave'))

            this.setState({
                ...save[0]
            })
            this.props.setScore(save[1])
            this.props.setTimer(save[2])
        }

        document.addEventListener('keydown', (event) => {
            if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
                if (this.state.direction === 39 && event.keyCode === 37) {
                    return
                }
                if (this.state.direction === 37 && event.keyCode === 39) {
                    return
                }
                if (this.state.direction === 38 && event.keyCode === 40) {
                    return
                }
                if (this.state.direction === 40 && event.keyCode === 38) {
                    return
                }
                if (this.state.canChangeDirection) {
                    this.setState({
                        direction: event.keyCode,
                        canChangeDirection: false
                    })
                }
            }
            if (event.keyCode === 32 && !this.state.isGameOver && !this.props.isMenuActive) {
                this.setState({
                    pause: !this.state.pause
                })
            }
        })

        this.moveInterval = setInterval(() => {
            if (!this.state.isGameOver && !this.state.pause && !this.props.isMenuActive) {
                moveSnake(this.state, this, this.props.score, this.props.setScore, this.props.isMenuActive, this.props.playMusic, this.props.musicVolume)
            }
            if (!this.state.isGameOver) {
                localStorage.setItem('snakeGameSave', this.saveGame())
            }
        }, this.setGameLevel(this.state.level));

        this.timeInterval = setInterval(() => {
            if (!this.state.isGameOver && !this.state.pause && !this.props.isMenuActive) {
                this.props.setTimer(this.props.timer + 1)
            }
        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.moveInterval)
        clearInterval(this.timeInterval)

        document.removeEventListener('keydown', (event) => {
            if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
                if (this.state.direction === 39 && event.keyCode === 37) {
                    return
                }
                if (this.state.direction === 37 && event.keyCode === 39) {
                    return
                }
                if (this.state.direction === 38 && event.keyCode === 40) {
                    return
                }
                if (this.state.direction === 40 && event.keyCode === 38) {
                    return
                }
                if (this.state.canChangeDirection) {
                    this.setState({
                        direction: event.keyCode,
                        canChangeDirection: false
                    })
                }
            }
            if (event.keyCode === 32 && !this.state.isGameOver && !this.props.isMenuActive) {
                this.setState({
                    pause: !this.state.pause
                })
            }
        })

    }

    componentDidUpdate() {
        if (this.props.startNewGame) {
            this.restartGame()
        }
    }

    render() {

        return (
            <div className='game_field'>
                {
                    this.state.snake.map((item, index) => {
                        const cls = ['snake_body']

                        if (index === 0) {
                            cls.push('snake_head')
                        }

                        return (
                            <div key={index} className={cls.join(' ')} style={{ gridRow: `${item[0]} / ${item[0] + 1}`, gridColumn: `${item[1]} / ${item[1] + 1}` }} />
                        )
                    })
                }
                {
                    this.state.newSquare
                        ? (<div className='new_snake_square' style={{ gridRow: `${this.state.newSquare[0]} / ${this.state.newSquare[0] + 1}`, gridColumn: `${this.state.newSquare[1]} / ${this.state.newSquare[1] + 1}` }} />)
                        : null
                }
                {
                    this.state.isGameOver
                        ? <GameOver onRestartBtnClick={this.restartGame} score={this.props.score} timer={this.props.timer} gameLevel={this.props.gameLevel} />
                        : null
                }
                {
                    this.state.pause && !this.props.isMenuActive
                        ? <GamePause />
                        : null
                }

            </div>
        )
    }
}