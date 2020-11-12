
/*----- constants -----*/

// master card deck 
    // how to pull images from css card library?
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
//Start w/ full shuffled deck; all p1 & p2 decks will be empty
function initialize() {
    console.log("initialize is working");
    shuffledDeck = shuffle(masterDeck);
    console.log('shuffled deck is created');
    console.log(shuffledDeck);
    p1Deck = [];
    console.log(p1Deck);
    p2Deck = [];
    console.log(p2Deck);
    p1InPlayDeck = [];
    console.log(p1InPlayDeck);
    p2InPlayDeck = [];
    console.log(p2InPlayDeck);

    console.log('p1,p2,& in play decks are empty');

    winner = null;
    console.log('winner set to null');
    victor = null;
    console.log('victor set to null');

    //set message
    message.innerHTML = "It's On! <br> Click 'DEAL' to Begin!";

    //images: show card deck in duel box
    //...to be coded

    state = 'initial';
    console.log(`state shoudl be set to initial. State = ${state}`)
    //updated card counts & other cache items...

    render();
    
    //only "deal" and "reset game" buttons active 
    //(reset should just reshuffle cards -- won't be noticeable)
    //...to be coded
}


//shuffle function used to shuffle masterDeck and create shuffledDeck
function shuffle(array) {
    //create copy of array...
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
   console.log("-----deal button clicked-------");
   
   //on click, card deck to be split between player 1 and player 2
    for (let i = 0; i < shuffledDeck.length; i++){
        if ((i+2)%2===0) {
            p1Deck.push(shuffledDeck[i]);
        }
        else {
            p2Deck.push(shuffledDeck[i]);
        }
    }


    /* *//*
//test decks created for development purposes
    //player 1 card deck
    p1Deck  = [
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },{ face: 's02', value: 2 }, 
        { face: 's05', value: 5 },{ face: 's05', value: 5 },];
    console.log(p1Deck);
    //player 2 card deck
    p2Deck = [
        { face: 's03', value: 3 },{ face: 's03', value: 3 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },
        { face: 's02', value: 2 },{ face: 's02', value: 2 },{ face: 's02', value: 2 }];
    console.log(p2Deck);
 */       
    console.log('p1 & p2 decks created');
    console.log(p1Deck);
    console.log(p2Deck);
    shuffledDeck = [];
    console.log('shuffled deck is cleared');
    console.log(shuffledDeck);
    
    //update state...
    state = 'duelReady';
    //update message...
    message.innerHTML = `Ready to Play! <br> Click "DUEL" to battle!`;
    
    //update card counts, card images, and buttons
    render();

  

}




//DUEL FUNCTION
//flips top cards from p1 & p2 decks and compares values
function duel() {
    console.log("------duel button clicked------");
    
    //victor check
    victorCheck1();
    if (victor != null){return};


    //top card from player 1 and player 2 move to inplay decks and are compared
        //remove top card from top of p1 deck and add to p1InPlay deck
    p1InPlayDeck.unshift(p1Deck[0]);
    p1Deck.shift();
    console.log("p1 card transferred to in-play")
    console.log(p1Deck);
    console.log(p1InPlayDeck);
        //remove top card from top of p1 deck and add to p2InPlay deck
    p2InPlayDeck.unshift(p2Deck[0]);
    p2Deck.shift();
    console.log("p2 card transferred to in-play")
    console.log(p2Deck);
    console.log(p2InPlayDeck);
  
        //icebox: add slight delay between p1 and p2

    //compare cards function: determines and returns winner
    cardComparison();
    
    
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
//compares p1 & p2 duel card values during a duel and a war
function cardComparison() {
    console.log("cardComparison is working");
    p1DuelCardValue = p1InPlayDeck[0].value;
    console.log(`p1 dual card value: ${p1DuelCardValue}`)
    p2DuelCardValue = p2InPlayDeck[0].value;
    console.log(`p2 dual card value: ${p2DuelCardValue}`)

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
//when collect spoils button is clicked, all battlefield cards go to winner
function collectSpoils() {
    console.log("-------collect spoils button clicked---------");
    //depending on who the winner is (p1 or p2)... all cards from 'in-play' move to bottom of winner's deck
    //reset in-play decks to zero
    
    //updateCardCount();

    if (winner === "Player 1") {
        console.log(`p1 won... p1 deck increase, play decks empty, p2 deck same`)
        console.log(`BEFORE...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
        p1Deck = [...p1Deck, ...p1InPlayDeck, ...p2InPlayDeck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        console.log(`AFTER...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
    }
    else if (winner === "Player 2") {
        console.log(`p2 won... p2 deck increase, play decks empty, p1 deck same`)
        console.log(`BEFORE...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
        p2Deck = [...p2Deck, ...p1InPlayDeck, ...p2InPlayDeck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        console.log(`AFTER...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);

    }
    
    updateCardCount();
    victorCheck1();
    if (victor != null){return};


    //update state
    state = 'duelReady';
    console.log(`state = ${state}`);

    //update message
    message.innerHTML = `Ready to Duel Again! <br> Click "DUEL" to battle!`;


    //render
    render();
}

//WAR FUNCTION
//similar to duel function, but takes top 4 cards from each deck and then runs the card comparison funciton
function war() {
    console.log("------- war btn clicked --------");
    
    //victor check for 4 cards
    victorCheck4();
    if (victor != null){return};

    //take top 4 cards from p1 deck and  transfer to top of p1 in play deck
    p1InPlayDeck.unshift(p1Deck[0], p1Deck[1], p1Deck[2], p1Deck[3]);
    p1Deck.shift();
    p1Deck.shift();
    p1Deck.shift();
    p1Deck.shift();
    console.log("4x p1 cards transferred to in-play... p1 deck & p1 in play deck")
    console.log(p1Deck);
    console.log(p1InPlayDeck);
    //top card of in play deck becomes new duel card

    //take top 4 cards from p2 deck and  transfer to top of p2 in play deck
    p2InPlayDeck.unshift(p2Deck[0], p2Deck[1], p2Deck[2], p2Deck[3]);
    p2Deck.shift();
    p2Deck.shift();
    p2Deck.shift();
    p2Deck.shift();
    console.log("4x p2 cards transferred to in-play... p2 deck & p2 in play deck")
    console.log(p2Deck);
    console.log(p2InPlayDeck);
    //top card of in play deck becomes new duel card

    updateCardCount();
//    victorCheck1();
//    if (victor != null){return};


    //run card comparison function again!
    cardComparison();

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
    //render
    render();
}


//CHECK FOR VICTOR FUNCTIONS

//checking for victor before a 1 card duel
function victorCheck1() {
    console.log("victor check 1 fnc is working");
    //if either players deck is empty, the other player wins
    if (p1Deck.length<1) {
        victor = 'Player 2';
        console.log(`victor = ${victor}`)
        message.innerHTML = `Player 1 is out of Cards... Player 2 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else if (p2Deck.length<1) {
        victor = 'Player 1';
        console.log(`victor = ${victor}`)
        message.innerHTML = `Player 2 is out of Cards... Player 1 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        render();

    } else {
        victor = null;
        console.log(`victor = ${victor}`)
        return;
    }
}

//checking for victor before a 4 card war
function victorCheck4() {
    console.log("victor check 4 fnc is working");
    //if either players deck is empty, the other player wins
    if (p1Deck.length<4) {
        victor = 'Player 2';
        console.log(`victor = ${victor}`)
        message.innerHTML = `Player 1 ran out of Cards => Player 2 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        console.log(`state = ${state}`);
        render();

    } else if (p2Deck.length<4) {
        victor = 'Player 1';
        console.log(`victor = ${victor}`)
        message.innerHTML = `Player 2 ran out of Cards => Player 1 is the VICTOR!
            <br> - Click 'RESET GAME' to Play Again -`;
        
        //update game state and render
        state = 'gameOver';
        console.log(`state = ${state}`);
        render();

    } else {
        victor = null;
        console.log(`victor = ${victor}`)
        return;
    };
        
    //add this victor check function into functions above as needed 
        // beginning of war function
        // put into compare function if winner = tie?
}



//RENDER FUNCTION
function render() {
    console.log('render is working');    
    
    //update card counts
    updateCardCount();

    //update appearance based on state...
    console.log(`what's the state?: ${state}`);

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

  
//update card count function (used in render function)
function updateCardCount() {
    console.log('updateCardCount is called');
    
    p1CardCount = p1Deck.length;
    console.log(`p1cardcount = ${p1CardCount}`);
    
    p2CardCount = p2Deck.length;
    console.log(`p2cardcount = ${p2CardCount}`);
    
    battlefieldCardCount = p1InPlayDeck.length + p2InPlayDeck.length;
    console.log(`bfcardcount = ${battlefieldCardCount}`);


    player1CardCount.innerHTML = `Cards: ${p1CardCount}`;
    player2CardCount.innerHTML = `Cards: ${p2CardCount}`;
    bfCardCount.innerHTML = `Cards: ${battlefieldCardCount}`;
}



// STATE FUNCTIONS // - used in render function
//initial state fnc
function initialState() {
    console.log('initialState fnc is called');
    
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
    console.log('duelReadyState fnc is called');

    //card images
        //add card back images to p1 and p2 decks
    //player1ImgBox.outerHTML = '<div class = "back-red card medium" id = "p1Cards"></div>';  --alternative way to write
    player1ImgBox.className = "back-red card medium"; 
    //player2ImgBox.outerHTML = '<div class = "back-blue card medium" id = "p2Cards"></div>';  --alternative way to write
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
    console.log('collectReadyState fnc is called');
    
    //card images
        //determine p1 and p2 dual card faces to display
    p1DuelCardFace = p1InPlayDeck[0].face;
    console.log(`p1 dual card face: ${p1DuelCardFace}`)
    p2DuelCardFace = p2InPlayDeck[0].face;
    console.log(`p2 dual card face: ${p2DuelCardFace}`)
        //update classes of duel boxes to display correct card faces
    //p1DuelBox.outerHTML = '<div class = `${p1DuelCardFace} card large` id = "p1duelBox"></div>'; --alternative way to write
    p1DuelBox.className = `${p1DuelCardFace} card large`;
    //p2DuelBox.outerHTML = '<div class = `${p2DuelCardFace} card large` id = "p2duelBox"></div>'; --alternative way to write
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
    console.log('warReadyState fnc is called');
    //card images
        //determine p1 and p2 dual card faces to display
    p1DuelCardFace = p1InPlayDeck[0].face;
    console.log(`p1 dual card face: ${p1DuelCardFace}`)
    p2DuelCardFace = p2InPlayDeck[0].face;
    console.log(`p2 dual card face: ${p2DuelCardFace}`)
        //update classes of duel boxes to display correct card faces
    //p1DuelBox.outerHTML = '<div class = `${p1DuelCardFace} card large` id = "p1duelBox"></div>'; --alternative way to write
    p1DuelBox.className = `${p1DuelCardFace} card large`;
    //p2DuelBox.outerHTML = '<div class = `${p2DuelCardFace} card large` id = "p2duelBox"></div>'; --alternative way to write
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
    console.log('gameOverState fnc is called');
    //reminder - make sure message is set up in war / duel function//

    //no update to card images?? or move all cards to victor's deck??
    //determine p1 and p2 dual card faces to display
    player1ImgBox.className = ``;
    player2ImgBox.className = ``;
    p1DuelBox.className = ``;
    p2DuelBox.className = ``;

    if (victor === 'Player 1') { 
        player1ImgBox.className = `card medium back-red`; 
        console.log(`p1 = victor... p1 = all cards`)
        console.log(`BEFORE...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
        p1Deck = [...p1Deck, ...p1InPlayDeck, ...p2InPlayDeck, ...p2Deck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        p2Deck = [];
        console.log(`AFTER...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
        updateCardCount();
    };
    
    if (victor === 'Player 2') { 
        player2ImgBox.className = `card medium back-blue`;
        console.log(`p2 = victor... p2 = all cards`)
        console.log(`BEFORE...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
        p2Deck = [...p2Deck, ...p1InPlayDeck, ...p2InPlayDeck, ...p1Deck];
        p1InPlayDeck = [];
        p2InPlayDeck = [];
        p1Deck = [];
        console.log(`AFTER...p1= ${p1Deck.length}; p1inplay = ${p1InPlayDeck.length}; p2inplay = ${p2InPlayDeck.length}; p2 = ${p2Deck.length}; `);
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




/* // ICEBOX ADDITIONS (IF TIME PERMITS):
    - add card sounds, shuffling, etc.
    - add winning indicators on higher cards
    - add time delays & graphics for card movements
    - add responsive design elements
*/