
/*----- constants -----*/

// master card deck 
const   masterDeck = [ 
    { face: 's02', value: 2 }, { face: 's03', value: 3 },
    { face: 's04', value: 4 }, { face: 's05', value: 5 }, 
    { face: 's06', value: 6 }, { face: 's07', value: 7 },{ face: 's08', value: 8 },
    { face: 's09', value: 9 }, { face: 's10', value: 10 }, { face: 'sJ', value: 10 },
    { face: 'sQ', value: 10 }, { face: 'sK', value: 10 }, { face: 'sA', value: 11 },
    { face: 'c02', value: 2 }, { face: 'c03', value: 3 }, { face: 'c04', value: 4 },
    { face: 'c05', value: 5 }, { face: 'c06', value: 6 }, { face: 'c07', value: 7 },
    { face: 'c08', value: 8 }, { face: 'c09', value: 9 }, { face: 'c10', value: 10 }, 
    { face: 'cJ', value: 10 }, {face: 'cQ', value: 10 }, { face: 'cK', value: 10 },
    { face: 'cA', value: 11 }, { face: 'd02', value: 2 }, { face: 'd03', value: 3 },
    { face: 'd04', value: 4 }, { face: 'd05', value: 5 }, { face: 'd06', value: 6 },
    { face: 'd07', value: 7 }, { face: 'd08', value: 8 }, { face: 'd09', value: 9 },
    { face: 'd10', value: 10 }, { face: 'dJ', value: 10 }, { face: 'dQ', value: 10 },
    { face: 'dK', value: 10 }, { face: 'dA', value: 11 }, { face: 'h02', value: 2 },
    { face: 'h03', value: 3 }, { face: 'h04', value: 4 }, { face: 'h05', value: 5 }, 
    { face: 'h06', value: 6 }, { face: 'h07', value: 7 }, { face: 'h08', value: 8 },
    { face: 'h09', value: 9 }, { face: 'h10', value: 10 }, { face: 'hJ', value: 10 },
    { face: 'hQ', value: 10 }, { face: 'hK', value: 10 }, { face: 'hA', value: 11 } ]


/*----- app's state (variables) -----*/

//shuffled card deck
let shuffledDeck;
//player 1 card deck
let p1Deck;
//player 2 card deck
let p2Deck;
//"battle field" decks
let p1InPlayDeck;
let p2InPlayDeck;

//card deck counts
let p1CardCount;
let p2CardCount;
let battlefieldCardCount;

//state to determine what images/buttons should be visible/available...
let state;

//winner -- winner of individual battles / duels
let winner;
//victor -- winner of entire game
let victor;

//player 1 dueling card & value/face
let p1DuelCard;
let p1DuelCardValue;
let p1DuelCardFace;

//player 2 dueling card & value/face
let p2DuelCard;
let p2DuelCardValue;
let p2DuelCardFace;



/*----- cached element references -----*/

//game message
const message = document.getElementById('msg');

//card img divs and card counts
const player1ImgBox = document.getElementById('p1Cards');
const player1CardCount = document.getElementById('p1cc');

const player2ImgBox = document.getElementById('p2Cards');
const player2CardCount = document.getElementById('p2cc');

//const cardDisplayBox = document.getElementById('cardDisplay');
const p1DuelBox = document.getElementById('p1duelBox');
const p2DuelBox = document.getElementById('p2duelBox');

const bfCardCount = document.getElementById('bfcc');

//buttons
const dealButton = document.getElementById('deal');
const duelButton = document.getElementById('duel');
const warButton = document.getElementById('war');
const collectSpoilsButton = document.getElementById('collectSpoils');
const resetGameButton = document.getElementById('reset');




/*----- event listeners -----*/

//listen for button clicks...
dealButton.addEventListener('click', deal);
duelButton.addEventListener('click', duel);
warButton.addEventListener('click', war);
collectSpoilsButton.addEventListener('click', collectSpoils);
resetGameButton.addEventListener('click', initialize);


/*----- functions -----*/

initialize();

//INITIALIZE FUNCTION
//Start w/ full shuffled deck; p1 & p2 decks will be empty
function initialize() {
    shuffledDeck = shuffle(masterDeck);
    p1Deck = [];
    p2Deck = [];
    p1InPlayDeck = [];
    p2InPlayDeck = [];


    winner = null;
    victor = null;

    message.innerHTML = "It's On! <br> Click 'DEAL' to Begin!";
    state = 'initial';
    render();
}


//shuffle function used to shuffle masterDeck and create shuffledDeck
function shuffle(array) {
    
    //create copy of and array (masterDeck)... then shuffle it --> shuffledDeck
    const tempArray = [...array];
    shuffledArray = [];
    
    while (tempArray.length) {
        //get a random index for an element still in the tempArray
        const rndIdx = Math.floor(Math.random() * tempArray.length);
        // Note the [0] after splice - this is because we just want the card object in that array
        shuffledArray.push(tempArray.splice(rndIdx, 1)[0]);
    }
    return shuffledArray;
}


//DEAL FUNCTION
//divides shuffled deck btwn p1 & 2 & clears shuffled deck
function deal() {
   
   //on click, shuffledDeck to be split between player 1 and player 2
    for (let i = 0; i < shuffledDeck.length; i++){
        if ((i+2)%2===0) {
            p1Deck.push(shuffledDeck[i]);
        }
        else {
            p2Deck.push(shuffledDeck[i]);
        }
    }


/**/
/*
//TEST DECKS - to be used for demo purposes (if needed)
    //player 1 card deck
    p1Deck  = [
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },{ face: 's02', value: 2 }, 
        { face: 's05', value: 5 },{ face: 's05', value: 5 },];
    
    //player 2 card deck
    p2Deck = [
        { face: 's03', value: 3 },{ face: 's03', value: 3 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },{ face: 's02', value: 2 }];
*/   
    //clearing out shuffled deck
    shuffledDeck = [];
   
    state = 'duelReady';
    message.innerHTML = `Ready to Play! <br> Click "DUEL" to battle!`;
    render();
}




//DUEL FUNCTION
//flips top cards from p1 & p2 decks & compares values
function duel() {
    
    //run victor check
    victorCheck1();
    if (victor != null){return};


    //top card from player 1 and player 2 move to inplay decks and are compared
    
    //remove top card from top of p1 deck and add to p1InPlay deck
    p1InPlayDeck.unshift(p1Deck[0]);
    p1Deck.shift();
   
    //remove top card from top of p1 deck and add to p2InPlay deck
    p2InPlayDeck.unshift(p2Deck[0]);
    p2Deck.shift();
   
    //compare cards function: determines and returns winner
    cardComparison();
    
    //based on winner, updates message, set's state, and renders...
    if (winner === 'Player 1') {
        message.innerHTML = `Player 1 Victory! <br> Click "COLLECT SPOILS"!`;
        state = 'collectReady';
        render();
    }else if(winner === 'Player 2') {
        message.innerHTML = `Player 2 Victory! <br> Click "COLLECT SPOILS"!`;
        state = 'collectReady';
        render();
    }else if (winner === 'Tie'){
        state = 'warReady';
        message.innerHTML = `Tie! This Means War! <br> Click "WAR" Button!`;
        render();
    }
}

//CARD COMPARISON
//compares p1 & p2 duel card values (called in duel and a war functions - returns winner)
function cardComparison() {
    p1DuelCardValue = p1InPlayDeck[0].value;
    p2DuelCardValue = p2InPlayDeck[0].value;

    //if value of cards is the same; winner = tie
    if (p1DuelCardValue === p2DuelCardValue) { 
        winner = 'Tie';
    
    //else if value of P1 card is greater; winner = p1
    } else if (p1DuelCardValue > p2DuelCardValue) {
        winner = 'Player 1';

    //else if winner = p2
    } else if (p1DuelCardValue < p2DuelCardValue){
        winner = 'Player 2';
        
    }
    return winner;
}


//COLLECT SPOILS FUNCTION
//when collect spoils button is clicked, all in-play (battlefield) cards go to winner's deck
function collectSpoils() {
    
    if (winner === "Player 1") {
         p1Deck = [...p1Deck, ...p1InPlayDeck, ...p2InPlayDeck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
    }
    else if (winner === "Player 2") {
        p2Deck = [...p2Deck, ...p1InPlayDeck, ...p2InPlayDeck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
    }
    
    //updated card count and check for a victor
    updateCardCount();
    victorCheck1();
    if (victor != null){return};


    //update state
    state = 'duelReady';

    //update message
    message.innerHTML = `Ready to Duel Again! <br> Click "DUEL" to battle!`;

    render();
}

//WAR FUNCTION
//similar to duel function, but takes top 4 cards from each deck
function war() {
    
    //victor check for 4 cards
    victorCheck4();
    if (victor != null){return};

    //take top 4 cards from p1 deck & transfer to top of p1 inplay deck
    p1InPlayDeck.unshift(p1Deck[0], p1Deck[1], p1Deck[2], p1Deck[3]);
    p1Deck.shift();
    p1Deck.shift();
    p1Deck.shift();
    p1Deck.shift();

    //take top 4 cards from p2 deck & transfer to top of p2 inplay deck
    p2InPlayDeck.unshift(p2Deck[0], p2Deck[1], p2Deck[2], p2Deck[3]);
    p2Deck.shift();
    p2Deck.shift();
    p2Deck.shift();
    p2Deck.shift();
 
    updateCardCount();

    //compare cards function: determines and returns winner (just like in duel function)
    cardComparison();

    //depending on winner, update state and message
    if (winner === 'Player 1') {
        message.innerHTML = `Player 1 Victory! <br> Click "COLLECT SPOILS"!`;
        state = 'collectReady';

    }else if(winner === 'Player 2') {
        message.innerHTML = `Player 2 Victory! <br> Click "COLLECT SPOILS"!`;
        state = 'collectReady';
     
    }else if (winner === 'Tie'){
        state = 'warReady';
        message.innerHTML = `Tie Again! This Means War! <br> Click "WAR" Button!`;

    }

    render();
}


//CHECK FOR VICTOR FUNCTIONS

//checking for victor before a 1 card duel
function victorCheck1() {
    //if either players deck is empty, the other player wins (set victor, update message & state)
    if (p1Deck.length<1) {
        victor = 'Player 2';
        message.innerHTML = `Player 1 is out of Cards... Player 2 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else if (p2Deck.length<1) {
        victor = 'Player 1';
        message.innerHTML = `Player 2 is out of Cards... Player 1 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else {
        victor = null;
        return;
    }
}

//checking for victor before a 4 card war
function victorCheck4() {
    //if either players deck is empty, the other player wins (set victor, update message & state)
    if (p1Deck.length<4) {
        victor = 'Player 2';
        message.innerHTML = `Player 1 ran out of Cards => Player 2 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else if (p2Deck.length<4) {
        victor = 'Player 1';
        message.innerHTML = `Player 2 ran out of Cards => Player 1 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else {
        victor = null;
        return;
    };
        
}



//RENDER FUNCTION
function render() {
    
    //update card counts
    updateCardCount();

    //update appearance based on state

    //initial state
    if (state === 'initial') {
        initialState();
    }
    //duelReady state
    else if (state === 'duelReady') {
        duelReadyState();
    }
    //collectReady state
    else if (state === 'collectReady') {
        collectReadyState();
    }
    
    //warReady state
    else if (state === 'warReady') {
        warReadyState();
    }

    //gameOver state
    else if (state === 'gameOver') {
        gameOverState();
    }
}

  
//update card count function
function updateCardCount() {
    
    p1CardCount = p1Deck.length;
    
    p2CardCount = p2Deck.length;
    
    battlefieldCardCount = p1InPlayDeck.length + p2InPlayDeck.length;

    player1CardCount.innerHTML = `Cards: ${p1CardCount}`;
    player2CardCount.innerHTML = `Cards: ${p2CardCount}`;
    bfCardCount.innerHTML = `Cards: ${battlefieldCardCount}`;
}



// STATE FUNCTIONS // - used to update appearance of game (only called in the render function)

//initial state fnc
function initialState() {
    
    //card images
    p1DuelBox.className = "back-blue card large"; //why doesn't this work???
    p1DuelBox.className = '';
    player1ImgBox.className = ''; 
    player2ImgBox.className = '';
    
    
    //buttons
    //not visible: duel, war, collect
    duelButton.style.display = 'none';
    warButton.style.display = 'none';
    collectSpoilsButton.style.display = 'none';
    //visible: deal, reset
    dealButton.style.display = 'inline';

    //card counts
    bfCardCount.style.display = 'none';
    player1CardCount.style.display = 'none';
    player2CardCount.style.display = 'none';
 
}

//duelReady state fnc
function duelReadyState() {

    //card images
    //add card back images to p1 and p2 decks
    player1ImgBox.className = "back-red card medium"; 
    player2ImgBox.className = "back-blue card medium";
    //clear out card back from initialize stated
    p1DuelBox.className = '';
    p2DuelBox.className = '';
    
    //buttons
    //not visible: deal, collect, war
    dealButton.style.display = 'none';
    warButton.style.display = 'none';
    collectSpoilsButton.style.display = 'none';
    //visible: duel, reset
    duelButton.style.display = 'inline';

    //card counts
    bfCardCount.style.display = 'none';
    player1CardCount.style.display = 'inline';
    player2CardCount.style.display = 'inline';

}
//collectReady state fnc
function collectReadyState() {
    
    //card images
    //determine p1 and p2 dual card faces to display
    p1DuelCardFace = p1InPlayDeck[0].face;
    p2DuelCardFace = p2InPlayDeck[0].face;
    //update classes of duel boxes to display correct card faces
    p1DuelBox.className = `${p1DuelCardFace} card large`;
    p2DuelBox.className = `${p2DuelCardFace} card large`;
    
    //buttons
    //not visible: deal, duel, war
    duelButton.style.display = 'none';
    dealButton.style.display = 'none';
    warButton.style.display = 'none';
    //visible: collect, reset 
    collectSpoilsButton.style.display = 'inline';

    //card counts
    bfCardCount.style.display = 'inline';
    player1CardCount.style.display = 'inline';
    player2CardCount.style.display = 'inline';
}

//warReady state fnc
function warReadyState() {
    //card images
    //determine p1 and p2 dual card faces to display
    p1DuelCardFace = p1InPlayDeck[0].face;
    p2DuelCardFace = p2InPlayDeck[0].face;
    //update classes of duel boxes to display correct card faces
    p1DuelBox.className = `${p1DuelCardFace} card large`;
    p2DuelBox.className = `${p2DuelCardFace} card large`;
        
    //buttons
    //not visible: deal, duel, collect
    duelButton.style.display = 'none';
    dealButton.style.display = 'none';
    collectSpoilsButton.style.display = 'none';
    //visible: war, reset
    warButton.style.display = 'inline';

    //card counts
    bfCardCount.style.display = 'inline';
    player1CardCount.style.display = 'inline';
    player2CardCount.style.display = 'inline';

}
//gameOver state fnc
function gameOverState() {

    //clear out all card images
    player1ImgBox.className = ``;
    player2ImgBox.className = ``;
    p1DuelBox.className = ``;
    p2DuelBox.className = ``;

    //move cards and update card images & card count depending on victor
    if (victor === 'Player 1') { 
        player1ImgBox.className = `card medium back-red`; 
        p1Deck = [...p1Deck, ...p1InPlayDeck, ...p2InPlayDeck, ...p2Deck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        p2Deck = [];
        updateCardCount();
    };
    
    if (victor === 'Player 2') { 
        player2ImgBox.className = `card medium back-blue`;
        p2Deck = [...p2Deck, ...p1InPlayDeck, ...p2InPlayDeck, ...p1Deck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        p1Deck = [];
        updateCardCount();
    };

    //buttons 
    //not visible: deal, duel, collect, war
    duelButton.style.display = 'none';
    dealButton.style.display = 'none';
    warButton.style.display = 'none';
    collectSpoilsButton.style.display = 'none';
    //visible: reset

    //card counts
    bfCardCount.style.display = 'none';
    player1CardCount.style.display = 'inline';
    player2CardCount.style.display = 'inline';
}