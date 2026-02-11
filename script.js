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
  let tie = null
  let currentPlayerIndex

  const checkTie = () => {
    if (!Gameboard.getBoard().includes(null) && !winner) {
      tie = 'Tie!'
      return true
    } else {
      return false
    }
  }

  const checkWinner = () => {
    const winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of winnerCombinations) {
      const board = Gameboard.getBoard()
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        winner = `Победил ${players[currentPlayerIndex].name}`
        return true
      } else {
        return false
      }
    }
  }

  const startGame = (playerName1, playerName2) => {
    Gameboard.reset()
    players = [Player(playerName1, 'X'), Player(playerName2, 'O')]
    currentPlayerIndex = 0
    gameOver = false
    winner = null
    tie = null
  }

  const playRound = (index) => {
    if (gameOver) return winner
    const setMarker = Gameboard.setCell(index, players[currentPlayerIndex].marker)
    if (!setMarker) {
      return
    }
    if (checkWinner()) {
      gameOver = true
      return winner
    }
    if (checkTie()) {
      gameOver = true
      return tie
    }
    currentPlayerIndex = 1 - currentPlayerIndex
  }

  return { startGame, playRound }
})()

// console.log(Game.startGame('A', 'B'))
// console.log(Game.playRound(0))
// console.log(Game.playRound(5))
// console.log(Game.playRound(1))
// console.log(Game.playRound(7))
// console.log(Game.playRound(3))
// console.log(Game.playRound(8))
// console.log(Game.playRound(4))
// console.log(Game.playRound(2))
// console.log(Game.playRound(6))
