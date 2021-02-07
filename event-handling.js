import SeatingsController from '/script/SeatingsController.js';
let cinemaIsInitiated = false;
$("#date-and-time").change(function (e) {
  if (!cinemaIsInitiated) {
    $('.cinema-container').append('<h2>Platser</div>');
    $('.cinema-container').append('<div class="cinema"></div>');
    $('.cinema').append('<div class="seat-selectors"></div>');
    cinemaIsInitiated = true;
  }
  let valueFromDropdown = $(this).val(); //we should use this later
  let seatingsController = new SeatingsController();
  seatingsController.init();
});