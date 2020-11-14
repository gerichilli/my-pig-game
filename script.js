'use strict';

//set variable score 0,1, dice (DOM), current, btn by selecting element
const score0DOM = document.getElementById('score--0');
const score1DOM = document.getElementById('score--1');

const diceDOM = document.querySelector('.dice');

const current0DOM = document.getElementById('current--0');
const current1DOM = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//set score of two player in an array
let scores, currentScore, activePlayer, playingGame;

const init = function() {
    //set score to 0 at begining (textContent)
    score0DOM.textContent = 0;
    score1DOM.textContent = 0;

    //hide dice at begining (add class 'hidden')
    diceDOM.classList.add('hidden');
    current0DOM.textContent = 0;
    current1DOM.textContent = 0;
    document.querySelector('.player--0').classList.add('player--active');

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playingGame = true;
}

init();

const switchPlayer = function() {
    //Set current score to 0 and switch player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    //Toggle active class
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if (playingGame) {
        //Generating a random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        diceDOM.classList.remove('hidden');
        diceDOM.src = `dice-${dice}.png`;

        //Check if rolled 1 or not
        if (dice != 1) {
            //Add dice to current scores
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playingGame) {
        //Add current score to active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Check if score >=100
        if (scores[activePlayer] >= 20) {
            //Change winner class 
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //Change name of player to winner
            document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
            //Stop game
            playingGame = false;
            //Hide the dice 
            diceDOM.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);