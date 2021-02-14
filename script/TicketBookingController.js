import Customer from '/script/Customer.js';
import Cinema from '/script/Cinema.js';
import Showing from '/script/Showing.js';
import SeatingsController from '/script/SeatingsController.js';

/*temporary example showings*/
let cinema0 = new Cinema([24, 20, 20, 20, 20, 20, 18], "cinema1");
let cinema1 = new Cinema([14, 16, 18, 19, 18, 16, 14], "cinema2");
let cinema2 = new Cinema([10, 10, 10, 8], "cinema3");

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
  buildContainer();
  buildSelectorContainer();
  buildMoviePickerDropdown();
  listenToMovieSelector();
  listenToShowingSelector();
}
function buildContainer() {
  $('.border').append(`
  <article class="ticketbooking-container"></article>`);
}
function buildSelectorContainer() {
  $('.ticketbooking-container').append(`
  <div class="showing-selector-dropdowns"></div>`);
}
function buildMoviePickerDropdown() {
  $('.showing-selector-dropdowns').append(`
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
    $(".showing-selector-dropdowns #date-and-time").remove();
    $(".showing-selector-dropdowns").append(`        
      <div class="showings-picker-dropdown">
        <select id="date-and-time">
          <option value="0">Välj Datum och Tid:</option>
          <option value="2020-3-13-17-00-00">13 Mars 17:00</option>
          <option value="2020-3-14-17-00-00">14 Mars 17:00</option>
          <option value="2020-3-16-18-00-00">16 Mars 18:00</option>
          <option value="2020-3-18-19-00-00">18 Mars 19:00</option>
          <option value="2020-3-19-19-00-00">19 Mars 19:00</option>
          <option value="2020-3-20-17-00-00">20 Mars 17:00</option>
        </select>
      </div>`);
    $('.ticketbooking-container').append(`
    <section class="upcoming-showings-container">
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
        <li class="hoverable">Dicta, veritatis distinctio!</li>
      </section>
      <section class="cinema-container"></section>`);
  });
}


/* Listen to which showing the user picks*/
function listenToShowingSelector() {
  $(".showing-selector-dropdowns").on('change', "#date-and-time", function (e) {
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
  }, '.generalButton');
}
function listenToSeatSelection() {
  document.removeEventListener("selecting", seatsSelected, false);
  document.removeEventListener("deselecting", seatsDeselected, false);
  // First seat is selected
  document.addEventListener('selecting', seatsSelected, false);
  // Last seat is deselected
  document.addEventListener('deselecting', seatsDeselected, false);
}
function seatsSelected() {
  buildInputForm();
  buildBookingButton();
  listenToInputForm();
  listenToBookingButton();
}
function seatsDeselected() {
  clearBookingButton();
  clearInputForm();
}
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
  $('.border').append(`<section class="info-input">
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
function clearInputForm() {
  $('.info-input').remove();
}
function buildBookingButton() {
  $('.border').append(`<section class="button-section">
        <input
          type="submit"
          class="generalButton hoverable"
          disabled
          onclick="alert('Bokning klar!')"
          value="BOKA"
        />
      </section>`);
}
function clearBookingButton() {
  $('.button-section').remove();
}
function buildCinema() {
  $('.cinema-container').append('<h2>Platser</h2>');
  $('.cinema-container').append('<div class=cinema-screen-container></div>');
  $('.cinema-screen-container').append('<div class=cinema-screen></div>');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');
}
function enableBookingButton() {
  $('.button-section .generalButton').prop('disabled', false);
  $('.button-section .generalButton').css('pointer-events', 'all');
  $('.button-section .generalButton').css('opacity', '1');
}
function disableBookingButton() {
  $('.button-section .generalButton').prop('disabled', true);
  $('.button-section .generalButton').css('pointer-events', 'none');
  $('.button-section .generalButton').css('opacity', '0.3');
}