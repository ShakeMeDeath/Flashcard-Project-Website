let loaded_card = {
        CARD_INDEX: 0,
        CARD_PROGRESSION: null,
        CARD_NAME: null,
        CARD_SET: null,
        CARD_ELEMENT: document.querySelector(".card")
}

const awnser_status = {
        UNKNOWN: 0,
        KNOWN: 1,
        NEW_SET: 2
};

let card_ui_wrapper = document.querySelector(".card-ui-wrapper");

toggleHide(card_ui_wrapper, true)

let open_folder_input = document.getElementById("open-folder-input");

let loaded_flashcards_files = {
        CARD_FILES: null,
        CARD_SET_LIST: [],
        FILES_CONTAINER_ELEMENT: document.querySelector(".card-list-container"),
        CASH_FILES_INDEX: null
}
// 
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
        
        // let cashed_cardset = loaded_flashcards_files.CARD_FILES[loaded_flashcards_files.CASH_CARD_INDEX];
        // console.log("am i called")

        // if (!loaded_flashcards_files.CARD_FILES[loaded_flashcards_files.CASH_CARD_INDEX]) console.log("i dont exist")

        // console.log(cashed_cardset.cards)
        // console.log(cashed_cardset.title)

        loaded_card.CARD_PROGRESSION = [];
        loaded_card.CARD_INDEX = 0
        
        changeFlashcardSet(loaded_card.CARD_SET, loaded_card.CARD_NAME);
        
        changeProgressBar(loaded_card.CARD_INDEX, loaded_card.CARD_SET.length - 1);
        // doCardAnim(awnser_status.NEW_SET, loaded_card.CARD_NAME);
}

function closeEndMenu() {

        let endMenu = document.querySelector(".dim");
        // toggleDisappear(endMenu, true)

        endMenu.classList.add("disappear");

        endMenu.addEventListener("animationend", function() {
                endMenu.remove();
        }, { once: true });
}

function toggleHide(element, hideBool) {
        if (hideBool === true) {
                element.style.visibility = "hidden";
                element.classList.add("isHidden");
        } else {
                element.style.visibility = "visible";
                element.classList.remove("isHidden");
        }
}

function triggerEndMenu() {        
        let clone = end_menu_template.content.cloneNode(true);
        
        const fails =loaded_card.CARD_PROGRESSION.filter(x => x == awnser_status.UNKNOWN).length
        const success = loaded_card.CARD_PROGRESSION.filter(x => x == awnser_status.KNOWN).length
        
        const pourcentage = Math.round(success * 100 / (success + fails));
        
        clone.querySelector(".fails-num").textContent = fails;
        clone.querySelector(".success-num").textContent = success;
        
        clone.querySelector(".end-menu-num").textContent = pourcentage;
        clone.querySelector(".end-menu .progress-bar").style.width = `${pourcentage}%`; // 
        clone.querySelector(".end-menu .progress-bar").style.setProperty("--fill-pourcentage", `${pourcentage}%`);
        
        // ctrl btns menu
        clone.querySelector(".redo-btn").addEventListener("click", function() {
                closeEndMenu();
                restartCardSet();
        })
        
        clone.querySelector(".exit-btn").addEventListener("click", function() {
                closeEndMenu()
                // toggleDisappear(loaded_card.CARD_ELEMENT, true)
                // toggleDisappear(card_ui_wrapper, true)
                loaded_card.CARD_SET = null;
        })
        
        document.querySelector(".card-screen").appendChild(clone);
}

function saveProgress(awnserStatus) {
        loaded_card.CARD_PROGRESSION.push(awnserStatus);
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

        const cardAnim_template = document.getElementById("card-animation");
        let cardAnim_clone = cardAnim_template.content.cloneNode(true);

        let transition_card = cardAnim_clone.querySelector(".transition-card");
        let transition_wrapper = cardAnim_clone.querySelector(".transition-card-wrapper");

        if (awnserStatus === awnser_status.KNOWN) {
                transition_card.classList.add("card-known");
                transition_card.textContent = "Know";
        }
        else if (awnserStatus === awnser_status.UNKNOWN) {
                transition_card.classList.add("card-unknown");
                transition_card.textContent = "Still Learning";
        }
        else if (awnserStatus === awnser_status.NEW_SET) {
                transition_card.classList.add("new-card-set");
                transition_card.textContent = `${card_name}`;
        }

        transition_wrapper.addEventListener("animationend", function() {
                this.remove();
        }, { once: true });

        document.querySelector(".card-container").appendChild(cardAnim_clone);
}

function changeCard(index) {

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

function changeFlashcardSet(card_set_cards, card_set_title) {
        // console.log(card_set);
        
        loaded_card.CARD_NAME = card_set_title;
        loaded_card.CARD_PROGRESSION = [];
        loaded_card.CARD_SET = card_set_cards;
        loaded_card.CARD_INDEX = 0

        changeCard(loaded_card.CARD_INDEX);

        changeProgressBar(loaded_card.CARD_INDEX, loaded_card.CARD_SET.length - 1);
        doCardAnim(awnser_status.NEW_SET, loaded_card.CARD_NAME);
}

// 
// card import


function LoadCardSet(cardset_index) {
        let current_card_set = loaded_flashcards_files.CARD_SET_LIST[cardset_index];

        toggleHide(card_ui_wrapper, false)

        changeFlashcardSet(current_card_set.cards);
}

function loadCardFiles() {
        loaded_flashcards_files.FILES_CONTAINER_ELEMENT.addEventListener("click", function (event) {

                let cardset_template_btn = event.target;
                if (cardset_template_btn.classList.contains("card-template-item")) {
                        
                        if (isMenuBlocking() == false) {
                                LoadCardSet(cardset_template_btn.dataset.cardsetIndex);
                        }
                }
        });

        for (let i = 0; i < loaded_flashcards_files.CARD_SET_LIST.length; i++) {

                let current_card_set = loaded_flashcards_files.CARD_SET_LIST[i];

                let new_cardset_element = document.getElementById("cardset-template").content.cloneNode(true);

                new_cardset_element.querySelector(".cardset-template-item-title").textContent = current_card_set.title;
                new_cardset_element.querySelector(".card-template-item").dataset.cardsetIndex = i;
                new_cardset_element.querySelector(".cardset-size-info").textContent = loaded_flashcards_files.CARD_SET_LIST[i].cards.length;

                loaded_flashcards_files.FILES_CONTAINER_ELEMENT.appendChild(new_cardset_element);
        }
}

open_folder_input.addEventListener("change", async (e) => {
        loaded_flashcards_files.CARD_FILES = e.target.files;
        loaded_flashcards_files.CARD_SET_LIST = [];

        // push each falshcards
        for (const file of loaded_flashcards_files.CARD_FILES) {
                if (file.name.endsWith(".json")) {
                        const text = await file.text();
                        loaded_flashcards_files.CARD_SET_LIST.push(JSON.parse(text));
                }
        }
        loadCardFiles()
});
