$('header').after(`<main></main>`);

$('main').append(/*html*/ `<section class="bookings"></section>`);

$('.bookings').prepend(
  /*html*/ `<h1 class="currentMovieTitleH1">MINA BOKNINGAR</h1>`
);

$('main').append(/*html*/ `<div class="space"></div>`);

$('.space').prepend(/*html*/ `<br> <br>`);

$('.space').after(/*html*/ `<form class="get-booking">
  <input type="text" class="other-button" placeholder="Ange email..." id="emailInput" />
  <button type="button" class="general-button hoverable email-button get-bookings">Hämta dina bokningar</button>
</form>`);

function listenToEmailButton() {
  $('form').on(
    {
      click: function () {
        $('.maindiv').remove();
        $('form').after(/*html*/ `<div class="maindiv"></div>`);

        $('.maindiv').append(
          /*html*/
          `<section class="col2"> <h1>Kommande visningar:</h1><hr></section>`
        );

        queryDatabase();

        $('.col2').append(/*html*/ `<ul class="upcoming"></ul>`);
        $('.maindiv').append(
          /*html*/
          `<section class="col3"> <h1>Historik:</h1><hr></section>`
        );
        $('.col3').append(/*html*/ `<ul class="history"></ul>`);
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
let increment = 1;

//currentDateAndTime();

//Runs when user clicks "Hämta bokningar"
async function queryDatabase() {
  let inputEmail = document.getElementById('emailInput').value;

  bookingInfo = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Showings.auditorium, Bookings.price, Bookings.ID, Bookings.showingID FROM Bookings INNER JOIN Showings ON(Bookings.showingID = Showings.ID) WHERE Bookings.email = '${inputEmail}'`
  );

  console.log('booking ID: ', bookingInfo);

  for (let {
    filmID,
    auditorium,
    date,
    time,
    ID,
    price,
    showingID,
  } of bookingInfo) {
    let today = new Date();
    let leadingZero =
      today.getFullYear() +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      ('0' + today.getDate()).slice(-2);
    // console.log("date today with leading zero", leadingZero);

    console.log('Showing ID:', showingID);
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

    if (
      movieIntDate < todayDateInt ||
      ((movieIntDate = todayDateInt) && movieTimeInt < timeNowInt)
    ) {
      let queryHtml = /*html*/ `<li class="historik"> Salong: ${auditorium} film: ${filmID} Datum och tid: ${date} ${time} Sittplatser:<span class="seats${increment}"></span> </li> `;

      $('.history').append(queryHtml);
      loopSeats(seatResult, increment);
    } else if (
      ((movieIntDate = todayDateInt) && movieTimeInt > timeNowInt) ||
      (movieIntDate > todayDateInt && movieTimeInt > timeNowInt)
    ) {
      let queryHtmlKommande = /*html*/ `<li class="kommandevisning"> Salong: ${auditorium} Film: ${filmID} Datum och tid: ${date} ${time} Sittplatser:<span class="seats${increment}"></span>
    <br> <button class="general-button removeButton" value="${ID}">Avboka</button></li>
    `;

      $('.upcoming').append(queryHtmlKommande);
      loopSeats(seatResult, increment);
    }
    increment++;
  }
}

$(document).on('click', '.removeButton', async function () {
  db.run('BEGIN TRANSACTION');
  let removeID = $(this).val();
  console.log('made into remove button');
  let result = await db.run(/*sql*/ `
      DELETE FROM Bookings WHERE ID = ${removeID}; UPDATE Seatings SET status = 'empty' WHERE bookingID = ${removeID}`);

  console.log('result', result);
});

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
