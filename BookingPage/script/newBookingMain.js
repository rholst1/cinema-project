$.getScript('/BookingPage/script/movies.js');
$.getScript('/BookingPage/script/eventHandling.js');
$.getScript('/BookingPage/script/booking.js');
$.getScript('/BookingPage/script/tickets.js');

let movies;
let id;
let i;
let totalAmountTickets = 0;
let selectedSeatNrArray = [];
let showingID;

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

// After choosing movie and amount of tickets, this functions builds the auditorium depending on wich movie, saloon and date you picked.
async function renderSeatChooser(showingID) {
  $('.layout').remove();
  $('.showings-container').after(/*html*/ `<div class="layout"></div>`);
  $('.layout').append(/*html*/ `<div class="container">
  	<div class="screen"></div>`);

  let auditorium = await db.run(/*sql*/ `SELECT * FROM Auditorium`);

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

// Shows your current seats you have selected
function selectedSeats(selectedSeatNrArray) {
  $('.actual-booking').remove();
  $('.layout').after(
    /*html*/ `<div class="actual-booking"><p class ="platser">Valda platser: </p></div>`
  );
  for (i = 0; i < selectedSeatNrArray.length; i++) {
    let seat = selectedSeatNrArray[i].match(/\d/g).join('');
    $('.platser').append(/*html*/ `<span class="seatSpan${i}">${seat}</span>`);
    if (i > 0) {
      $(`.seatSpan${i}`).prepend(`, `);
    }
  }
}

// Displays the form you have to fill out to get your booking done
function inputInfo() {
  $('.layout')
    .after(/*html*/ `<div class="booking-form"><form id="form" class="book-tickets">
    <input type="email" placeholder="Ange email..." id="email" />
    <input type="tel" placeholder="Ange telefonnummer..." id="phonenumber" />
    <button type="button" class="general-button" id="bookbtn" >Boka</button>
  </form></div>`);
  $('#bookbtn').click(function () {
    if (
      $.trim($('#email').val()) === '' ||
      $.trim($('#phonenumber').val()) === ''
    ) {
      alert('Var vänlig och fyll i alla fälten, tack!');
      return false;
    } else {
      let email = $('#email').val();
      let phonenumber = $('#phonenumber').val();
      let price = childTickets * 75 + adultTickets * 85 + seniorTickets * 65;
      saveBooking(email, phonenumber, price);
    }
  });
}
