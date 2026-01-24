import "./styles.css";
import { renderHome } from "./views/home/home.js";
import { renderStats } from "./views/stats/stats.js";
import { renderAccount } from "./views/account/account.js";
import { renderCardCreation } from "./views/card_creation/card_creation.js";
import { renderCardList } from "./views/card_list/card_list.js";

const content = document.getElementById("mainContent");

const routes = {
        home: renderHome,
        stats: renderStats,
        account: renderAccount,
        card_creation: renderCardCreation,
        card_list: renderCardList
};

function navigateToContent(view) {
        const render = routes[view];
        if (render) {
                render(content);
        }
}

document
        .querySelectorAll("#button")
        .forEach((btn) => {
                btn.addEventListener("click", () => {
                        navigate(btn.dataset.view);
                });
        });

// default view

document.querySelector(".sidebar-nav-container").addEventListener("click", function(event) {
        let clicked_btn = event.target
        navigateToContent(clicked_btn.dataset.menu)
})

document.getElementById("account-btn").addEventListener("click", function() {
        navigateToContent("account")
})

navigateToContent("home");
