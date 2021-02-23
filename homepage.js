$('header').after(`<main></main > `);
$('main').append(`<section class="newsAndShowtimeElements"></section>`);
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
      <h2 class="nowShowingh2">Visas just nu</h2>
      <ul class="nowShowingTitles">
     </div>`;
  databasePullShowings();
  return nowShowingHtml;

}

/* Function that loads DB entries from Showings into Now Showing box */
let showings = [];
async function databasePullShowings() {
  try {
    showings = await db.run(`SELECT * FROM Showings`);
  }
  catch (err) {
    console.log("Failed to load from Database");
  }

  for (let { filmID, auditorium, date, time } of showings) {

    if (date.localeCompare("2021-03-1") === 0) {
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



