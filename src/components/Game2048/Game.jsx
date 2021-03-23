import React, {Component} from "react";
import Layout from "./Components/Layout/Layout";
import Field from "./Components/Field/Field";
import {initCells, moveCells, directions} from "Logic";
import ControlPanel from "./Components/ControllPanel";
import Button from "./Components/Button";
import Score from "./Components/Score";


class Game extends Component{
  constructor(props) {
    super(props);
    this.state = this.getNewState()
  }

  mapKeyCodeToDirection = {
    KeyA: directions.LEFT,
    KeyS: directions.DOWN,
    KeyD: directions.RIGHT,
    KeyW: directions.UP,

  }

  newGame = () => {
    this.setState(this.getNewState())
  }

  getNewState () {
    return {
      cells: initCells(),
      score: 0,
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if(['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code))
    this.setState(state => ({
      ...state,
      cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.code]),
    }))
  }

  render() {
    const { cells, score } = this.state
    return(
      <Layout>
        <ControlPanel>
          <Button onClick={this.newGame} >New Game</Button>
          <Score>{score}</Score>
        </ControlPanel>
        <Field cells={cells} />
        <div style={{display: "inline-block", alignSelf: "center", width: "450px"}}>
          <p>How to play: Use you arrow to move the tiles. When two lines with the same number touch, they merge into one!</p>
          <br />
          <p>NOTE: The game is the original version of 2048</p>
        </div>
      </Layout>
    )
  }
}

export default Game;