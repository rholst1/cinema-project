import Ticket from '/script/Ticket.js';
import Showing from '/script/Showing.js';

export default class SeatingsController {

  /*showing of type Showing*/
  constructor(showing, databaseController) {
    /*We save our selected seats for ease of access*/
    this.selectedSeats = [];
    /*which showing are we viewing right now?*/
    this.showing = showing;
    /**/
    this.tickets = []
    /*Event for selection of first seat*/
    this.seatSelectionEvent = new Event('seat selection updated');
  }
  init() {
    /*create html code for our cinema*/
    this._buildCinemaGUI(this.showing.auditorium);
    this._markReservedSeats(this.showing);
    /*Save parent (the SeatingsController object we're in) as
    ".this" will be rereferenced when entering listener functions.*/
    parent = this;
    /*We delegate handling of the three different interactions (mouseeneter, 
      mouseleave,click) to corresponding methods*/
    $(".seat-selectors").on({
      /*mouseenter: parent._activateCinemaButtonHover,
      mouseleave: parent._deactivateCinemaButtonHover,*/
      click: parent._activateCinemaButton
    }, '.cinema-button');
  }
  /* Lower button opacity on mouseover event. */
  _activateCinemaButtonHover() {
    $(this).css('opacity', '0.6');
  }
  /* Reset button opacity on mouseleave event. */
  _deactivateCinemaButtonHover() {
    $(this).css('opacity', '1');
  }
  _activateCinemaButton() {
    /* Listen click on seat-buttons. */
    let seat = parseInt($(this).val());
    /* We get string telling us the new status of seat(selected,free,reserved) 
    and update backend.*/
    let newSeatStatus = parent.showing.toggleSeatValue(seat);
    /* If new status is free or selected we change button color */
    if ((newSeatStatus).localeCompare("free") == 0) {
      $(`:button[value="${seat}"]`).css('background-color', 'var(--seat-free)');
      //color = $(this).css('background-color');
      parent.selectedSeats.splice(parent.selectedSeats.indexOf(seat), 1);
      //dispatch event if seats are deselected
      document.dispatchEvent(parent.seatSelectionEvent);
    } else if ((newSeatStatus).localeCompare("selected") == 0) {
      $('.dropdown-content').remove();
      /*TODO make it less ugly :D The following part adds a drop down when clicking a cinemabutton
          the drop down contains 3 buttons corresponding to the 3 types of tickets.*/
      $(this).append(`<div class="dropdown-content">
          <button type="button" value="child" class="dropbtn general-button">Barn</button>
          <button type="button" value="adult" class="dropbtn general-button">Vuxen</button>
          <button type="button" value="senior" class="dropbtn general-button">Pensionär</button>
        </div>`);
      this.parent = parent;
      this.seat = seat;
      $(".dropbtn").on('click', function () {
        parent.tickets.push(new Ticket(seat, $(this).val()));
        parent.selectedSeats.push(seat);
        document.dispatchEvent(parent.seatSelectionEvent);
        $('.dropdown-content').remove();
      })
      $(".dropdown-content").on('mouseleave', function () {
        $('.dropdown-content').remove();
      })
      $(`:button[value="${seat}"]`).css('background-color', 'var(--seat-selected)');
      //dispatch event if new seats are selected

    }

  }
  /* Populates html with buttons and row breaks visually corresponding to a Cinema object. */
  _buildCinemaGUI(auditorium) {
    let seatNumber = 0;
    for (let row = 0; row < auditorium.seatsPerRow.length; row++) {
      for (let col = 0; col < auditorium.seatsPerRow[row]; col++) {
        $('.seat-selectors').append(`<button type="button" value="${seatNumber++}" class="cinema-button"></button>`);
      }
      $('.seat-selectors').append('<br>');
    }
  }
  /* We find mark seats as reserved according to the corresponding property in the
  Showing object)*/
  _markReservedSeats(showing) {
    for (let seat of showing.seats) {
      if ((seat.seatStatus).localeCompare("reserved") === 0) {
        $(`:button[value="${seat.seatNumber}"]`).css('background-color', 'var(--seat-reserved)');
        $(`:button[value="${seat.seatNumber}"]`).prop('disabled', true);
      }
    }
  }
  /* Reserve all seats that are in the selectedSeats array. clearSeatSelection() should be
  called afterwards for expected behaviour. */
  reserveSelected() {
    for (let selectedSeat of this.selectedSeats) {
      this.showing.reserveSeat(selectedSeat);
      $(`:button[value="${selectedSeat}"]`).css('background-color', 'var(--seat-reserved)');
      $(`:button[value="${selectedSeat}"]`).prop('disabled', true);
    }
  }
  /*Clear selectedSeats array and notify observers that the array is empty.*/
  clearSeatSelection() {
    this.selectedSeats.length = 0;
    document.dispatchEvent(this.seatSelectionEvent);
  }

}