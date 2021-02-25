import Customer from '/script/Customer.js';
import Showing from '/script/Showing.js';
import SeatingsController from '/script/SeatingsController.js';
import DatabaseController from '/script/DatabaseController.js';
import Auditorium from '/script/Auditorium.js';
import Film from '/script/Film.js';
import Ticket from '/script/Ticket.js';
import Booking from '/script/Booking.js';

/*Accessing the database through this controller */
let dbController = new DatabaseController();
/*Controller for reading and manageing the seat selector buttons and
its related classes. */
let seatingsController = null;
//load current prices (maybe this shouldn't be done here?)
(dbController.getTicketPriceReference()).then((ticketPrices) => {
  Ticket.loadPriceReference(ticketPrices);
});
init();

/*Start up the page here */
function init() {
  buildMovieSelectorDropdown();
  listenToMovieSelector();
}
/*Main container of ticket booking page*/
function buildTicketBookingContainer() {
  if ($('.ticketbooking-container').length) {
    $('.ticketbooking-container').remove();
  }
  $('.border').append(`<article class="ticketbooking-container">
    <div class="booking-row1">
      <div class="booking-row1-col0"></div>
      <div class="booking-row1-col1"></div>
      <div class="booking-row1-col2"></div>
    </div>
    <div class="booking-row2"></div>
    <div class="booking-row3"></div>
  </article>`);
}

function buildMovieSelectorDropdown() {
  $('.border').html(`
  <div class="booking-row0"></div>
  `);
  $('.booking-row0').html(`
  <div class="movie-selector-dropdown">
      <select id="select-movie">
        <option value="0">Välj film:</option>
      </select>
  </div>`);
  /*Get all films from DB and build dropdown with their titles*/
  dbController.getAllFilms().then((films) => {
    for (let film of films) {
      $('#select-movie').append(`<option value="${film.id}">${film.title}</option>`)
    }
  });
}

function listenToMovieSelector() {
  $("#select-movie").change(function (e) {
    if (this.value !== "0") {
      buildTicketBookingContainer();
      buildShowingsSelectorDropdown();
      buildUpcomingShowingsSection();
      buildInfoButton();
      listenToShowingSelector();
    } else {
      $(".border").html('');
      init();
    }
  });
}
/*Build the dropdown selector for choosing the specific showing of a movie.
The movie should already be choosen when this is used. */
function buildShowingsSelectorDropdown() {
  if (!$('.showings-selector-dropdown').length) {
    $(".booking-row1-col1").append(`        
      <div class="showings-selector-dropdown">
      </div>`);
  }
  $('.showings-selector-dropdown').html(`        
        <select id="date-and-time">
          <option value="0">Välj Datum och Tid:</option>
        </select>`);
  //We get all upcoming showings of the selected movie
  dbController.getShowings($("#select-movie").val(), 1).then((showings) => {
    for (let showing of showings) {
      $('#date-and-time').append(`
          <option value="${showing.id}">${showing.date} ${showing.time} ${showing.auditorium.name}</option>
          `);
    }
  });
}
function buildUpcomingShowingsSection() {
  /* If .upcoming-showings-container does not exist we create it otherwise we just
  change its contents.*/
  if (!$('.upcoming-showings-container').length) {
    $('.booking-row1-col0').append(`
    <section class="upcoming-showings-container">
    </section>`);
  }
  $('.upcoming-showings-container').html(`
        <h2>Kommande visningar</h2>`);
  dbController.getShowings($("#select-movie").val(), 1).then((showings) => {
    for (let showing of showings) {
      $('.upcoming-showings-container').append(`
          <li value="${showing.id}">${showing.date} ${showing.time} ${showing.auditorium.name}</li>
          `);
    }
  });
}

/* Listen to which showing the user picks*/
function listenToShowingSelector() {
  $(".booking-row1-col1").on('change', "#date-and-time", function (e) {
    $('.cinema-container').html('');
    clearBookingButton();
    clearInputForm();
    let selectedShowingID = $(this).val();
    if (selectedShowingID == "0") {
      return; //do nothing more if first item selected (should just be info text)
    }
    buildCinema();
    seatingsController = dbController.getShowings("ID", parseInt(selectedShowingID))
      .then(showing => {
        seatingsController = new SeatingsController(showing[0]);
        seatingsController.init();
        listenToSeatSelection();
        return seatingsController;
      }).catch(err => {
        console.log(err);
      });
  });
}
/*When the booking button is pressed we update db with a customer/booking/ with data from the 
textfields in form.*/
function listenToBookingButton() {
  $(".button-section").on({
    click: function () {
      let name = $('form :input[id="username"]').val();
      let email = $('form :input[id="email"]').val();
      let phoneNr = $('form :input[id="phonenumber"]').val();
      let customer = new Customer(name, email, phoneNr);
      let showing = seatingsController.showing;
      let tickets = [];
      //tickets are stored in seatingController as Ticket objects
      for (let ticket of seatingsController.tickets) {
        tickets.push(ticket);
      }
      makeBooking(new Booking(showing, tickets, customer));
      seatingsController.reserveSelected();
      seatingsController.clearSeatSelection();
    }
  }, '.general-button');
}
async function makeBooking(booking) {
  let customerID = await dbController.addCustomer(booking.customer);//returning customer?
  booking.customer.id = customerID;
  let bookingID = await dbController.addBooking(booking);
  booking.id = bookingID;
  await dbController.addTickets(booking);
  await dbController.addReservedSeats(booking);
}
function listenToSeatSelection() {
  document.removeEventListener("seat selection updated'", seatsSelected, false);
  // New seat either selected or deselcted.
  document.addEventListener('seat selection updated', seatsSelected, false);
}
/*Seat selection event thrown from seatingsController - a seat has either been
selected or deselected.*/
function seatsSelected() {
  if (seatingsController.selectedSeats.length === 1) {
    buildInputForm();
    buildBookingButton();
    disableBookingButton();
    listenToInputForm();
    listenToBookingButton();
  } else if (seatingsController.selectedSeats.length === 0) {
    clearBookingButton();
    clearInputForm();
  }
  buildSeatNumberCounter();
  buildPriceCounter();
}
function buildPriceCounter() {
  let adult = 0;
  let child = 0;
  let senior = 0;
  let sum = 0;
  for (let ticket of seatingsController.tickets) {
    if (ticket.ticketType === "adult") ++adult;
    else if (ticket.ticketType === "child") ++child;
    else if (ticket.ticketType === "senior") ++senior;
  }
  sum = (Ticket.childPrice * child) + (Ticket.adultPrice * adult) + (Ticket.seniorPrice * senior);
  if ($('.info-input').length) {
    if (!$('.price-counter').length) {
      $('.info-input').append(`<div class="price-counter"></div>`);
    } else {
      $('.price-counter').html('');
    }
    console.log(sum);
    if (child) $('.price-counter').append(`<p>${child}x${Ticket.childPrice}kr Barn</p>`);
    if (adult) $('.price-counter').append(`<p>${adult}x${Ticket.adultPrice}kr Vuxen</p>`);
    if (senior) $('.price-counter').append(`<p>${senior}x${Ticket.seniorPrice}kr Penionär</p>`);
    if (sum) $('.price-counter').append(`<p>Totallt kostnad: ${sum}kr</p>`);
  }
}
/*Lists all the currently selected seats*/
function buildSeatNumberCounter() {
  let seatNumbers = seatingsController.selectedSeats;
  seatNumbers = seatNumbers.join(', ');
  if ($('.info-input').length) {
    if (!$('.seat-counter').length) {
      $('.info-input').append(`<div class="seat-counter">Selected seats:</div>`);
    } else {
      $('.seat-counter').html('Selected seats:');
    }
    $('.seat-counter').append(`<p>${seatNumbers}</p>`);
  }
}
/*Each time input form changes we check if there is information in all fields.*/
function listenToInputForm() {
  $('form input').change(function () {
    if ($('form :input[id="username"]').val() !== ''
      && $('form :input[id="email"]').val() !== ''
      && $('form :input[id="phonenumber"]').val() !== '') {
      enableBookingButton();
    } else {
      disableBookingButton();
    }
  });
}
/*We take in customer data here*/
function buildInputForm() {
  if (!$('.info-input').length) {
    $('.booking-row2').append(`<section class="info-input">
        <form>      
          <label for="username">Namn</label>
          <input type="text" id="username" placeholder="Ditt namn" />
          <br /><br />
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="Din email" />
          <br /><br />
          <label for="phonenumber">Mobilnummer</label>
          <input type="text" id="phonenumber" placeholder="Ditt mobilnummer" />
        </form>
      </section>`);
  }
}
/*This is cleared when no seats are selected */
function clearInputForm() {
  $('.info-input').remove();
}
function buildInfoButton() {
  if (!$('.booking-row1-col2 button').length) {
    $('.booking-row1-col2').append(`<button type="button" value="booking" class="general-button">INFO</button>`);
  }
}
/*Button to finalise the booking process */
function buildBookingButton() {
  if (!$('.button-section').length) {
    $('.booking-row3').append(`<section class="button-section">
        <input
          type="submit"
          class="general-button"
          onclick="alert('Bokning klar!')"
          value="BOKA"
        />
      </section>`);
  }
}
function clearBookingButton() {
  $('.button-section').remove();
}
/*This is were the seats button are located. They are put there in SeatingsController*/
function buildCinema() {
  if (!$('.cinema-container').length) {
    $('.booking-row1-col1').append(`
      <section class="cinema-container">
      </section>`);
  }
  /*We reset the previous contents */
  $('.cinema-container').html('');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="cinema-screen-container"></div>');
  $('.cinema-screen-container').append('<div class="cinema-screen"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');
}
function enableBookingButton() {
  $('.button-section .general-button').removeClass("disabled");
}
function disableBookingButton() {
  $('.button-section .general-button').addClass("disabled");
}