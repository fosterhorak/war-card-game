
/*----- constants -----*/

// cards (picture, name, value)
    // how to pull from css card library?
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
    { face: 'h06', value: 6 }, { face: 'h07', value: 7 },{ face: 'h08', value: 8 },
    { face: 'h09', value: 9 }, { face: 'h10', value: 10 },{ face: 'hJ', value: 10 },
    { face: 'hQ', value: 10 }, { face: 'hK', value: 10 },{ face: 'hA', value: 11 } ]

/*----- app's state (variables) -----*/

//full shuffled card deck = set equal to shuffled deck from css library
let shuffledDeck;
//player 1 card deck = empty array
let p1Deck;
//player 2 card deck = empty array
let p2Deck;
//"battle field" cards = empty array
let bfDeck;

//winner -- winner of individual battles / duels
let winner;
//Victor -- winner of entire game
let victor;


/*----- cached element references -----*/
//player 1 dueling card 
let p1DuelCard;
//player 2 dueling card 
let p2DuelCard;
//# cards in each deck and on battlefield = length of cards in array
let p1CardCount;
let p2CardCount;
let battlefieldCardCount;


/*----- event listeners -----*/
//buttons:
    //deal
document.getElementsByClassName('deal').addEventListener('click', deal);
    //duel
document.getElementsByClassName('duel').addEventListener('click', duel);
    //collect spoils
document.getElementsByClassName('collectSpoils').addEventListener('click', collectSpoils);
    //reset game
document.getElementsByClassName('reset').addEventListener('click', initialize);


/*----- functions -----*/
initialize();

//initialize function
    //start with full shuffled deck; players decks should be empty
function initialize() {
    let shuffledDeck = shuffle(masterDeck);
    //> shuffledDeck = **Call css card library to create new shuffled deck**

    let winner = null;
    let victor = null;

    //images to show deck in duel box
    //> document.getElementsByClassName('duelBox').

    //only deal and reset game buttons active (reset will just reshuffle cards)

}


//deal
function deal() {
    for (let i = 0; i < shuffledDeck.length; i++){
        if ((i+2)%2===0) {
            p1Deck.push(shuffledDeck[1]);
        }
        else {
            p2Deck.push(shuffledDeck[1]);
        }
    }
    //on click, card deck to be split between player 1 and player 2
        //images to show this; main deck gone, players have decks...
    //deal button goes away
    //duel and reset game button visible/active 
}



//render
function render() {
    //update images shown in player boxes, duel box, and the pot
    //update card counts
    //update message
}



//duel function 
function duel() {
    //top card from player 1 and player 2 move to duel box (in battlefield deck) and are compared
    //compare cards function: determines winner

    //if winner = player 1, 
        //player 1 win message
        //collect spoils button active

    //if winner = player 2
        //player 2 win message
        //collect spoils button active

    //if winner = tie
        //it's war message
        //call war function

}

//compare cards function
function cardComparison() {
    //will look at value of last two cards added to battlefield deck
        //player 1 card will be added first.. will compare by index ([].length -1] vs [].length-2])
        //set winner to player 1 or player 2 or tie
}

//war function
function war() {
    //card images in duel box moved up to "thePot" div (remain in battlefield deck)
    //three addition cards from each player added to duel box (face down)
        //then run duel function again
            //duel function should be set up to only compare players duel cards
            //duel cards = most recent p1 an p2 cards added 
    
}



//collect spoils
function collectSpoils() {
    //move all cards from battle field to bottom of winner's deck
    //reset player duel cards to null
}



//check for victor
function victorCheck() {
    //if either players deck is empty, the other player wins
    // if playerdeck.length = 0; other player wins
    // update message: "Player X is out of cards... Player Y is the Victor!""
    // dissable all buttons except reset game
    //add this victor check function into functions above as needed (need to check this often);

}


/* icebox:
    - add card sounds, shuffling, etc.
    - add winning indicators on higher cards
    - add time delays & graphics for card movements
    - add responsive design elements

*/