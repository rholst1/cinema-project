import Cinema from '/script/Cinema.js';
/*saving color during hover effect*/
let color;
/* create cinema with given row lengths */
let cinema = new Cinema([24, 20, 20, 20, 20, 20, 18]);
/*We save our selected seats for ease of access*/
let selectedSeats = [];
/*create html code for our cinema*/
populateCinemaGUI(cinema);
/* */
$('.seat-selectors').on('click', 'button', function () {
  let seat = $(this).val();
  let newSeatStatus = cinema.toggleSeatValue(seat);
  if ((newSeatStatus).localeCompare("free") == 0) {
    $(`:button[value="${seat}"]`).css('background-color', 'gray');
    color = $(this).css('background-color');
    selectedSeats.splice(selectedSeats.indexOf(seat), 1);
  } else if ((newSeatStatus).localeCompare("selected") == 0) {
    $(`:button[value="${seat}"]`).css('background-color', 'yellow');
    color = $(this).css('background-color');
    selectedSeats.push(seat);
  }
  console.log(selectedSeats);
});

$('.seat-selectors').on('mouseover', 'button', function () {
  color = $(this).css('background-color');
  $(this).css('background-color', '#e3dada');
});

$('.seat-selectors').on('mouseleave', 'button', function () {
  $(this).css('background-color', color);
});

function populateCinemaGUI(cinema) {
  //clear .seat-selectors before we update it
  $('.seat-selectors').html('');
  console.log(cinema.maxRowWidth);
  for (let row = 0; row < cinema.rows.length; row++) {
    for (let col = 0; col < cinema.rows[row].columns.length; col++) {
      $('.seat-selectors').append(`<button type="button" value="${col}_${row}"></button>`);
    }
    $('.seat-selectors').append('<br>');
  }
}
