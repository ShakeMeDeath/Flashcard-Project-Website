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

let card = document.querySelector(".card");
let card_container = document.querySelector(".card-container");

//  progress bar

let progress_bar = document.querySelector(".progress-bar");

function changeProgressBar(pourcentage) {
        progress_bar.style.width = `${pourcentage}%`;
};

// Card Flipping

function flipCard(element) {
        if (document.querySelector(".dim") == null) element.classList.toggle("flip");
};

card.addEventListener("click", function() {
        flipCard(this)
});

document.body.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
                flipCard(card)
                console.log("hehe")
        } else if (event.code === 'ArrowRight') {
                if (document.querySelector(".dim") == null) changeCard(card_set, card_index+1, true);
                card_index++
        } else if (event.code === 'ArrowLeft') {
                if (document.querySelector(".dim") == null) changeCard(card_set, card_index+1, false);
                card_index++
        }
});

// button detection

let unkown_btn = document.getElementById("unknown-btn");
let kown_btn = document.getElementById("known-btn");

unkown_btn.addEventListener("click", function() {
        if (document.querySelector(".dim") == null) changeCard(card_set, card_index+1, false);
        card_index++
});
kown_btn.addEventListener("click", function() {
        if (document.querySelector(".dim") == null) changeCard(card_set, card_index+1, true);
        card_index++
});

// Card Swicthing

const card_template = document.getElementById("card-template");
const end_menu_template = document.getElementById("finnish-screen");

function changeCard(card_list, index, state) {

        // store card result
        
        if (state != 2) {
                card_progression_list.push(state)
        }

        // change progress bar pourcentage

        let fill_pourcentage = index * 100 / (card_list.cards.length - 1);
        if (fill_pourcentage > 100) {
                fill_pourcentage = 100;

                if (document.querySelector(".dim") == null) {
                        let clone = end_menu_template.content.cloneNode(true);

                        clone.querySelector(".fails-num").textContent = card_progression_list.filter(x => x == 0).length;
                        clone.querySelector(".success-num").textContent = card_progression_list.filter(x => x == 1).length; 

                        document.body.appendChild(clone);


                }
        }

        changeProgressBar(fill_pourcentage);

        // create the transition card

        let transition_card_wrapper = document.createElement("div");
        transition_card_wrapper.classList.add("transition-card-wrapper")

        let transition_card = document.createElement("div");
        transition_card.classList.add("transition-card");

        if (state == 1) { // known
                transition_card.textContent = "Know";
                transition_card.classList.add("card-known");
                transition_card_wrapper.classList.add("card-known");
        }
        else if (state == 0) { // unknown
                transition_card.textContent = "Still Learning";
                transition_card.classList.add("card-unknown");
                transition_card_wrapper.classList.add("card-unknown");
        }
        else if (state == 2) {
                transition_card.textContent = `${card_list.name}`;
                transition_card.classList.add("new-card-set");
                transition_card_wrapper.classList.add("new-card-set");
        } else {
                console.log("invalid changeCard() state !")
        }

        card_container.appendChild(transition_card_wrapper);
        transition_card_wrapper.appendChild(transition_card);

        // flip without animation

        if (document.querySelector(".flip") != null) {
                card.style.transition = "none";
                flipCard(card);
                card.offsetHeight;
                card.style.transition = "transform 0.6s ease";
        }
        
        // modify the card

        card.querySelector(".card-front").textContent = card_list.cards[index].front;
        card.querySelector(".card-back").textContent = card_list.cards[index].back;

        // remove the transition card

        setTimeout(() => {
                document.querySelector(".transition-card-wrapper").remove();   // remove old card
        }, 501);
}

// flashcard_set

function changeFlashcardSet(new_card_set) {
        card_set = new_card_set
        card_index = 0
        changeCard(card_set, 0, 2)
}

changeFlashcardSet(card_set);