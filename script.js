// MY PIG GAME

var scores, roundScore, activePlayer, gamePlaying;

init();

//Event khi click btn roll
document.querySelector('.btn--roll').addEventListener('click', function() {
        if (gamePlaying) {// 1. Random number
            var diceFirst = generateRandomNumber(); //gọi giá trị cho xúc xắc thứ nhất
            var diceSecond = generateRandomNumber(); //gọi giá trị cho xúc xắc thứ hai
            var dice = diceFirst + diceSecond;

            //function generate random number
            function generateRandomNumber() {
                var randomNumber = Math.floor(Math.random() * 6) + 1;
                return randomNumber;
            }

            // 2. Display the result (thay đổi src của ảnh)
            var diceDOMFirst = document.querySelector('.dice--0');
            var diceDOMSecond = document.querySelector('.dice--1');
            document.querySelector('.dice__wrapper').style.display = 'block';
            diceDOMFirst.src = 'dice-' + diceFirst + '.png';
            diceDOMSecond.src = 'dice-' + diceSecond + '.png';
            
            // 3. Update the round score IF the rolled number was NOT a 1 và 6, nếu = 6 thì mất hết điểm, bằng 1 thì mất điểm hiện tại
            if (diceFirst === 6 || diceSecond === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score--' + activePlayer).textContent = '0';

                nextPlayer();

            } else if (diceFirst === 1 || diceSecond === 1) {
                nextPlayer();

            } else {
                roundScore += dice;
                document.querySelector('#current--' + activePlayer).textContent = roundScore;
            }
        }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        var inputNumber = document.getElementById('input-number').value;
        if (inputNumber) {
            var winScore = inputNumber;
        } else {
            inputNumber = 100;
        }


        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice__wrapper').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //if else
    roundScore = 0;

    //set UI currentScore của cả 2 là 0 khi sang lượt mới
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    //đổi class khi thay player
    document.querySelector('.player--0').classList.toggle('player--active'); 
    document.querySelector('.player--1').classList.toggle('player--active');

    document.querySelector('.dice__wrapper').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init); //call init function when click btn

//làm mới trò chơi
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice__wrapper').style.display = 'none';

    document.getElementById('score--0').textContent = '0'; 
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}
















