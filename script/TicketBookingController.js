import Customer from '/script/Customer.js';
import Showing from '/script/Showing.js';
import SeatingsController from '/script/SeatingsController.js';
import DatabaseController from '/script/DatabaseController.js';
import Auditorium from '/script/Auditorium.js';
import Film from '/script/Film.js';


let dbController = new DatabaseController();
let seatingsController = null;

/*temporary example showings==============ended */

/*The showing we are viewing right now - todo will probably change this with db-integration*/


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
      </select>
  </div>`);
  /*Get all films from DB and build dropdown with their titles*/
  (async () => {
    let films = await dbController.getAllFilms();
    for (let film of films) {
      $('#select-movie').append(`<option value="${film.id}">${film.title}</option>`)
    }
  })();
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
/*Build the dropdown selector for choosing the specific showing of a movie.
The movie should already be choosen when this is used. */
function buildShowingsPickerDropdown() {
  if (!$('.showings-picker-dropdown').length) {
    $(".booking-row1-col1").append(`        
      <div class="showings-picker-dropdown">
      </div>`);
  }
  $('.showings-picker-dropdown').html(`        
        <select id="date-and-time">
          <option value="0">Välj Datum och Tid:</option>
          </select>`);
  (async () => {
    let showings = await dbController.getShowings($("#select-movie").val(), 1);
    for (let showing of showings) {
      if (showing.auditorium != undefined) {
        $('#date-and-time').append(`
          <option value="${showing.id}">${showing.date} ${showing.time} ${showing.auditorium.name}</option>
          `);
      }
    }
  })();
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
    let selectedShowingID = $(this).val();
    if (selectedShowingID == "0") {
      return;
    } //do nothing more if first item selected (should just be info text)
    buildCinema();


    seatingsController = dbController.getShowings("ID", parseInt(selectedShowingID))
      .then(showing => {
        seatingsController = new SeatingsController(showing[0]);
        seatingsController.init();
        listenToSeatSelection();
        return seatingsController;
      }).catch(err => {
      });
  });
}
/*When the booking button is pressed we update db with a customer with data from the 
textfields in form. TODO create a Booking/Tickets */
function listenToBookingButton() {
  $(".button-section").on({
    click: function () {
      let name = $('form :input[id="username"]').val();
      let email = $('form :input[id="email"]').val();
      let phoneNr = $('form :input[id="phonenumber"]').val();
      (async () => {
        await dbController.addCustomer(new Customer(name, email, phoneNr));
      })();
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
    let seatCoordinate = seatingsController.showing.getSeatCoordinates(seat);
    let column = seatCoordinate[0];
    let row = seatCoordinate[1];
    let seatNumber = 0;
    for (let i = 0; i < row; i++) {
      seatNumber += seatingsController.showing.auditorium.seatsPerRow[i];
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