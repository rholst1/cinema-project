$('header').after(/*html*/ `<main></main>`);
$('main').append(/*html*/ `<div class="choose-movie"></div>`);
$('.choose-movie').append(/*html*/ `<div class="dropdown">
  <button id="toggle" class="general-button dropbtn">Välj film</button>
  <div class="dropdown-content">
  </div>
</div>`);
$('.choose-movie').after(
  /*html*/ `<div class="showings-container"><h1></h1></div>`
);

let movies;
let id;
let i;
let childTickets = 0;
let adultTickets = 0;
let seniorTickets = 0;
let totalAmountTickets = 0; // Userinput
let selectedSeatNrArray = [];
let showingID;

function renderChosenTicketsC() {
  $('.showAmountC').remove();
  let html = /*html*/ `<p class="showAmountC">${childTickets}</p>`;
  $('.amountC').append(html);
}

function renderChosenTicketsA() {
  $('.showAmountA').remove();
  let html = /*html*/ `<p class="showAmountA">${adultTickets}</p>`;
  $('.amountA').append(html);
}

function renderChosenTicketsS() {
  $('.showAmountS').remove();
  let html = /*html*/ `<p class="showAmountS">${seniorTickets}</p>`;
  $('.amountS').append(html);
}

function addChildTicket() {
  childTickets++;
  totalAmountTickets++;
  renderChosenTicketsC();
}

function remChildTicket() {
  childTickets--;
  totalAmountTickets--;
  renderChosenTicketsC();
}

function addAdultTicket() {
  adultTickets++;
  totalAmountTickets++;
  renderChosenTicketsA();
}

function remAdultTicket() {
  adultTickets--;
  totalAmountTickets--;
  renderChosenTicketsA();
}
function addSeniorTicket() {
  seniorTickets++;
  totalAmountTickets++;
  renderChosenTicketsS();
}

function remSeniorTicket() {
  seniorTickets--;
  totalAmountTickets--;
  renderChosenTicketsS();
}

async function addMovies() {
  movies = await db.run(`SELECT * FROM new_movie_list`);
  i = 0;
  id = [];
  while (i < movies.length) {
    for (let { title } of movies) {
      id[i] = i;
      let movieHtml = `<a href="#" id="${i}" onclick="renderMovieBooking(${i})">${title}</a>`;
      i++;
      $('.dropdown-content').append(movieHtml);
    }
  }
}

async function renderMovieBooking(i) {
  $('.selectedShowing').remove();
  $('.dropdown').remove();
  $('h1').remove();
  $('.layout').remove();
  $('.booking-form').remove();
  let queryShowings = await db.run(
    /*sql*/ `SELECT * FROM Showings WHERE filmID = '${movies[i].title}'`
  );

  $('.showings-container').append(`<h1>${movies[i].title}</h1>`);
  for (let { ID, auditorium, date, time } of queryShowings) {
    $('.showings-container').append(
      /*html*/ `<div class="selectedShowing"><div><h3>Salong: ${auditorium} | Datum: ${date} | Time: ${time}</h3></div><div class="book"><button id="book" class="general-button" value="${ID}">Boka</button></div></div>`
    );
  }
}
addMovies();

//Enter selected show
async function renderSeatChooser(showingID) {
  $('.layout').remove();
  $('.showings-container').after(`<div class="layout"></div>`);
  $('.layout').append(`<div class="container">
  	<div class="screen"></div>`);

  let auditorium = await db.run(/*sql*/ `SELECT * FROM Auditorium`);

  //Pulls seats from the selectedShow by the unique showingID
  let seatStatus = await db.run(
    /*sql*/ `SELECT * FROM Seatings WHERE showingID = ${showingID}`
  );
  let seatNumberArray = [];
  let seatStatusArray = [];
  let n = 0;

  for (let { seatNumber, status } of seatStatus) {
    seatNumberArray[n] = seatNumber;
    seatStatusArray[n] = status;

    n++;
  }
  n = 0;

  for (k = 0; k < auditorium[0].rows; k++) {
    $('.container').append(`<div class="row" id=row${k + 1}></div>`);

    for (l = 0; l < auditorium[0].seatsPerRow; l++) {
      $(`#row${k + 1}`).append(
        `<div class="seat" id="seat${seatNumberArray[n]}"></div>`
      );
      if (seatStatusArray[n].localeCompare('occupied') === 0) {
        $(`#seat${seatNumberArray[n]}`).toggleClass('occupied');
      }
      n++;
    }
  }

  $('.container').append(/*html*/ `<div class="showcase">
		<div>
			<div class="seatshow"></div>
			<span>N/A</span>
		</div>
		<div>
			<div class="seatshow selected"></div>
			<span>Valda platser</span>
		</div>
		<div>
			<div class="seatshow occupied"></div>
			<span>Upptagna</span>
		</div>
	</div>`);
}

$('#toggle').click(function () {
  $('.dropdown-content').show();
});

$('.dropdown-content').click(hideMenu).mouseleave(hideMenu);

function hideMenu() {
  $('.dropdown-content').hide();
}

$(document).on('click', '#book', function () {
  $('h1').remove();
  $('.selectedShowing').remove();
  renderTicketChooser();
  selectedSeatNrArray.length = 0;
  showingID = $(this).val();
  // renderSeatChooser(showingID);
  // inputInfo();
});

function renderTicketChooser() {
  $('main').append(`<div class="ticket-container"></div>`);
  $('main').append(`<div class="continue-container"></div>`);
  let htmlChild = /*html*/ `<span>Barn - 75kr</span><div class="button-container"><button id="childTicketRem" class="general-button">-</button><div class="amountC"><p class="showAmountC">0</p></div><button id="childTicketAdd" class="general-button">+</button></div>`;

  let htmlAdult = /*html*/ `<span>Vuxen - 85kr</span><div class="button-container"><button id="adultTicketRem" class="general-button">-</button><div class="amountA"><p class="showAmountA">0</p></div><button id="adultTicketAdd" class="general-button">+</button></div>`;

  let htmlSenior = /*html*/ `<span>Pensionär - 65kr</span><div class="button-container"><button id="seniorTicketRem" class="general-button">-</button><div class="amountS"><p class="showAmountS">0</p></div><button id="seniorTicketAdd" class="general-button">+</button></div>`;

  let htmlButton = /*html*/ `<div><button id="continue-button" class="general-button">Fortsätt</button></div>`;

  let html = htmlChild + htmlAdult + htmlSenior;
  $('.ticket-container').append(html);
  $('.continue-container').append(htmlButton);
}

$(document).on('click', '.seat', function () {
  if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
    if ($(this).hasClass('seat') && $(this).hasClass('selected')) {
      $(this).toggleClass('selected');
      function removeFromListByIndex(index) {
        selectedSeatNrArray.splice(index, 1);
      }
      index = selectedSeatNrArray.indexOf($(this).get(0).id);
      removeFromListByIndex(index);
      actualBooking(selectedSeatNrArray);
    } else if (!(selectedSeatNrArray.length === totalAmountTickets)) {
      if ($(this).hasClass('seat') && !$(this).hasClass('occupied')) {
        $(this).toggleClass('selected');
        selectedSeatNrArray.push($(this).get(0).id);
      }
      actualBooking(selectedSeatNrArray);
    } else {
      alert('Du har valt för många din jävel');
    }
  }
});

function actualBooking(selectedSeatNrArray) {
  $('.actual-booking').remove();
  $('.layout').after(
    /*html*/ `<div class="actual-booking"><p class ="platser">Valda platser: </p></div>`
  );
  for (i = 0; i < selectedSeatNrArray.length; i++) {
    let seat = selectedSeatNrArray[i].match(/\d/g).join('');
    $('.platser').append(`<span class="seatSpan${i}">${seat}</span>`);
    if (i > 0) {
      $(`.seatSpan${i}`).prepend(`, `);
    }
  }
}

function inputInfo() {
  $('.layout')
    .after(/*html*/ `<div class="booking-form"><form id="form" class="book-tickets">
    <input type="email" placeholder="Ange email..." id="email" />
    <input type="tel" placeholder="Ange telefonnummer..." id="phonenumber" />
    <button type="submit" class="general-button" id="bookbtn" >Boka</button>
  </form></div>`);
  $('#form').submit(function () {
    if ($.trim($('#email').val()) === '') {
      alert('Var vänlig och fyll i alla fälten, tack!');
      return false;
    } else {
      let email = $('#email').val();
      let phonenumber = $('#phonenumber').val();
      let price = childTickets * 75 + adultTickets * 85 + seniorTickets * 65;
      saveBooking(email, phonenumber, price);
      saveSeats(selectedSeatNrArray, email);
      // Ändra bekräftelse till valda stolsnummer, film och datum.
    }
  });
}

async function saveBooking(email, phonenumber, price) {
  db.run('BEGIN TRANSACTION');
  await db.run(
    /*sql*/ `INSERT INTO Bookings (phonenumber, email, showingID, price) VALUES ('${phonenumber}', '${email}', ${showingID}, ${price})`
  );
  db.run('COMMIT');
}
async function saveSeats(seatings, email) {
  console.log('hej från saveSeats', showingID);
  let bookingID = await db.run(
    /*sql*/ `SELECT ID FROM Bookings WHERE email = '${email}' AND showingID = ${showingID}`
  );
  console.log(bookingID);
  let bookingIdNewest = 0;
  for (let { ID } of bookingID) {
    if (bookingIdNewest < ID) {
      bookingIdNewest = ID;
    }
  }
  console.log(bookingIdNewest);

  for (i = 0; i < seatings.length; i++) {
    db.run('BEGIN TRANSACTION');
    let seat = seatings[i].match(/\d/g).join('');
    await db.run(
      /*sql*/ `UPDATE Seatings SET status = "occupied", bookingID = ${bookingIdNewest} WHERE seatNumber = ${seat} AND showingID = ${showingID}`
    );
  }

  db.run('COMMIT');
  console.log('skicka till query', bookingIdNewest);
  renderConfirmation(bookingIdNewest);
}
//db.run('COMMIT');
$(document).on('click', '#childTicketAdd', function () {
  addChildTicket();
});
$(document).on('click', '#childTicketRem', function () {
  remChildTicket();
});
$(document).on('click', '#adultTicketAdd', function () {
  addAdultTicket();
});
$(document).on('click', '#adultTicketRem', function () {
  remAdultTicket();
});
$(document).on('click', '#seniorTicketAdd', function () {
  addSeniorTicket();
});
$(document).on('click', '#seniorTicketRem', function () {
  remSeniorTicket();
});
$(document).on('click', '#continue-button', function () {
  $('.ticket-container').remove();
  $('.continue-container').remove();
  renderSeatChooser(showingID);
  inputInfo();
  actualBooking();
});

async function renderConfirmation(bookingIdNewest) {
  console.log('innan query', bookingIdNewest);
  db.run('BEGIN TRANSACTION');
  let confirmation = await db.run(
    /*sql*/ `SELECT DISTINCT Showings.filmID, Showings.date, Showings.time, Seatings.seatNumber, Showings.auditorium FROM Showings INNER JOIN Bookings ON (Bookings.showingID = Showings.ID) INNER JOIN Seatings ON (Seatings.bookingID = ${bookingIdNewest}) WHERE Showings.ID = ${showingID}`
  );
  db.run('COMMIT');
  let { filmID, date, time, auditorium } = confirmation[0];
  $('.layout').replaceWith(
    `<div class="tack" ><h1>Tack för din bokning</h1></div>`
  );
  $('.actual-booking').remove();
  $('.booking-form').remove();
  $('.tack').append(`
    <div class="färdigbokningLOL">
      <h2>${filmID}</h2>
      <h3>
        ${date} ${time} 
      </h3>
      <h3>Salong: ${auditorium}</h3>
      <h3 class="stol"> Stolsnummer: </h3>
    </div>`);
  console.log(confirmation);

  let n = 0;
  for (let { seatNumber } of confirmation) {
    console.log(seatNumber);
    let html = '';

    if (n > 0) {
      console.log('made it here');
      html += ' ,';
    }
    html += `${seatNumber}`;
    $('.stol').append(`${html}`);
    n++;
  }
}

// SELECT Showings.filmID, Showings.date, Showings.time, Seatings.seatNumber, Showings.auditorium FROM Showings INNER JOIN Bookings ON (Bookings.showingID = Showings.ID) INNER JOIN Seatings ON (Seatings.bookingID = 1) WHERE Showings.ID = Bookings.showingID
