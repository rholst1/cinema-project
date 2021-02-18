import Customer from '/script/Customer.js';
import Showing from '/script/Showing.js';
import SeatingsController from '/script/SeatingsController.js';
import Auditorium from '/script/Auditorium.js';

/*temporary example showings*/
let cinema0 = new Auditorium([24, 20, 20, 20, 20, 20, 18], "cinema1");
let cinema1 = new Auditorium([14, 16, 18, 19, 18, 16, 14], "cinema2");
let cinema2 = new Auditorium([10, 10, 10, 8], "cinema3");

let showing0 = new Showing(cinema0, 'untitled-film', new Date(2020, 3, 14, 17, 0, 0));
let showing1 = new Showing(cinema1, 'untitled-film', new Date(2020, 3, 16, 18, 0, 0));
let showing2 = new Showing(cinema2, 'untitled-film', new Date(2020, 3, 18, 19, 0, 0));
let showing3 = new Showing(cinema0, 'untitled-film', new Date(2020, 3, 19, 19, 0, 0));
let showing4 = new Showing(cinema1, 'untitled-film', new Date(2020, 3, 20, 17, 0, 0));
let showing5 = new Showing(cinema2, 'untitled-film', new Date(2020, 3, 13, 17, 0, 0));

let showingsOfSelectedFilm = new Map();
let seatingsController = null;

showingsOfSelectedFilm.set("2020-3-14-17-00-00", showing0);
showingsOfSelectedFilm.set("2020-3-16-18-00-00", showing1);
showingsOfSelectedFilm.set("2020-3-18-19-00-00", showing2);
showingsOfSelectedFilm.set("2020-3-19-19-00-00", showing3);
showingsOfSelectedFilm.set("2020-3-20-17-00-00", showing4);
showingsOfSelectedFilm.set("2020-3-13-17-00-00", showing5);
/*temporary example showings==============ended */

/*The showing we are viewing right now - todo will probably change this with db-integration*/
let selectedShowing = null;
let Customers = []; /*this should not be here... but where? we might want to know which 
customer booked a particular seat and we might want to see which showings a particular 
customer has booked*/
init();

function init() {
  buildMoviePickerDropdown();
  listenToMovieSelector();
}


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

function buildMoviePickerDropdown() {
  $('.border').html(`
  <div class="booking-row0"></div>
  `);
  $('.booking-row0').html(`
  <div class="movie-picker-dropdown">
      <select id="select-movie">
        <option value="0">Välj film:</option>
        <option value="movie1">Lorem ipsum dolor sit.</option>
        <option value="movie2">Lorem ipsum dolor sit amet.</option>
        <option value="movie3">Lorem ipsum dolor sit amet consectetur.</option>
        <option value="movie4">Lorem ipsum dolor sit.</option>
        <option value="movie5">Lorem ipsum dolor sit amet consectetur.</option>
        <option value="movie6">Lorem, ipsum dolor.</option>
      </select>
  </div>`);
}

function listenToMovieSelector() {
  $("#select-movie").change(function (e) {
    if (this.value !== "0") {
      buildTicketBookingContainer();
      buildShowingsPickerDropdown();
      buildUpcomingShowingsSection();
      buildInfoButton();
      listenToShowingSelector();
    } else {
      $(".border").html('');
      init();
    }
  });
}
function buildShowingsPickerDropdown() {
  if (!$('.showings-picker-dropdown').length) {
    $(".booking-row1-col1").append(`        
      <div class="showings-picker-dropdown">
      </div>`);
  }
  $('.showings-picker-dropdown').html(`        
        <select id="date-and-time">
          <option value="0">Välj Datum och Tid:</option>
          <option value="2020-3-13-17-00-00">13 Mars 17:00</option>
          <option value="2020-3-14-17-00-00">14 Mars 17:00</option>
          <option value="2020-3-16-18-00-00">16 Mars 18:00</option>
          <option value="2020-3-18-19-00-00">18 Mars 19:00</option>
          <option value="2020-3-19-19-00-00">19 Mars 19:00</option>
          <option value="2020-3-20-17-00-00">20 Mars 17:00</option>
        </select>`);
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
        <h2>Kommande visningar</h2>
        <li class="hoverable">Lorem, ipsum dolor.</li>
        <li class="hoverable"> Quam, exercitationem doloremque!</li>
        <li class="hoverable">At, sint voluptatibus.</li>
        <li class="hoverable">Officiis, ab maiores!</li>
        <li class="hoverable">Eligendi, alias aperiam!</li>
        <li class="hoverable">Quo, sunt similique.</li>
        <li class="hoverable">Quia, nobis quos.</li>
        <li class="hoverable">Itaque, quasi totam?</li>
        <li class="hoverable">Culpa, molestiae delectus.</li>
        <li class="hoverable">Dicta, veritatis distinctio!</li>`);
}

/* Listen to which showing the user picks*/
function listenToShowingSelector() {
  $(".booking-row1-col1").on('change', "#date-and-time", function (e) {
    $('.cinema-container').html('');
    clearBookingButton();
    clearInputForm();
    let showingsPickerDropdownValue = $(this).val();
    if (showingsPickerDropdownValue == "0") {
      return;
    } //do nothing more if first item selected (should just be info text)
    buildCinema();
    selectedShowing = showingsOfSelectedFilm.get(showingsPickerDropdownValue);
    seatingsController = new SeatingsController(selectedShowing);
    seatingsController.init();
    listenToSeatSelection();

  });
}
function listenToBookingButton() {
  $(".button-section").on({
    click: function () {
      let name = $('form :input[id="username"]').val();
      let email = $('form :input[id="email"]').val();
      let phoneNr = $('form :input[id="phonenumber"]').val();
      Customers.push(new Customer(name, email, phoneNr))
      seatingsController.reserveSelected();
      seatingsController.clearSeatSelection();
    }
  }, '.general-button');
}
function listenToSeatSelection() {
  document.removeEventListener("seat selection updated'", seatsSelected, false);
  // New seat either selected or deselcted.
  document.addEventListener('seat selection updated', seatsSelected, false);
}
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
  /*todo this should not be done here*/
  let seatNumbers = []
  for (let seat of seatingsController.selectedSeats) {
    let seatCoordinate = selectedShowing.getSeatCoordinates(seat);
    let column = seatCoordinate[0];
    let row = seatCoordinate[1];
    let seatNumber = 0;
    for (let i = 0; i < row; i++) {
      seatNumber += selectedShowing.auditorium.seatsPerRow[i];
    }
    seatNumbers.push(seatNumber + column);
  }
  buildSeatNumberCounter(seatNumbers);
}
/*todo join*/
function buildSeatNumberCounter(seatNumbers) {
  if ($('.info-input').length) {
    if (!$('.seat-counter').length) {
      $('.info-input').append(`<div class="seat-counter">Selected seats:</div>`);
    } else {
      $('.seat-counter').html('Selected seats:');
    }
    $('.seat-counter').append('<p></p>');
    for (let i = 0; i < seatNumbers.length; i++) {
      $('.seat-counter p').append(`${seatNumbers[i]}`);
      if (i < (seatNumbers.length - 1)) {
        $('.seat-counter p').append(`, `);
      }
    }
  }
}
/*Each time input form changes we check if there is information in all fields.
Later on we'll probably want to havve more specific conditions.*/
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
function clearInputForm() {
  $('.info-input').remove();
}
function buildInfoButton() {
  if (!$('.booking-row1-col2 button').length) {
    $('.booking-row1-col2').append(`<button type="button" value="booking" class="general-button">INFO</button>`);
  }
}
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
function buildCinema() {
  /*If .cinema-container does not exist we create it. */
  if (!$('.cinema-container').length) {
    $('.booking-row1-col1').append(`
      <section class="cinema-container">
      </section>`);
  }
  /*We reset the previous contents while seating the header. */
  $('.cinema-container').html(/*'<h2>Platser</h2>'*/'');
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