let tabs = document.querySelector(".tab-button-container");
let tab_content = document.querySelectorAll(".tab-content");
const tab_button_overlay = document.querySelector(".tab-button-overlay");
let current_tab = 0

function tabRefresh(tab_num) {


        let tab_counter = 0;

        Array.from(tab_content).forEach(tab => {

                tab_button_overlay.style.transform = `translateX(${100 * (tab_counter + tab_num - 2)}%)`;
                tab.style.transform = `translateX(${100 * (tab_counter - tab_num)}%)`;
                tab_counter++
        });
};
tabRefresh(current_tab);

tabs.addEventListener("click", function(event) {
        let clicked_tab = event.target;
        current_tab = Number(clicked_tab.dataset.tabNum);

        tabRefresh(current_tab);
});

// Cards


const card_template = document.getElementById("card-template");
let flashcard_area = document.querySelector(".flashcard-area");

function LoadCard(card_set) {
        flashcard_area.replaceChildren();

        const clone = card_template.content.cloneNode(true);
        clone.querySelector(".card-front").textContent = `${card_set.cards[0].front}`;
        clone.querySelector(".card-back").textContent = `${card_set.cards[0].back}`;
        clone.querySelector(".card-item").addEventListener("click", function(event) {
                // doFlipAnimation(this);
        });
        flashcard_area.appendChild(clone);

        // for (let i = 0; i < card_set.cards.length; i++) {
                
        // //         const clone = card_template.content.cloneNode(true);
        // //         clone.querySelector(".card-front").textContent = `${card_set.cards[i].front}`;
        // //         clone.querySelector(".card-back").textContent = `${card_set.cards[i].back}`;

        // //         flashcard_screen.appendChild(clone);
        // // };
};

// SideBar

let sidebar_container = document.querySelector(".flashcard-sidebar");

document.getElementById("open-folder-input").addEventListener("change", async (e) => {
        let files = e.target.files;
        console.log(files)

        const flashcards = [];

        for (const file of files) {
                if (file.name.endsWith(".json")) {
                        const text = await file.text();
                        flashcards.push(JSON.parse(text));
                }
        }

        let i = 0;
        
        Array.from(flashcards).forEach(card_set => {
                let card_item = document.createElement("div");

                card_item.textContent = card_set.title;
                card_item.classList.add("sidebar-item")
                card_item.dataset.cardIndex = `${i}`;
                card_item.addEventListener("click", function (event) {
                        LoadCard(card_set);
                });

                sidebar_container.appendChild(card_item)
                i++
        });
});

