/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


                
let allCards = document.querySelectorAll('.card');
let openCards = [];

function createGame() {
    
    let classes_of_cards = ["fa-diamond", "fa-paper-plane-o",
    "fa-anchor", "fa-bolt",
    "fa-cube", "fa-anchor",
    "fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb",
    "fa-leaf", "fa-bomb",
    "fa-bolt", "fa-bicycle",
    "fa-paper-plane-o", "fa-cube"];

    let cardList = shuffle(classes_of_cards);


    for (let deck_card of cardList) {
        let deck_ul = document.getElementById("deck");
        let list_to_add = document.createElement("li");
        list_to_add.classList = "card";
        let icon_to_add = document.createElement('i');
        icon_to_add.classList = "fa " + deck_card;
        list_to_add.appendChild(icon_to_add);
        deck_ul.appendChild(list_to_add);
    }
    return;
}


createGame();

for (const card of allCards) {
    card.addEventListener('click', function() {
        card.classList.add('open', 'show');
        openCards.push(card)
        if (openCards.length == 2) {
            // checking if the cards match 
            var first = openCards[0].querySelector('i').classList.value;
            var second = openCards[1].querySelector('i').classList.value;

            if (first == second) {
                for (const card of openCards) {
                    card.classList.remove("open", "show")
                    card.classList.add('match');
                    openCards = []
                }
            }
            else {
                // if cards don't match - go away 
                setTimeout(function removeCards() {
                    for (const card of openCards) {
                        card.classList.remove("open", "show")
                        openCards = []
                    }
                }, 1000);
            }
        };
    });
};





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
