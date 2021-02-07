import SeatingsController from '/script/SeatingsController.js';

$("#date-and-time").change(function (e) {
  let valueFromDropdown = $(this).val();
  let seatingsController = new SeatingsController();
  seatingsController.init();
});