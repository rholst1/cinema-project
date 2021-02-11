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
  if (value == "0") return; //do nothing more if first item selected (should just be info text)
  $('.cinema-container').append('<h2>Platser</div>');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');

  selectedShowing = showingsOfSelectedFilm.get(value);
  seatingsController = new SeatingsController(selectedShowing);
  seatingsController.init();

  $('form input').change(function () {
    //todo tidy up
    if ($('form :input[id="username"]').val() !== '' && $('form :input[id="email"]').val() !== '' && $('form :input[id="phonenumber"]').val() !== '') {
      $('.button-section .generalButton').prop('disabled', false);
    } else {
      $('.button-section .generalButton').prop('disabled', true);
    }
  });


  $('.button-section .generalButton').on('click', function () {
    let name = $('form :input[id="username"]').val();
    let email = $('form :input[id="email"]').val();
    let phoneNr = $('form :input[id="phonenumber"]').val();
    console.log('');
    Customers.push(new Customer(name, email, phoneNr))
    seatingsController.reserveSelected();
  });
});

