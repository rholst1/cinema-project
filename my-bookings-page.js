$('header').after(`<main></main>`);

$('main').append(`<section class="bookings"></section>`);

$('.bookings').prepend(`<h1 class="currentMovieTitleH1">MINA BOKNINGAR</h1>`);

$('main').append(`<div class="space"></div>`);

$('.space').prepend(`<br> <br>`);

$('.space').after(`<form class="get-booking">
  <input type="text" class="other-button" placeholder="Ange email..." id="emailInput" />
  <button type="button" class="general-button hoverable email-button get-bookings">Hämta dina bokningar</button>
</form>`);

function listenToEmailButton() {
  $('form').on(
    {
      click: function () {
        $('.maindiv').remove();
        $('form').after(`<div class="maindiv"></div>`);

        $('.maindiv').prepend(
          `<br><br> <section class="col2"> <h1>  Bokningar:  </h1> </section>`
        );

        queryDatabase();

        $('.col2').append(
          `<ul>
  
   </ul>`
        );
      },
    },
    '.email-button'
  );
}

listenToEmailButton();

let runQuery;
let fullDate;
let time;
let bookingInfo;

//currentDateAndTime();

//Runs when user clicks "Hämta bokningar"
async function queryDatabase() {
  let inputEmail = document.getElementById('emailInput').value;

  // runQuery = await db.run(/*sql*/ `
  //   SELECT * FROM Showings JOIN bookingHistory ON showingsID WHERE ID = showingsID AND email = '${inputEmail}';
  // `);

  bookingInfo = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Showings.auditorium, Bookings.price, Bookings.ID FROM Bookings INNER JOIN Showings ON(Bookings.showingID = Showings.ID) WHERE Bookings.email = '${inputEmail}'`
  );

  console.log('booking ID: ', bookingInfo);

  for (let { filmID, auditorium, date, time, ID, price } of bookingInfo) {
    let today = new Date();
    let leadingZero =
      today.getFullYear() +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      ('0' + today.getDate()).slice(-2);
    // console.log("date today with leading zero", leadingZero);

    console.log(ID);
    let seatResult = await db.run(
      /*SQL*/ `SELECT * FROM Seatings WHERE Seatings.bookingID = ${ID}`
    );
    let todayDateInt = parseInt(leadingZero);
    console.log(' TODAY parsed int', todayDateInt);

    let parts = `${date}`.split('-');
    let movieDate = new Date(parts[0], parts[1] - 1, parts[2]);

    let movieLeadingZero =
      movieDate.getFullYear() +
      ('0' + (movieDate.getMonth() + 1)).slice(-2) +
      ('0' + movieDate.getDate()).slice(-2);
    console.log('MOVIE DATE WITH LEADING ZERO', movieLeadingZero);

    let movieIntDate = parseInt(movieLeadingZero);

    console.log('MOVIEDATE PARSED INT', movieIntDate);

    let hourNow = today.getHours();
    let minutesNow = today.getMinutes();

    let timeNowString =
      '' + ('0' + hourNow).slice(-2) + ('0' + minutesNow).slice(-2);
    console.log('string time now', timeNowString);

    let timeNowInt = parseInt(timeNowString);
    console.log('time now int parsed!', timeNowInt);

    let movieTimeParts = `${time}`.split(':');

    let movieTimeString =
      '' +
      ('0' + movieTimeParts[0]).slice(-2) +
      ('0' + movieTimeParts[1]).slice(-2);
    console.log('movie time string', movieTimeString);

    let movieTimeInt = parseInt(movieTimeString, 10);
    console.log('movie time int parsed', movieTimeInt);
    let increment = 1;
    if (
      movieIntDate < todayDateInt ||
      ((movieIntDate = todayDateInt) && movieTimeInt < timeNowInt)
    ) {
      let queryHtml = /*HTML*/ `<li class="history"> Salong: ${auditorium} film: ${filmID} Datum och tid: ${date} ${time} Sittplatser:<span class="seats${increment}"></span> </li> `;

      $('ul').append(queryHtml);
      loopSeats(seatResult, increment);
    } else if (
      ((movieIntDate = todayDateInt) && movieTimeInt > timeNowInt) ||
      (movieIntDate > todayDateInt && movieTimeInt > timeNowInt)
    ) {
      let queryHtmlKommande = /*HTML*/ `<li class="kommandevisning"> Kommande visning: Salong: ${auditorium} Film: ${filmID} Datum och tid: ${date} ${time} Sittplatser:<span class="seats${increment}"></span>
    <br> <button class="general-button removeButton" onclick="alert('Biljett avbokad!')" id="delete">Avboka</button></li>
    `;

      $('ul').prepend(queryHtmlKommande);
    }

    $('.removeButton').on('click', async () => {
      db.run('BEGIN TRANSACTION');
      console.log('data', showingsID, email);
      let result = await db.run(
        /*sql*/ `
      DELETE FROM Bookin WHERE showingsID = $showingsID AND email = $email;
    `,
        { showingsID, email }
      );

      console.log('result', result);
    });
  }
}
function loopSeats(seatResult, increment) {
  let n = 0;
  for (let { seatNumber } of seatResult) {
    let html = ' ';

    if (n > 0) {
      html += ' ,';
    }
    html += `${seatNumber}`;
    $(`.seats${increment}`).append(`${html}`);
    n++;
  }
}

db.run('COMMIT');
