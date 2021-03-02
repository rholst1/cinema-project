$.getScript('/HomePage/script/carousel.js');

$('header').after(`<main></main > `);
$('main').append(`<div class="slideshow-container"></div>`);
$('.slideshow-container').append(buildCarousel());
$('.slideshow-container').after(
  `<section class="newsAndShowtimeElements"></section>`
);
$('.newsAndShowtimeElements').append(buildNews());
$('.newsAndShowtimeElements').append(buildNowShowing());

/* Function that builds the "Nyheter" section with the bullet point news */
function buildNews() {
  let newsHtml;

  newsHtml = /*html*/ `<div class="news">
      <h2 class="newsh2">Nyheter</h2>
      <article>
        <p>"COMMANDO" - Stor succé på Svenska Biografer</p>
        <p>
          "Sällskapsresan" - En alltid välkommen Klassiker, återigen på Bio
          hos oss
        </p>
        <p>
          "STAR DESTROYER SPICY POPCORN" - Popcornen som tar världen med
          storm, nu äntligen i vårt utbud!
        </p>
        <p>
          Exklusiv intervju med Arnold Schwarzenegger -
          "Uaaahhgghuuahhheeyyghhgu". Hör hans egna ord om "The Commando"
        </p>
        <p>
          OBS: Under nuvarande Coronasituation så får ingen titta på varandra.
          Enbart tittande på bioduk är tillåtet!
        </p>
      </article>
    </div>`;

  return newsHtml;
}

/* Function that builds the "Visas just nu" section with links etc and database info */
function buildNowShowing() {
  let nowShowingHtml;

  nowShowingHtml = /*html*/ `<div class="nowShowing">
      <h2 class="nowShowingh2">På Bio idag:</h2>
      <ul class="nowShowingTitles">
     </div>`;
  databasePullShowings();
  return nowShowingHtml;
}

/* Function that loads DB entries from Showings into Now Showing box */
async function databasePullShowings() {
  let todaysDate = new Date().toISOString().slice(0, 10);

  if (todaysDate[8] == '0') {
    todaysDate = todaysDate.slice(0, 8) + todaysDate[9];
  }
  try {
    showings = await db.run(`SELECT * FROM Showings`);
  } catch (err) {
    console.log('Failed to load from Database');
  }

  for (let { filmID, auditorium, date, time } of showings) {
    if (date.localeCompare(todaysDate) === 0) {
      buildNowShowingElements(filmID, auditorium, time);
    }
  }
}

/* Function that builds the elements that gets loaded underneath "Visas Just Nu" Header */
function buildNowShowingElements(filmID, auditorium, time) {
  let html = /*html*/ `<li><a href="ticketbooking.html" style="color: ghostwhite" class="hoverabe"l>${filmID} | ${time} | Salong ${auditorium}</a></li>
  `;
  $('.nowShowingTitles').append(html);
}

/* Function that builds the carousel */
function buildCarousel() {
  return /*html*/ `<div class="slides">
    <a href="#" onclick="buildInfo('Hidden Figures')">
      <img src="img/hf.jpeg">
    </a>
    </div>

    <div class="slides">
    <a href="#" onclick="buildInfo('Toy Story 4')">
      <img src="/img/ts.jpg">
    </a>
    </div>

    <div class="slides">
    <a href="#" onclick="buildInfo('Tenet')">
      <img src="img/tenet.jpg">
    </a>
    </div>

    <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
    <a class="next" onclick="changeSlide(1)">&#10095;</a>
  </div>
  <div class="dot-container">
    <span class="dot" onclick="changeDotSlide(1)"></span>
    <span class="dot" onclick="changeDotSlide(2)"></span>
    <span class="dot" onclick="changeDotSlide(3)"></span>
  </div>`;
}