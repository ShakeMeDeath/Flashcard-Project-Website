let card_set = {
        name: "Life question",
        cards: [{
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
};
let card_index = 0
let card_progression_list = [];

const AWNSER_STATUS = {
        UNKNOWN: 0,
        KNOWN: 1,
        NEW_SET: 2
};

// 
// 

let card = document.querySelector(".card");
let card_container = document.querySelector(".card-container");

//  progress bar

let progress_bar = document.querySelector(".progress-bar");

function changeProgressBar(num, max) {

        let pourcentage = num * 100 / (max + 1); // "+1" is for offseting the bar, so it doesnt go out the screen
        progress_bar.style.width = `${pourcentage}%`;
};

function isMenuBlocking() {
        return document.querySelector(".dim") != null;
}

function triggerEndMenu() {
        let clone = end_menu_template.content.cloneNode(true);

        clone.querySelector(".fails-num").textContent = card_progression_list.filter(x => x == 0).length;
        clone.querySelector(".success-num").textContent = card_progression_list.filter(x => x == 1).length; 

        document.body.appendChild(clone);
}

function saveProgress(save_list, awnserStatus) {
        save_list.push(awnserStatus);
}

function gotoNextCard(awnserStatus) {
        saveProgress(card_progression_list, awnserStatus)

        if (card_index+1 >= card_set.cards.length) {
                triggerEndMenu()
        }

        card_index++
        changeCard(card_set, card_index, awnserStatus)
}

// Card Flipping

function flipCard(element) {
        if (isMenuBlocking() == false) element.classList.toggle("flip");
};

card.addEventListener("click", function() {
        flipCard(this)
});

document.body.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
                flipCard(card)

        } else if (event.code === 'ArrowRight') {
                if (isMenuBlocking() == false) gotoNextCard(AWNSER_STATUS.KNOWN);

        } else if (event.code === 'ArrowLeft') {
                if (isMenuBlocking() == false) gotoNextCard(AWNSER_STATUS.UNKNOWN);
        }
});

// button detection

let unkown_btn = document.getElementById("unknown-btn");
let kown_btn = document.getElementById("known-btn");

unkown_btn.addEventListener("click", function() {
        if (isMenuBlocking() == false) gotoNextCard(AWNSER_STATUS.UNKNOWN);
});
kown_btn.addEventListener("click", function() {
        if (isMenuBlocking() == false) gotoNextCard(AWNSER_STATUS.KNOWN);
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

        if (awnserStatus === AWNSER_STATUS.KNOWN) {
                transition_card.classList.add("card-known");
                cardAnim_clone.querySelector(".transition-card").textContent = "Know";
        }
        
        else if (awnserStatus === AWNSER_STATUS.UNKNOWN) {
                transition_card.classList.add("card-unknown");
                cardAnim_clone.querySelector(".transition-card").textContent = "Still Learning";
        }
        // should i separzate ?????
        else if (awnserStatus === AWNSER_STATUS.NEW_SET) {
                transition_card.classList.add("new-card-set");
                cardAnim_clone.querySelector(".transition-card").textContent = `${card_name}`;

        }

        card_container.appendChild(cardAnim_clone);

        setTimeout(() => {
                document.querySelector(".transition-card-wrapper").remove();   // remove old card
        }, 501);
}

function changeCard(card_list, index, awnserStatus) {

        changeProgressBar(index, card_list.cards.length - 1);
        doCardAnim(awnserStatus, card_list.name);


        // flip without animation
        if (isCardFliped() == true) {
                card.style.transition = "none";
                flipCard(card);
                card.offsetHeight;
                card.style.transition = "transform 0.6s ease";
        }
        
        // modify the card
        card.querySelector(".card-front").textContent = card_list.cards[index].front;
        card.querySelector(".card-back").textContent = card_list.cards[index].back;
}

// flashcard_set

function changeFlashcardSet(new_card_set) {
        card_set = new_card_set
        card_index = 0
        changeCard(card_set, card_index, AWNSER_STATUS.NEW_SET)
}

changeFlashcardSet(card_set);