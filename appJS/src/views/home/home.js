import "./home.css";

export function renderHome(container) {
        container.innerHTML = `
                <div class="menu-container">
                      <h1>Recent</h1>
                      <div class="recent-card-container">
                            <div class="card-item">im card item 1</div>
                              <div class="card-item">im card item 2</div>
                              <div class="card-item">im card item 3</div>
                              <div class="card-item">im card item 4</div>
                              <div class="card-item">im card item 5</div>
                              <div class="card-item">im card item 6</div>
                      </div>
                      <h1>stats</h1>
                      <div class="stats-container">
                            <div class="stat-item">Stats1</div>
                            <div class="stat-item">Stats2</div>
                      </div>
                </div>
        `;
}