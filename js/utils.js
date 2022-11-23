'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`
            
            strHTML += `<td class="${className} `
            if (cell===WALL) strHTML+=`wall"></td>`
            else strHTML += `">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}






// .modal {
//     background-color: lightseagreen;
//     display:none;
//     position: absolute;
//     top:10px;
//     right: 10px;
//     padding: 5px;
//     width: 100px;
// }

/* <div class="modal">
<button onclick="onCloseModal()">x</button>
<h2>Easy (Kal)</h2>
</div>  */