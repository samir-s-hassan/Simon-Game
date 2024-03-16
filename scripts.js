// --Samir Hassan -->

let gameSequence = []; //game tile sequence
let playerSequence = []; //player tile sequence
let beginningLevel = 0;

const startButton = document.querySelector('.js-start'); //select the start button
const squaresContainer = document.querySelector('.js-container'); //selecting the squares container

//when the player loses the game, reset everything
function loseGame(text) {
    alert(text);
    gameSequence = [];
    playerSequence = [];
    beginningLevel = 0;
    squaresContainer.classList.add('unclickable');
  }

//when it's the players turn
function playerTurn() {
    squaresContainer.classList.remove('unclickable'); //I had an unclickable so player cannot click a tile until after their turn starts
  }
 
//squares are activated in the sense that we play their sound and color
function activateSquare(color) {
    const square = document.querySelector(`[data-square='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);
  
    sound.play();
    square.classList.add('activated');
    square.classList.add('hidden');
  
    setTimeout(() => {
      square.classList.remove('activated');
      square.classList.remove('hidden');
    }, 250);
}
  
//each level uses the current sequence and does a timeout while also playing the sound for each color
function playLevel(nextGameSequence) {
    nextGameSequence.forEach((color, index) => {
      setTimeout(() => {
        activateSquare(color);
      }, (index + 1) * 500);
    });
}

//each level needs a next step which is done by the random tiles
function nextStep() {
    const squares = ['green','red', 'yellow', 'blue'];
    const randomSquare = squares[Math.floor(Math.random() * squares.length)];
    return randomSquare;
  }

//next level of the game
function nextLevel() {
    beginningLevel += 1;
  
    squaresContainer.classList.add('unclickable'); //when the round starts the tiles should not be clickable

    // copy all the elements in the prior sequence to the next one
    const nextGameSequence = [...gameSequence];
    nextGameSequence.push(nextStep()); //add the new random tile to the game's sequence
    playLevel(nextGameSequence);

    gameSequence = [...nextGameSequence];
    setTimeout(() => {
      playerTurn();
    }, beginningLevel * 500); //taking .5 seconds per color.
  
  }

  function handleClick(square) {
    const index = playerSequence.push(square) - 1;
    const sound = document.querySelector(`[data-sound='${square}']`);
    const square1 = document.querySelector(`[data-square='${square}']`);

    sound.play();
    square1.classList.add('activated');
    square1.classList.add('hidden');
  
    setTimeout(() => {
      square1.classList.remove('activated');
      square1.classList.remove('hidden');
    }, 250);
    //console.log("gamesequence" + gameSequence.length)
    //console.log("playersequence" + playerSequence.length)

    if (playerSequence[index] !== gameSequence[index]) {
        const loserSound = document.querySelector(`[data-sound='lose']`);
        loserSound.play();
        setTimeout(() => {
            loseGame('OH NO!!! \nGame over, Let us try again shall we?');
          }, 1000);    //added my own time out so the sound and alert has the feeling of happening "simultaenously"
        return;
      }
    
    if (playerSequence.length === gameSequence.length) {
      playerSequence = [];
      setTimeout(() => {
        nextLevel();
      }, 2000); //after a 2 second delay, play the tones in sequence (and hiding the corresponding squares) 
      return;
    }
    }

//-----------------------------------------------GAME START
function startGame() {
    gameSequence = [];
    playerSequence = [];
    beginningLevel = 0;
    nextLevel();

}
//listen for the start button
startButton.addEventListener('click', startGame);
//listen for the player clicking tile
squaresContainer.addEventListener('click', event => {
    const { square } = event.target.dataset;
  
    if (square) handleClick(square);
  });
  