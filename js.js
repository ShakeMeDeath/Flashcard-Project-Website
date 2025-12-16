let loaded_card = {
        CARD_INDEX: 0,
        CARD_PROGRESSION: [],
        CARD_NAME: "Life question",
        CARD_SET : [],
        CARD_ELEMENT: null
}

let cardset1 = [{
                front: "what is canada ?",
                back: "contry"
        },
        {
                front: "what is keyboard ?",
                back: "computer tool"
        },
        {
                front: "what is cat ?",
                back: "animal"
        },{
                front: "what is computer ?",
                back: "machine"
        },
        {
                front: "what is mom ?",
                back: "human"
        },
        {
                front: "what is light bulb ?",
                back: "glassy thing"
        }]

let card_ui_wrapper = document.querySelector(".card-ui-wrapper");

const awnser_status = {
        UNKNOWN: 0,
        KNOWN: 1,
        NEW_SET: 2
};

// 
//

loaded_card.CARD_ELEMENT = document.querySelector(".card");

let card_container = document.querySelector(".card-container");

//  progress bar

let progress_bar = document.querySelector(".progress-bar");

function changeProgressBar(num, max) {

        let pourcentage = num * 100 / (max + 1); // "+1" is for offseting the bar, so it doesnt go out the screen
        progress_bar.style.width = `${pourcentage}%`;
};

function isCardSetSelected() {
        return loaded_card.CARD_SET !== null;
}

function isMenuBlocking() {
        if (document.querySelector(".dim") != null) {
                if (document.querySelector(".dim.disappear") != null) {
                        return false
                } else {
                        return true
                }
        }

        return document.querySelector(".dim") != null;
}

function restartCardSet() {
        changeFlashcardSet(loaded_card.CARD_SET);
}

function closeEndMenu() {

        let endMenu = document.querySelector(".dim");

        endMenu.classList.add("disappear");

        endMenu.addEventListener("animationend", function() {
                endMenu.remove();
        }, { once: true });
}

function triggerEndMenu() {
        toggleHide(loaded_card.CARD_ELEMENT, true)

        let clone = end_menu_template.content.cloneNode(true);

        clone.querySelector(".fails-num").textContent = loaded_card.CARD_PROGRESSION.filter(x => x == 0).length;
        clone.querySelector(".success-num").textContent = loaded_card.CARD_PROGRESSION.filter(x => x == 1).length;

        // ctrl btns menu
        clone.querySelector(".redo-btn").addEventListener("click", function() {
                closeEndMenu()
                restartCardSet()
        })

        clone.querySelector(".exit-btn").addEventListener("click", function() {
                closeEndMenu()
                toggleHide(card_ui_wrapper, true)
                loaded_card.CARD_SET = null;
        })

        document.body.appendChild(clone);
}

function saveProgress(awnserStatus) {
        loaded_card.CARD_PROGRESSION.push(awnserStatus);
}

function toggleHide(element, hideBool) {
        if (hideBool === true) {
                element.style.visibility = "hidden";
        } else {
                element.style.visibility = "visible";
        }
}

function gotoNextCard(awnserStatus) {
        saveProgress(awnserStatus)

        if (loaded_card.CARD_INDEX+1 >= loaded_card.CARD_SET.length) {
                triggerEndMenu()
        }

        loaded_card.CARD_INDEX++
        changeCard(loaded_card.CARD_INDEX)

        changeProgressBar(loaded_card.CARD_INDEX, loaded_card.CARD_SET.length - 1);
        doCardAnim(awnserStatus, loaded_card.CARD_NAME);
}

// Card Flipping

function flipCard(element) {
        if (isMenuBlocking() == false) element.classList.toggle("flip");
};

loaded_card.CARD_ELEMENT.addEventListener("click", function() {
        flipCard(this)
});

document.body.addEventListener('keydown', function(event) {
        if (isCardSetSelected() === true) {

                if (event.code === 'Space') {
                        if (isMenuBlocking() === false) flipCard(loaded_card.CARD_ELEMENT)
        
                } else if (event.code === 'ArrowRight') {
                        if (isMenuBlocking() === false) gotoNextCard(awnser_status.KNOWN);
        
                } else if (event.code === 'ArrowLeft') {
                        if (isMenuBlocking() === false) gotoNextCard(awnser_status.UNKNOWN);
                }
        }

});

// button detection

let unkown_btn = document.getElementById("unknown-btn");
let kown_btn = document.getElementById("known-btn");

unkown_btn.addEventListener("click", function() {
        if (isMenuBlocking() == false) gotoNextCard(awnser_status.UNKNOWN);
});
kown_btn.addEventListener("click", function() {
        if (isMenuBlocking() == false) gotoNextCard(awnser_status.KNOWN);
});

function isCardFliped() {
        return document.querySelector(".flip") != null;
}

// Card Swicthing

const card_template = document.getElementById("card-template");
const end_menu_template = document.getElementById("finnish-screen");

function doCardAnim(awnserStatus, card_name) {

        // let transition_card_wrapper = document.createElement("div");
        // transition_card_wrapper.classList.add("transition-card-wrapper")

        // let transition_card = document.createElement("div");
        // transition_card.classList.add("transition-card");

        const cardAnim_template = document.getElementById("card-animation");
        let cardAnim_clone = cardAnim_template.content.cloneNode(true);

        let transition_card = cardAnim_clone.querySelector(".transition-card");

        if (awnserStatus === awnser_status.KNOWN) {
                transition_card.classList.add("card-known");
                cardAnim_clone.querySelector(".transition-card").textContent = "Know";
        }
        
        else if (awnserStatus === awnser_status.UNKNOWN) {
                transition_card.classList.add("card-unknown");
                cardAnim_clone.querySelector(".transition-card").textContent = "Still Learning";
        }
        // should i separzate ?????
        else if (awnserStatus === awnser_status.NEW_SET) {
                transition_card.classList.add("new-card-set");
                cardAnim_clone.querySelector(".transition-card").textContent = `${card_name}`;

        }

        card_container.appendChild(cardAnim_clone);

        setTimeout(() => {
                document.querySelector(".transition-card-wrapper").remove();   // remove old card
        }, 501);
}

function changeCard(index) {

        // changeProgressBar(index, card_list.cards.length - 1);
        // doCardAnim(awnserStatus, card_list.name);


        // flip without animation
        if (isCardFliped() === true) {
                loaded_card.CARD_ELEMENT.style.transition = "none";
                flipCard(loaded_card.CARD_ELEMENT);
                loaded_card.CARD_ELEMENT.offsetHeight;
                loaded_card.CARD_ELEMENT.style.transition = "transform 0.6s ease";
        }
        
        // modify the card
        if (isMenuBlocking() === false) {
                loaded_card.CARD_ELEMENT.querySelector(".card-front").textContent = loaded_card.CARD_SET[index].front;
                loaded_card.CARD_ELEMENT.querySelector(".card-back").textContent = loaded_card.CARD_SET[index].back;
        }
}

// flashcard_set

function changeFlashcardSet(new_card_set) {
        toggleHide(loaded_card.CARD_ELEMENT, false)
        toggleHide(card_ui_wrapper, false)

        loaded_card.CARD_PROGRESSION = [];
        loaded_card.CARD_SET = new_card_set
        loaded_card.CARD_INDEX = 0

        changeCard(loaded_card.CARD_INDEX)

        changeProgressBar(loaded_card.CARD_INDEX, loaded_card.CARD_SET.length - 1);
        doCardAnim(awnser_status.NEW_SET, loaded_card.CARD_NAME);
}

changeFlashcardSet(cardset1);