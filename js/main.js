
/*----- constants -----*/

// cards (picture, name, value)

// 



/*----- app's state (variables) -----*/

//full card deck
//player 1 card deck
//player 2 card deck
//"battle field" cards
//winner -- winner of individual battles / duels
//Victor -- winner of entire game


/*----- cached element references -----*/
//player 1 dueling card
//player 2 dueling card
//# cards in each deck and on battlefield


/*----- event listeners -----*/
//buttons:
    //deal
    //flip
    //reset



/*----- functions -----*/

//initialize
    //start with full shuffled deck; players decks should be empty
        //images to show deck in duel box
    //deal button visible/available for click

//deal
    //on click, card deck to be split between player 1 and player 2
        //images to show this; main deck gone, players have decks...
    //deal button goes away
    //flip and reset/rematch button visible 


//render
    //update images shown in player boxes, duel box, and battle field
    //update card counts
    //update message


//flip function
    //top card from player 1 and player 2 move to duel box (in battlefield) and are compared
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

//war function
    //card images in duel box moved up to new battlefield div (remain in battlefield deck)
    //three addition cards from each player added to duel box (face down)
        //then run fip function again
            //flip function shoul be set up to only compare most recent p1 an p2 cards added
    
//compare cards function
    //will look at value of last two cards added to battlefield deck
        //player 1 card will be added first.. will compare by index ([].length -1] vs [].length-2])
        //set winner to player 1 or player 2 or tie

//collect spoils
    //move all cards from batte to bottom of winners deck


//check for winner
    //if either players deck is empty, the other player wins
    // if playerdeck.length = 0; other player wins
    //add this winner check function into functions above (need to check this often);




/* icebox:
    - add card sounds, shuffling, etc.
    - add winning indicators on higher cards
    - add time delays & graphics for card movements
    - add responsive design elements

*/