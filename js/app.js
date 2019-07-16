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

  
let openCards = [];
let counter = 0;

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

function removeGame() {
    let deck = document.getElementById('deck');
    deck.innerHTML = '';
}
function main() {
    let allCards = document.querySelectorAll('.card');
    let moves = document.getElementById("moves");

    // Adding event listeners to all the cards 
    for (const card of allCards) { 
        card.addEventListener('click', function() {
            if (openCards.length < 2 && openCards[0] !== card) {
                card.classList.add('open', 'show');
                openCards.push(card);
                if (openCards.length == 2) {
                    counter += 1;
                    moves.innerText = counter;        
                    // checking if the cards match 
                    var first = openCards[0].querySelector('i').classList.value;
                    var second = openCards[1].querySelector('i').classList.value;

                    if (first == second) {
                        for (const card of openCards) {
                            card.classList.add('match');
                            openCards = []
                        }
                        if (checkGameOver())  {
                            let finish = document.getElementById("game_over");
                            finish.classList.remove("hide");
                            console.log("game over");
                        }
                    }
                    else {
                        // if cards don't match - they go away 
                        setTimeout(function removeCards() {
                            for (const card of openCards) {
                                card.classList.remove("open", "show")
                                openCards = []
                            }
                        }, 1000);
                    }
                };
            }
        });
    };

    function checkGameOver() {
        for (let each_card of allCards) {
            if (each_card.classList.contains('match')) {
                continue;
            }
            return false;
        }
        return true;
    }
    document.querySelector('.fa-repeat').addEventListener('click', function() {
        removeGame();
        counter = 0;
        moves.innerText = counter;
        createGame();
        main();
        
    
    });
};

createGame();
main();




/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
