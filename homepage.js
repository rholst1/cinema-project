$('header').after(`<main></main > `);
$('main').append(`<div class="slideshow-container"></div>`);
$('.slideshow-container').append(buildCarousel());
$('.slideshow-container').after(`<section class="newsAndShowtimeElements"></section>`);
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

/* Function that builds the "Visas just nu" section with links etc */
function buildNowShowing() {

  let nowShowingHtml;

  nowShowingHtml = /*html*/ `<div class="nowShowing">
      <h2 class="nowShowingh2">Visas just nu</h2>
      <ul class="nowShowingTitles">
        <li>
          <a href="ticketbooking.html" style="color: ghostwhite" class="hoverable">COMMANDO | 18:00 Sal 1</a>
        </li>
        <li>
          <a href="ticketbooking.html" style="color: ghostwhite" class="hoverable">Sällskapsresan | 19:00 Sal 2</a>
        </li>
        <li>
          <a href="ticketbooking.html" style="color: ghostwhite" class="hoverable">Hot Rod | 21:00 Sal 1</a>
        </li>
        <li>
          <a href="ticketbooking.html" style="color: ghostwhite" class="hoverable">Interstellar | 21:30 Sal 2</a>
        </li>
      </ul>
    </div>`

  return nowShowingHtml;
}

/* Function that builds the carousel */
function buildCarousel() {
  let carousel = /*html*/ `<div class="slides">               
      <img src="img/hf.jpeg">
      <div class="text">en review här kanske?</div>
    </div>

    <div class="slides">
      <img src="/img/ts.jpg">
      <div class="text">en review här kanske?</div>
    </div>

    <div class="slides">
      <img src="img/tenet.jpg">
      <div class="text">en review här kanske?</div>
    </div>

    <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
    <a class="next" onclick="changeSlide(1)">&#10095;</a>
  </div>
  <div class="dot-container">
    <span class="dot" onclick="changeDotSlide(1)"></span>
    <span class="dot" onclick="changeDotSlide(2)"></span>
    <span class="dot" onclick="changeDotSlide(3)"></span>
  </div>`

  return carousel;
}