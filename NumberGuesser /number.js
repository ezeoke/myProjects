/*
GAME FUNCTION 
-Player must guess a number between a min and a max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('.main'),
      minNum = document.querySelector('#min'),
      maxNum = document.querySelector('#max'),
      guessBtn = document.querySelector('#submit'),
      guessInput = document.querySelector('#target'),
      message = document.querySelector('.msg');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;      

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(e){
    let guess = parseInt(guessInput.value);

    //Validate
    if( isNaN(guess) || guess < min || guess > max){
     setMessage('Please enter a number between ' + min + ' and ' + max + '.', 'red');
    }
     
    //check if won
    if(guess === winningNum){
        //game over -won
        gameOver(true, winningNum + ' is correct, YOU WIN!')
    } else {
        //wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //game over -lost
            gameOver(false, 'Game Over, you lost. The correct number was ' + winningNum)
        } else {
            //game continues - answer wrong
            setMessage(guess + ' is not correct ' + guessesLeft + ' guesses left', 'red')
        }
    }
   e.preventDefault     
})

//game over
function gameOver(won, msg){
 let color;
 won === true? color = 'green': color = 'red';

 //disable input
 guessInput.disabled = true;
 //change border color
 guessInput.style.borderColor = color;
 //set text color
 message.style.color = color;
 //set message
 setMessage(msg);

//play again?
guessBtn.value = 'Play Again';
guessBtn.className += 'play-again'
}

//set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}