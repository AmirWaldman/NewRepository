'use strict'

var GHOST = '🥚'
var gGhosts = []
var gIntervalSuperFood
var gIntervalGhosts
var gDeadGhostCounter = 0

function createGhosts(board, value) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < value; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board, id) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: ghostRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = `<img src="img/ghost${ghost.color}.jpg" width=30px/>`
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    console.log('')

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            eatGhost(ghost.location)
            nextCell = PACMAN
            
        }
        else {
            gameOver()
            return

        }
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    ghost.color = (gPacman.isSuper)? 5 : ghost.color
    return `<img src="img/ghost${ghost.color}.jpg" width=30px/>`
}

function ghostRandomColor() {
    return getRandomIntInclusive(0, 3)
}

function eatGhost(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        if ((gGhosts[i].location.i === pos.i) && (gGhosts[i].location.j === pos.j)) {
            console.log(gGhosts[i].location, pos)
            gGhosts.splice(i, 1)[0]
            gBoard[gGhosts[i].location] = EMPTY
        }
        // gBoard[pos.i][pos.j] = EMPTY
    }
    gDeadGhostCounter++
}
