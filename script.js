'use strict';
// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// let currentScore = 0;
// let activePlayer = 0;
// let scores = [0, 0];
// let playing = true;
// //starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let currentScore, activePlayer, scores, playing;

const init = function() {

    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    //starting conditions
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');


    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    btnHold.style.cursor = 'pointer';
    btnRoll.style.cursor = 'pointer';



}
init()

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. Generating a random dice roll

        const dice = Math.trunc(Math.random() * 6) + 1
            //console.log(dice)

        //2. Display dice

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png `

        //3. Check for rolled 1:if true switch players

        if (dice !== 1) {
            //add to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;


        } else {
            //switch to next player
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] = scores[activePlayer] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        // 2. Check if player's score is >= 100

        if (scores[activePlayer] >= 100) {
            //Finish game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            playing = false;

            btnHold.style.cursor = 'not-allowed';
            btnRoll.style.cursor = 'not-allowed';
            diceEl.classList.add('hidden');
        } else {
            //Switch to next player
            switchPlayer()
        }
    }
})

btnNewGame.addEventListener('click', init)