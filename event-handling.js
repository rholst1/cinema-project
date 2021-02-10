import SeatingsController from '/script/SeatingsController.js';

$("#date-and-time").change(function (e) {
  $('.cinema-container').html('');
  $('.cinema-container').append('<h2>Platser</div>');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');

  let valueFromDropdown = $(this).val(); //we should use this later
  let seatingsController = new SeatingsController();
  seatingsController.init();

  $('.booking-button').on('click', function () {
    let name = $('form :input[id="username"]').val();
    let email = $('form :input[id="email"]').val();
    let phoneNr = $('form :input[id="phonenumber"]').val();
    console.log(name);
    console.log(email);
    console.log(phoneNr);
    seatingsController.reserveSelected();
  });
});
