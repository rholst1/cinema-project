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
showingsOfSelectedFilm.set("2020-3-13-17-00-00", showing5);
showingsOfSelectedFilm.set("2020-3-14-17-00-00", showing0);
showingsOfSelectedFilm.set("2020-3-16-18-00-00", showing1);
showingsOfSelectedFilm.set("2020-3-18-19-00-00", showing2);
showingsOfSelectedFilm.set("2020-3-19-19-00-00", showing3);
showingsOfSelectedFilm.set("2020-3-20-17-00-00", showing4);
/*temporary example showings==============ended */

let selectedShowing = null;
let Customers = []; //this should not be here... but where? we might want to
// know which customer booked a particular seat and we might want to see 
//which showings a particular customer has booked
$("#date-and-time").change(function (e) {
  $('.cinema-container').html('');
  let value = $(this).val(); // fix name, showing
  if (value == "0") return;
  $('.cinema-container').append('<h2>Platser</div>');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');

  if ($(this).val() == 0) return; //we should use this later
  let seatingsController = new SeatingsController(showingsOfSelectedFilm.get(value));
  selectedShowing
  seatingsController.init();

  $('.booking-button').on('click', function () {
    let name = $('form :input[id="username"]').val();
    let email = $('form :input[id="email"]').val();
    let phoneNr = $('form :input[id="phonenumber"]').val();
    Customers.push(new Customer(name, email, phoneNr))
    console.log(name);
    console.log(email);
    console.log(phoneNr);
    seatingsController.reserveSelected();
  });
});
function getDateFromString(dateDropDown) {
  dateDropDown = dateDropDown.split(' '); //should be {month, hh:mm}
  time = dateDropDown[2].split(':'); //should be {hh, mm}
  hour = time[0];
  minute = time[1];
  day = dateDropDown[0];
  //13 Mars 17:00
}
