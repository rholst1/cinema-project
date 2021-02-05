import Cinema from '/Cinema.js';
//create a cinema with 4x4 seats
let cinema = new Cinema([5, 4, 7, 4]);
populateCinemaGUI(cinema);





function populateCinemaGUI(cinema) {
  //clear .seat-selectors before we update it
  $('.seat-selectors').html('');
  //How many columns does the cinema have?
  //$('.seat-selectors').css('grid-template-columns', `repeat(${cinema.maxRowWidth}, 1fr)`);
  console.log(cinema.maxRowWidth);

  for (let row = 0; row < cinema.seatings.length; row++) {
    for (let col = 0; col < cinema.seatings[row].columns.length; col++) {
      $('.seat-selectors').append(`<button type="button" value="${col}_${row}">${col}_${row}</button>`);

    }
    $('.seat-selectors').append('<br>');
  }
}
