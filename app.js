/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, previousDice, points, userPoints; 

function setInitialValues(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    points = 30;
    gamePlaying = true;
    // Hide the initial dice
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    //Set values to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.numb').style.display = 'none';
    //MY SOLUTION - DISPLAYING THE BUTTONS
    //document.querySelector('.btn-roll').style.display = 'block';
    //document.querySelector('.btn-hold').style.display = 'block';
}
setInitialValues();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Generate a random number
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;
  
        //2. Display the result
        let diceDOM = document.querySelector('.dice');
        let diceDOM1 = document.querySelector('.dice1');
        document.querySelector('#current-' + activePlayer).textContent = dice + dice1;
        //2.1 show the correct number on the dice (display = block)
        diceDOM.style.display = 'block';
        diceDOM1.style.display = 'block';
        //2.2 set the correct dice number
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM1.src = 'dice-' + dice1 + '.png';

       // Challenge 1
/*      if(previousDice === 6 && dice === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
        } else if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        previousDice = dice; 
    }   */
        //3. Update the round Score IF the rolled number was NOT 1
        if(dice !== 1 && dice1 !== 1){
            roundScore += (dice + dice1);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Challenge2
        userPoints = document.getElementById('newNumber').value;
        if(userPoints > 0){
            points = userPoints;
        } else {
            userPoints = 0;
        }
        if(scores[activePlayer] >= points){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.numb').style.display = 'none';
            gamePlaying = false;
            //MY SOLUTION - HIDDING THE BUTTONS
            //document.querySelector('.btn-roll').style.display = 'none';
            //document.querySelector('.btn-hold').style.display = 'none';
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', setInitialValues);

function nextPlayer(){
    document.querySelector('#current-' + activePlayer).textContent = '0';
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-newScore').addEventListener('click', function(){
    if(gamePlaying){
        document.querySelector('.numb').style.display = 'block';
        document.getElementById('newNumber').value = '';
    }
});



