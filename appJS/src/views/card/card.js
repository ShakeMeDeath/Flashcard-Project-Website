import "./card.css";

export function renderCard(container) {
        container.innerHTML = `
            <div class="card-ui-wrapper" style="visibility: hidden;">
			<div class="card-container">
				<div class="card">
					<div class="card-face card-front"></div>
					<div class="card-face card-back"></div>
				</div>
			</div>
			<div class="menu-ctrl-container">
				<div class="card-menu progress-bar-container">
					<div class="card-menu progress-bar"></div>

					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
					<div class="card-menu point"></div>
				</div>
				<div class="menu-ctrl-btn red-hover" id="unknown-btn" type="button">
                              <div class="menu-btn-svg-wrapper">
                                    <svg style="scale: 1.5;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentcolor" stroke-width="0.36"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="currentcolor"></path> </g></svg>
					</div>
					<div class="end-menu tooltip">Learning</div>
				</div>
                        <div class="menu-ctrl-btn" id="return-btn" type="button">
                              <div class="menu-btn-svg-wrapper">
                                    <svg style="scale: 1.3;" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="returnIconTitle" stroke="currentcolor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none" color="currentcolor" transform="rotate(180)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="returnIconTitle">Return</title> <path d="M19,8 L19,11 C19,12.1045695 18.1045695,13 17,13 L6,13"></path> <polyline points="8 16 5 13 8 10"></polyline> </g></svg>
                              </div>
                              <div class="end-menu tooltip">Return</div>
				</div>
				<div class="menu-ctrl-btn green-hover" id="known-btn" type="button">
                              <div class="menu-btn-svg-wrapper">
                                    <svg style="scale: 1.3;" viewBox="0 0 24 24" id="_24x24_On_Light_Checkmark" data-name="24x24/On Light/Checkmark" xmlns="http://www.w3.org/2000/svg" fill="currentcolor" stroke="currentcolor" stroke-width="0.8399999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="view-box" width="24" height="24" fill="#currentcolor" opacity="0"></rect> <path id="Shape" d="M5.341,12.247a1,1,0,0,0,1.317,1.505l4-3.5a1,1,0,0,0,.028-1.48l-9-8.5A1,1,0,0,0,.313,1.727l8.2,7.745Z" transform="translate(19 6.5) rotate(90)" fill="#currentcolor"></path> </g></svg>
                              </div>
                              <div class="end-menu tooltip">Known</div>
				</div>
                        
			</div>
		</div>
        `;
}
