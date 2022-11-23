'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍕'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gFoodCounter
var gBoard


function onInit() {
    gGame.score = 0
    gDeadGhostCounter = 0
    gGhosts = []
    gFoodCounter = 59
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard, 3)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    setInterval (cherryCreate, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 2 && j === 6) board[i][j] = EMPTY
            if ((i === 1 && j === 1) || (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) || (i === size - 2 && j === size - 2))
                board[i][j] = SUPERFOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '👻')
    renderModal()
}

function onResetBtn() {
    const elModal = document.querySelector('.modal-container')
    elModal.style.display = 'none'
    onInit()
}

function renderModal() {
    var elModal = document.querySelector('.modal-container')
    elModal.style.display = 'block'

}


function checkVictory() {
    if (gFoodCounter === 0) {
        var msg = document.querySelector('.modal-container h2')
        msg.innerText = 'You Win'
        clearInterval(gIntervalGhosts)
        gGame.isOn = false
        renderModal()
    }
}

function superMode() {
    gPacman.isSuper = true
    for (var i = 0; i < gGhosts.length; i++) gGhosts[i].color = 5
    setTimeout(stopSuperMode, 5000)
    updateScore(1)
    gFoodCounter--
}

function stopSuperMode() {
    gPacman.isSuper = false
    createGhosts(gBoard, gDeadGhostCounter)
    gDeadGhostCounter = 0
    for (var i = 0; i < gGhosts.length; i++) gGhosts[i].color = ghostRandomColor()
}

function cherryCreate() {
    var positions = getClearPositiions()
    var rndNum = getRandomIntInclusive(0, positions.length - 1)
    var pos = positions[rndNum]
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos,CHERRY)
}

function getClearPositiions() {
    var positions = []
    for (var i = 1; i < gBoard.length - 1; i++) {

        for (var j = 1; j < gBoard.length - 1; j++) {
            if (gBoard[i][j] === EMPTY)  positions.push({i:i,j:j})
        }

    }
    return positions
}

