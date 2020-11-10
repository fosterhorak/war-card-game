
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

//full shuffled card deck
let shuffledDeck;
//player 1 card deck
let p1Deck;
//player 2 card deck
let p2Deck;
//"battle field" decks
let p1InPlayDeck;
let p2InPlayDeck;


//winner -- winner of individual battles / duels
let winner;
//Victor -- winner of entire game
let victor;

//player 1 dueling card (not sure if needed)
let p1DuelCard;
//player 2 dueling card (not sure if needed)
let p2DuelCard;
;


/*----- cached element references -----*/
//game message
const message = document.getElementById('msg');

//card img divs and card counts
const player1ImgBox = document.getElementsByClassName('p1Cards');
const player1CardCount = document.getElementById('p1cc');

const player2ImgBox = document.getElementsByClassName('p2Cards');
const player2CardCount = document.getElementById('p2cc');

const bfThePot = document.getElementsByClassName('thePot');
const bfDuelBox = document.getElementsByClassName('duelBox');
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

//initialize function
    //start with full shuffled deck; players decks should be empty
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
    message.innerHTML = 'Click "DEAL" to Get Started!';

    //images: show card deck in duel box
    //...to be coded

    //updated card counts...
    render();
    
    //only "deal" and "reset game" buttons active (reset should just reshuffle cards -- won't be noticeable)
    //...to be coded
}


//shuffle function to shuffle masterDeck and create shuffledDeck
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



//deal function
function deal() {
   console.log("deal button is working");
    //on click, card deck to be split between player 1 and player 2
    for (let i = 0; i < shuffledDeck.length; i++){
        if ((i+2)%2===0) {
            p1Deck.push(shuffledDeck[i]);
        }
        else {
            p2Deck.push(shuffledDeck[i]);
        }
    }
    console.log('p1 & p2 decks created');
    console.log(p1Deck);
    console.log(p2Deck);
    shuffledDeck = [];
    console.log('shuffled deck is cleared');
    console.log(shuffledDeck);

    //images to show this; main deck gone from duel box, players have decks...
    //... to be coded
    
    //deal button goes away/inactive; only duel and reset game button visible/active
    //... to be coded
    
    //update message...
    message.innerHTML = `Click "DUEL" to battle!`;
    //update card counts
    render();

  

}



//render function
function render() {
    console.log('render is working');    
    //update card counts
    let p1CardCount = p1Deck.length;
    let p2CardCount = p1Deck.length;
    let battlefieldCardCount = p1InPlayDeck.length + p2InPlayDeck.length;

    player1CardCount.innerHTML = `Cards: ${p1CardCount}`;
    player2CardCount.innerHTML = `Cards: ${p2CardCount}`;
    bfCardCount.innerHTML = `Cards: ${battlefieldCardCount}`;

    //more actions???
    //...tbd
}


//duel function 
function duel() {
    console.log("duel button is working");
    
    //winner check
    //...to be coded

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

        //show these two images in duel/in-play box
        //icebox: add slight delay between p1 and p2

    //compare cards function: determines winner
    cardComparison();

    render();
}


//compare cards function
function cardComparison() {
    console.log("cardComparison is working");
    p1DuelCard = p1InPlayDeck[0].value;
    console.log(`p1 dual card value: ${p1DuelCard}`)
    p2DuelCard = p2InPlayDeck[0].value;
    console.log(`p2 dual card value: ${p2DuelCard}`)

    //if value of cards is the same; winner = tie
    if (p1DuelCard === p2DuelCard) { 
        winner = 'Tie'
        message.innerHTML = `Tie! This Means War! <br> Click "WAR" Button!`;
        //make only WAR and RESET buttons available/clickable
        //.. to be coded
    };
    //if value of P1 card is greater; winner = p1
    if (p1DuelCard > p2DuelCard) {
        winner = 'Player 1'
        message.innerHTML = `Player 1 Victory! <br> Click "COLLECT SPOILS"!`;
        //make only COLLECT SPOILS and RESET buttons available/clickable
        //.. to be coded

    };
    //else winner = p2
    if (p1DuelCard < p2DuelCard){
        winner = "Player 2"
        message.innerHTML = `Player 2 Victory! <br> Click "COLLECT SPOILS"!`;
        //make only COLLECT SPOILS and RESET buttons available/clickable
        //.. to be coded
    };
    return winner;
}

//war function
function war() {
    console.log("war fnc is working");
    //victor check for 4 cards
    //... to be coded

    //take top 4 cards from p1 deck and  transfer to top of p1 in play deck
    //top card of in play deck becomes new duel card

    //take top 4 cards from p2 deck and  transfer to top of p2 in play deck
    //top card of in play deck becomes new duel card

    //run card comparison function again!


    //card images in duel box moved up to "thePot" div (remain in battlefield deck)
    //three addition cards from each player added to duel box (face down)
        //then run duel function again
            //duel function should be set up to only compare players duel cards
            //duel cards = most recent p1 an p2 cards added 
    
}



//collect spoils
function collectSpoils() {
    console.log("collect spoils fnc is working");
    //depending on who the winner is (p1 or p2)...
    //all cards from 'in-play' decks will move to the end of the winner's deck
    //reset player in-play decks to zero

}



//check for victor
function victorCheck1() {
    console.log("victor check 1 fnc is working");
    //if either players deck is empty, the other player wins
    // if playerdeck.length = 0; other player wins
    // update message: "Player X is out of cards... Player Y is the Victor!""
    // dissable all buttons except reset game
    
    //add this victor check function into functions above as needed 
        // beginning of deal function
        // render function??

}

function victorCheck4() {
    console.log("victor check 4 fnc is working");
    //victor check before going into war...
    //if either players deck has less than 4 cards, the other player wins
    // if playerdeck.length <4; other player wins
    // update message: "Player X is out of cards... Player Y is the Victor!""
    // dissable all buttons except reset game
    
    //add this victor check function into functions above as needed 
        // beginning of war function
        // put into compare function if winner = tie?
}

/* icebox:
    - add card sounds, shuffling, etc.
    - add winning indicators on higher cards
    - add time delays & graphics for card movements
    - add responsive design elements

*/