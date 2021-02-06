import Cinema from '/script/Cinema.js';

/* create cinema with given row lengths */
let cinema = new Cinema([24, 20, 20, 20, 20, 20, 18]);
/*We save our selected seats for ease of access*/
let selectedSeats = [];
/*create html code for our cinema*/
populateCinemaGUI(cinema);
/* Listen click on seat-buttons. */
$('.seat-selectors').on('click', 'button', function () {
  let seat = $(this).val();
  /* We get string telling us the new status of seat(selected,free,reserved) 
  and update backend.*/
  let newSeatStatus = cinema.toggleSeatValue(seat);
  /* If new status is free or selected we change button color */
  if ((newSeatStatus).localeCompare("free") == 0) {
    $(`:button[value="${seat}"]`).css('background-color', 'gray');
    //color = $(this).css('background-color');
    selectedSeats.splice(selectedSeats.indexOf(seat), 1);
  } else if ((newSeatStatus).localeCompare("selected") == 0) {
    $(`:button[value="${seat}"]`).css('background-color', 'yellow');
    selectedSeats.push(seat);
  }
});
/* Lower button opacity on mouseover event. */
$('.seat-selectors').on('mouseover', 'button', function () {
  $(this).css('opacity', '0.8');
});
/* Reset button opacity on mouseleave event. */
$('.seat-selectors').on('mouseleave', 'button', function () {
  $(this).css('opacity', '1');
});
/* Parses Seat objects in Cinema/SeatRow and adds buttons and row breaks to the .html. */
function populateCinemaGUI(cinema) {
  //clear .seat-selectors before we update it
  $('.seat-selectors').html('');
  for (let row = 0; row < cinema.rows.length; row++) {
    for (let col = 0; col < cinema.rows[row].columns.length; col++) {
      $('.seat-selectors').append(`<button type="button" value="${col}_${row}"></button>`);
    }
    $('.seat-selectors').append('<br>');
  }
}
