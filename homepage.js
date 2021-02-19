$('header').after(`<main></main > `);
$('main').append(`<section class="newsAndShowtimeElements"></section>`);
//  $('.newsAndShowtimeElements').append(``);
//  $('.newsAndShowtimeELemnts').append(`<div class="nowShowing">`)

document.write(<p>Åsna</p>);
document.write("HEJSANDÅ");
console.log()

// buildNews();
// buildNowShowing();

/* Function that builds the "Nyheter" section with the bullet point news */
function buildNews() {
  $('section').append(`<section class="newsAndShowtimeElements"></section>`);

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
  $(`.newsAndShowtimeElements`).append(newsHtml);

}

/* Function that builds the "Visas just nu" section with links etc */
function buildNowShowing() {
  $('section').append(`<section class="newsAndShowtimeElements"></section>`);

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

  $(`.newsAndShowtimeElements`).append(nowShowingHtml);
}

document.write(<p>Åsna</p>);

/*
<section class="newsAndShowtimeElements">
  <div class="news">
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
  </div>
  <div class="nowShowing">
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
  </div>
</section> */