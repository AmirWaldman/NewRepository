'use strict'

var PACMAN = `<img src="img/pacman-right.gif" width = 30px/>`
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === SUPERFOOD && gPacman.isSuper) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) eatGhost(nextLocation)
        else {
            gameOver()
            return
        }
    }
    else if (nextCell === SUPERFOOD) superMode()
    else if (nextCell === FOOD) {
        updateScore(1)
        gFoodCounter--
        checkVictory()
    }
       else if (nextCell === CHERRY) updateScore(10)


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            PACMAN = `<img src="img/pacman-up.gif" width = 30px/>`
            break;
        case 'ArrowRight':
            nextLocation.j++
            PACMAN = `<img src="img/pacman-right.gif" width = 30px/>`
            break;
        case 'ArrowDown':
            nextLocation.i++
            PACMAN = `<img src="img/pacman-down.gif" width = 30px/>`
            break;
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN = `<img src="img/pacman-left.gif" width = 30px/>`
            break;
    }
    return nextLocation
}