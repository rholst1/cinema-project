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

let selectedShowing = null;
let Customers = []; //this should not be here... but where? we might want to
// know which customer booked a particular seat and we might want to see 
//which showings a particular customer has booked
$("#date-and-time").change(function (e) {





  $('.cinema-container').html('');
  clearBookingButton();
  clearInputForm();
  let value = $(this).val(); // fix name, showing
  if (value == "0") {
    return;
  } //do nothing more if first item selected (should just be info text)
  buildCinema();
  selectedShowing = showingsOfSelectedFilm.get(value);
  seatingsController = new SeatingsController(selectedShowing);
  seatingsController.init();
  listenToSeatSelection();

});
function listenToBookingButton() {
  $(".button-section").on({
    click: function () {
      let name = $('form :input[id="username"]').val();
      let email = $('form :input[id="email"]').val();
      let phoneNr = $('form :input[id="phonenumber"]').val();
      Customers.push(new Customer(name, email, phoneNr))
      seatingsController.reserveSelected();
      seatingsController.clearSeatSelection();
    },
    mouseenter: function () {
      $(this).css('background-color', 'var(--hover)');
      $(this).css('border', '1px solid var(--hover)');
    },
    /* Reset button opacity on mouseleave event. */
    mouseleave: function () {
      $(this).css('background-color', 'var(--accent)');
      $(this).css('border', '1px solid var(--accent)');
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
  //$('.seat-selectors').append(`<button type="button" value="${col}_${row}" class="cinema-button"></button>`);
  //$(`:button[value="${seat.column}_${seat.row}"]`).css('background-color', 'rgb(104, 12, 190)');
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
          class="generalButton"
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