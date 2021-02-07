import SeatingsController from '/script/SeatingsController.js';
let cinemaIsInitiated = false;
$("#date-and-time").change(function (e) {
  if (!cinemaIsInitiated) {
    $('.border').append('<div class="cinema-seats"</div>');
    $('.cinema-seats').append('<div class="seat-selectors"</div>');
    cinemaIsInitiated = true;
  }
  let valueFromDropdown = $(this).val(); //we should use this later
  let seatingsController = new SeatingsController();
  seatingsController.init();
});