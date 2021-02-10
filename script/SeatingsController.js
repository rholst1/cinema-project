import Cinema from '/script/Cinema.js';
import Showing from '/script/Showing.js';

export default class SeatingsController {

  constructor() {
    /* create cinema with given row lengths */
    let cinema = new Cinema([24, 20, 20, 20, 20, 20, 18], "untitled-cinema");
    /*We save our selected seats for ease of access*/
    this.selectedSeats = [];
    this.showing = new Showing(cinema, 'untitled-film', new Date(1995, 11, 17, 3, 24, 0));
  }

  /* Populates html with buttons and row breaks visually corresponding to a Cinema object. */
  populateCinemaGUI(cinema) {
    for (let row = 0; row < cinema.seatsPerRow.length; row++) {
      for (let col = 0; col < cinema.seatsPerRow[row]; col++) {
        $('.seat-selectors').append(`<button type="button" value="${col}_${row}" class="cinema-button"></button>`);
      }
      $('.seat-selectors').append('<br>');
    }
  }
  showSeatStatusCinemaGUI(showing) {
    for (let seat of showing.seats) {
      if ((seat.getSeatStatus()).localeCompare("reserved") == 0) {
        $(`:button[value="${col}_${row}"]`).css('background-color', 'rgb(104, 12, 190)');
      }
    }
  }
  init() {
    /*create html code for our cinema*/
    this.populateCinemaGUI(this.showing.auditorium);
    this.showSeatStatusCinemaGUI(this.showing);
    /*TODO can I reach these without re-referencing them here? */
    let showing = this.showing;
    let selectedSeats = this.selectedSeats;
    /* Listen click on seat-buttons. */
    $('.seat-selectors').on('click', '.cinema-button', function () {
      let seat = $(this).val();
      /* We get string telling us the new status of seat(selected,free,reserved) 
      and update backend.*/
      let newSeatStatus = showing.toggleSeatValue(seat);
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