const Gameboard = (() => {
  let board = [null, null, null, null, null, null, null, null, null]

  const reset = () => {
    board = [null, null, null, null, null, null, null, null, null]
  }

  const setCell = (index, marker) => {
    if (index < 0 || index > 8) return false

    if (board[index] === null) {
      board[index] = marker
      return true
    } else {
      return false
    }
  }

  const getBoard = () => {
    return [...board]
  }

  const isCellEmpty = (index) => {
    return board[index] === null
  }

  return { reset, setCell, getBoard, isCellEmpty }
})()

const Player = (name, marker) => {
  return { name, marker }
}

const Game = (() => {
  let players
  let gameOver = false
  let winner = null
  let currentPlayerIndex

  const checkTie = () => {}

  const startGame = (playerName1, playerName2) => {
    Gameboard.reset()
    players = [Player(playerName1, 'X'), Player(playerName2, 'O')]
    currentPlayerIndex = 0
    gameOver = false
    winner = null
  }

  const playRound = (index) => {
    if (gameOver) return winner
    if (winner) return winner
    const setMarker = Gameboard.setCell(index, players[currentPlayerIndex].marker)
    if (!setMarker) {
      return
    }
    if (checkTie()) return 'Tie!'
    currentPlayerIndex = 1
  }

  return { startGame, playRound }
})()

Gameboard.setCell(0, 'x')
Gameboard.reset()
console.log(Player('John', 'x'))
