import SeatingsController from '/script/SeatingsController.js';

$("#date-and-time").change(function (e) {
  $('.cinema-container').html('');
  $('.cinema-container').append('<h2>Platser</div>');
  $('.cinema-container').append('<div class="cinema"></div>');
  $('.cinema').append('<div class="seat-selectors"></div>');

  let valueFromDropdown = $(this).val(); //we should use this later
  let seatingsController = new SeatingsController();
  seatingsController.init();
});