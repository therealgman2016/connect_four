
 ## Analyze the app's functionality

 As a user, I want a feature because of reason

 MVP (minable viable player)

 As a user:
 - I want to be able to  have two players beacuse that is how connect 4 is played
 - I want to be able to take turns
 - I want to alternate droping colored disks into one of 7 colums
 - I want ot be able to win if i get 4 in a row
 - I want ot know who won or lost and if it was a tie
 - I want to be able to play the game agian if its over

If i have time add these things:
- succsess animations
- dropping animation
- difficulty setting
- Choose color of disk
- keep track of total wins/loses

## overall design of app
- clean
- purple and orange disks
- Poppins font

``` html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
```
``` css
font-family: 'Poppins', sans-serif;
```

## Wireframe the UI

- High fidelity
    - working demo
    - images
    - buttons clickable
    - hover effects happen
    - little more than just a drawing

- Low fidelity
    - just a drawing
    - layout of page
    - where is header?
    - where are messages to user?
    - where are all buttons?
    - is this too crowded?
    - Is this too empty?

## Pseudocode
- Define required constants
    - color constant

- Define required varables used to track state of the game
    - game board - 1 big array that hold 7 smaller variables
    - turn - 1 || -1
    - null - null || 1 || -1 || 'T'

- Cahce DOM elements
    - Message place
    - Play again button
    - Column buttons/markers

- Upon loading should:
    - Init state variables
        - create the 7 nested arrays
        - turn var should be set to '1'
        - winner should be null
    - Render changes to DOM
        - render board, should be blank
        - render the messge purple's turn
        - Do not render play again button
    - Wait for interaction

- Handle a player clicking a coloum button
    - iupdate board array with player move
    - update the turn var
    - check for winner
    - re-render the board with the players move

- Handle playering clikcing replay buttuon
    - reset state vars
    - re-render the board

- Check for winner
    - check for 4 in a row
    - we will use offsets to count the colors of the disks in the arrays

## Identify the application's state (app-wide data)

- gameboard - array of 7 nested arrays
```js
let board
```
- turn var
```js
let turn
```
- winner var
```js
let winner
```
