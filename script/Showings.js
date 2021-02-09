import Seat from "/script/Seat.js";

export default class Showings {
  constructor(auditorium, film, date, reservedSeats) {
    this.auditorium = auditorium; // Cinema
    this.film = film;
    this.date = date; // Date
    this.seats = [];
    for (let row of auditorium.seatsPerRow) {
      for (let col = 0; 0 < row; col++) {
        this.seats.push(new Seat("free", col, row));
      }
    }
    if (reservedSeats != undefined) {
      for (let reservedSeat of reservedSeats) {
        let seatArray = seat.split('_');
        let col = parseInt(seatArray[0]);
        let row = parseInt(seatArray[1]);
        for (let seat of this.seats) {
          if (seat.column === col && seat.row === row) {
            seat.setSeatStatus("reserved");
          }
          break;
        }
      }
    }
  }
}