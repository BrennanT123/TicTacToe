const game = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  winningCombos: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
};

//Define player
function Player(name, marker) {
  let wins = 0;
  const getWin = () => wins;
  const giveWin = () => wins++;

  return { name, marker, getWin, giveWin };
}

//Play turn

// function playTurn(playersTurn) {

//     squarePlayed = prompt("Player " + playersTurn.marker + " turn.");
//     game.board[squarePlayed] = playersTurn.marker;
//     checkWin(playersTurn);
// }

//check for win
function checkWin(lastPlayer) {
  boardState = getIndexes(game.board, lastPlayer.marker);

  //wincheck = for each winning combo see if each element exists on the current board state.
  const winCheck = game.winningCombos.some((combo) =>
    combo.every((index) => boardState.includes(index))
  );
  console.log(winCheck);

  if (winCheck === true) {
    console.log("Player " + lastPlayer.name + " wins!");
    lastPlayer.giveWin();
    resetButton.classList.remove('hidden');
    tiles.forEach((tile) => {
        tile.removeEventListener("click", playTile);
      });

    setScoreboard();
    return;
  } 
  const isTie = game.board.every((cell) => cell !== 0);
  if (isTie ===true)
  {
    console.log("It's a tie!")
    resetButton.classList.remove('hidden');
    tiles.forEach((tile) => {
        tile.removeEventListener("click", playTile);
      });
      ties++;
      setScoreboard();

  }

  //gets indexes of the current players markers on the board
  function getIndexes(board, marker) {
    let indexes = [],
      i;
    for (i = 0; i < board.length; i++) {
      if (board[i] === marker) indexes.push(i);
    }
    console.log(indexes);
    return indexes;
  }
}

// setting up scoreboard
function setScoreboard()
{

p1Score.textContent = p1.name+": "+p1.getWin();
p2Score.textContent = p2.name+": "+p2.getWin();
tiesScore.textContent = "Ties: " + ties;

}

function playAgain(e)
{
    tiles.forEach((tile) => {
        tile.addEventListener("click", playTile);
      });
      tiles.forEach((tile) => tile.textContent = "");
      currentPlayer = "X";
      resetButton.classList.add('hidden');
      game.board = [0, 0, 0, 0, 0, 0, 0, 0];
}


// setup
let p1Name = prompt("Player 1 Name");
const p1 = Player(p1Name, "X");
let p2Name = prompt("Player 2 Name");
const p2 = Player(p2Name, "O");

const p1Score = document.querySelector(".p1Score");
const p2Score = document.querySelector(".p2Score");
const tiesScore = document.querySelector(".ties");

let ties = 0;

setScoreboard();

//Getting the button class 
let resetButton = document.querySelector('button');
resetButton.addEventListener("click",playAgain);


let currentPlayer = "X";


const tiles = document.querySelectorAll(".cell");


tiles.forEach((tile) => {
  tile.addEventListener("click", playTile);
});

//What happens when you click on a tile?

function playTile(e) {
  console.log("Cell clicked: ${e.target.textContent}");
  if (this.textContent !== "") {
    console.log("Cell already played!");
    return;
  }
  this.textContent = currentPlayer;

  //Updates the boards array.
  game.board[Array.from(tiles).indexOf(this)] = currentPlayer;
  if (currentPlayer === "X") {
    checkWin(p1);
  }
  else{
    checkWin(p2);
  }

  //changes the current player from X to O
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWin;
}
