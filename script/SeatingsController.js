
import Cinema from '/script/Cinema.js';
import Showing from '/script/Showing.js';

export default class SeatingsController {
  /*showing of type Showing*/
  constructor(showing) {
    /*We save our selected seats for ease of access*/
    this.selectedSeats = [];
    /*which showing are we viewing right now?*/
    this.showing = showing;
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
        $(`:button[value="${seat.column}_${seat.row}"]`).css('background-color', 'rgb(104, 12, 190)');
      }
    }
  }
  reserveSelected() {
    console.log("we're here!");
    for (let selectedSeat of this.selectedSeats) {
      this.showing.reserveSeat(selectedSeat);
      $(`:button[value="${selectedSeat}"]`).css('background-color', 'rgb(104, 12, 190)');
    }
  }

}