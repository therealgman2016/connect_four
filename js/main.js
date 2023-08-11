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
// It easier for us to work with an array than it is with a NodeList
// ... - spread operator, Take a COPY of whatever (object, NodeList, HTMLCollections, array) pushes all contents of that into our array
const markerEls = [...document.querySelectorAll('#markers > div')]

/*----- event listeners -----*/

// grabbing the marker section with all those divs
document.getElementById('markers').addEventListener('click', handleDrop)
playBtn.addEventListener('click', init)

/*----- functions -----*/
init()

// function start our game 
function init() {
    // assign our vars to the starting values
    board = [
			[0, 0, 0, 0, 0, 0], // col 0
			[0, 0, 0, 0, 0, 0], // col 1
			[0, 0, 0, 0, 0, 0], // col 2
			[0, 0, 0, 0, 0, 0], // col 3
			[0, 0, 0, 0, 0, 0], // col 4
			[0, 0, 0, 0, 0, 0], // col 5
			[0, 0, 0, 0, 0, 0], // col 6
		]
    turn = 1
    winner = null
    render()
}

// hoisting - first look at and set to memory js function declarations
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
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${COLORS[winner].toUpperCase()} Wins!
            </span>
        `
    } else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${COLORS[turn].toUpperCase()}'s Turn
            </span>
        `
    }
}

function renderControls() {
    // hide it on first load show once there is a game over
    playBtn.style.visibility = winner ? 'visible' : 'hidden'

    // if there is a winner we should not be able to place a disc
    markerEls.forEach(function(markerEl, colIdx) {
        // if there is a tie or if the column is full
        const hideMarker = !board[colIdx].includes(0) || winner

        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
    })
}

// anytime we hand a function to an event lister we will be handed back an event
// event - the event that happened
function handleDrop(event) {
    // whatever marker we click we should get back a number
    const colIdx = markerEls.indexOf(event.target)
    // .indexOf - returns a -1 if we didn't find anything
    if (colIdx === -1) return

    const colArr = board[colIdx]
    const rowIdx = colArr.indexOf(0)
    colArr[rowIdx] = turn
    turn *= -1
    winner = getWinner(colIdx, rowIdx)
    render()
}

// 1 || -1 || 'T'
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
// count how many same colored disc are in a line
function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    // I want to grab the player
    const player = board[colIdx][rowIdx]

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

    return count
}

function checkVertWin(colIdx, rowIdx) {
    // going from north to south
    // 0 - not changing our column
    // -1 - moving south
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null
}

function checkHorWin(colIdx, rowIdx) {
    // going left 
    // -1 - we are changing columns
    // 0 - we are not changing rows
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)

    // going to the right
    // 1 - we are changing columns
    // 0 - we are not changing rows
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