/*----- constants -----*/

const COLORS = {
    0: 'white',
    1: 'purple',
    '-1': 'orange'
}


/*----- state variables -----*/

let board // array of 7 nested arrays
let turn // 1 || -1
let winner // null || 1 || -1 || 'T'


/*----- cached elements  -----*/

// getting our message place
const messageEl = document.querySelector('h2')
const playBtn = document.querySelector('button')
// NodeList !== Arrays
// NodeList.forEach() !== Array.forEach()
// it is easier to work with array than node list
// ... spread operator takes a COPY, makes it an array (not original)
const markerEls = [...document.querySelectorAll('#markers > div')]
//console.log(typeof markerEls)

/*----- event listeners -----*/

//grabbing all the marker section with all the divs
document.getElementById('markers').addEventListener('click', handleDrop)

/*----- functions -----*/

init()

// function starts our game
function init() {
    // assign our vars to starting values
    board = [
        [0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0] // col 6
    ]
    turn = 1
    winner = null
    render()
}

// hoisting - first look at and set to memory js funciton declaration
function render() {
    renderBoard()
    renderMessage()
    renderControls()
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
       // console.log(colArr, colIdx)
        colArr.forEach(function(cellVal, rowIdx) {
           // console.log(cellVal, rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
}

function renderMessage() {
    // messaging if there is a tie
    if (winner === 'T') {
        messageEl.innerText = 'Tie!!!!'
    } else if(winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${COLORS[winner].toUpperCase()} WINS!
            </span>
        `
    }else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${COLORS[turn].toUpperCase()}'s turn
            </span>
        `
    }
}

function renderControls() {
    // hide it on first load and show when game over
    playBtn.style.visibility = winner ? 'visible' : 'hidden'

    // if there is a winner we shouldnt be able to place a marker
    markerEls.forEach(function(markerEl, colIdx) {
        // if there is  a tie or if the colloum is full

        const hideMarker = !board[colIdx].includes(0) || winner

        markerEl.style.visibility = hideMarker ? 'hide' : 'visiable'
    })
}

// event is from event listener (line 32)
function handleDrop(event) {
    // whatever marker is clicked, we should get back number
    const colIdx = markerEls.indexOf(event.target)
    
    // .indexOf - returns negative 1 if we didn't find anything
    if (colIdx === -1) return

    const colArr = board[colIdx]
    const rowIdx = colArr.indexOf(0)

    colArr[rowIdx] = turn
    turn *= -1

    winner = getWinner(colIdx, rowIdx)

    render()
}

// needs to return either 1 || -1 || 'T'
// just return a true or false
function getWinner(colIdx, rowIdx) {
    return (
        checkDiagWinNESW(colIdx, rowIdx) || 
        checkDiagWinNWSE(colIdx, rowIdx) ||
        checkHorWin(colIdx, rowIdx) ||
        checkVertWin(colIdx, rowIdx)
    )
}

// helper function
// count how many same colored disks are in a line

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    // grab the player
    const player = board[colIdx[rowIdx]]

    // start count
    let count = 0

    colIdx += colOffset
    rowIdx += rowOffset

    // loop until a condition is met
    while (
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++

        colIdx += colOffset
        rowIdx += rowOffset
    }
    // return final count
    return count

}

function checkVertWin(colIdx, rowIdx) {
    // north to south
    // 0 - not for changing coloum
    // -1 - moving south
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null
}

function checkHorWin(colIdx, rowIdx) {
    // left
    // -1 - are changing coloums
    // 0 not changing rows
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)

    // right
    // 1 - are changing coloums
    // 0 - not changing rows
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0)

    return adjCountLeft + adjCountRight >= 3 ? board[colIdx][rowIdx] : null
}

function checkDiagWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

    return adjCountNW + adjCountSE >= 3 ? board[colIdx][rowIdx] : null
}

function checkDiagWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1)
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1)

    return adjCountNE + adjCountSW >= 3 ? board[colIdx][rowIdx] : null
}
