import Cinema from '/script/Cinema.js';

export default class SeatingsController {

  constructor() {
    /* create cinema with given row lengths */
    this.cinema = new Cinema([24, 20, 20, 20, 20, 20, 18], null, "untitled", true);
    /*We save our selected seats for ease of access*/
    this.selectedSeats = [];
  }

  /* Parses Seat objects in Cinema/SeatRow and adds buttons and row breaks to the .html. */
  populateCinemaGUI(cinema) {
    //clear .seat-selectors before we update it
    for (let row = 0; row < cinema.rows.length; row++) {
      for (let col = 0; col < cinema.rows[row].columns.length; col++) {
        $('.seat-selectors').append(`<button type="button" value="${col}_${row}" class="cinema-button"></button>`);
        if ((cinema.rows[row].columns[col].getSeatStatus()).localeCompare("reserved") == 0) {
          $(`:button[value="${col}_${row}"]`).css('background-color', 'rgb(104, 12, 190)');
        }
      }
      $('.seat-selectors').append('<br>');
    }
  }
  init() {
    /*create html code for our cinema*/
    this.populateCinemaGUI(this.cinema);
    /*TODO can I reach these without re-referencing them here? */
    let cinema = this.cinema;
    let selectedSeats = this.selectedSeats;
    /* Listen click on seat-buttons. */
    $('.seat-selectors').on('click', '.cinema-button', function () {
      let seat = $(this).val();
      /* We get string telling us the new status of seat(selected,free,reserved) 
      and update backend.*/
      let newSeatStatus = cinema.toggleSeatValue(seat);
      /* If new status is free or selected we change button color */
      if ((newSeatStatus).localeCompare("free") == 0) {
        $(`:button[value="${seat}"]`).css('background-color', 'ghostwhite');
        //color = $(this).css('background-color');
        selectedSeats.splice(selectedSeats.indexOf(seat), 1);
      } else if ((newSeatStatus).localeCompare("selected") == 0) {
        $(`:button[value="${seat}"]`).css('background-color', 'rgb(13, 63, 126)');
        selectedSeats.push(seat);
      }
    });
    /* Lower button opacity on mouseover event. */
    $('.seat-selectors').on('mouseover', '.cinema-button', function () {
      $(this).css('opacity', '0.8');
    });
    /* Reset button opacity on mouseleave event. */
    $('.seat-selectors').on('mouseleave', '.cinema-button', function () {
      $(this).css('opacity', '1');
    });
  }
}