import Seat from "/script/Seat.js";
import Auditorium from "/script/Auditorium.js";

export default class Showing {
  constructor(auditorium, film, date, time, id, reservedSeats) {
    this.auditorium = auditorium;
    this.film = film;
    this.date = date;
    this.time = time;
    this.id = id;
    /*this.date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.time = date.getHours() + '.' + date.getMinutes();*/
    this.seats = [];
    let seatNumber = 0;
    for (let row = 0; row < this.auditorium.seatsPerRow.length; row++) {
      for (let col = 0; col < this.auditorium.seatsPerRow[row]; col++) {

        if ((reservedSeats !== undefined) && reservedSeats.includes(seatNumber)) {
          this.seats.push(new Seat("reserved", seatNumber++));
        } else {
          this.seats.push(new Seat("free", seatNumber++));
        }
      }
    }
  }

  getSeatValue(seatNumber) {
    return this.getSeat(seatNumber);
  }
  getSeat(seatNumber) {
    let seat = this.seats.find(seat => seat.seatNumber === seatNumber);
    return seat;
  }
  reserveSeat(seatNumber) {
    let seat = this.getSeat(seatNumber);
    seat.setSeatStatus("reserved");
  }
  resetSeat(seatNumber) {
    let seat = this.getSeat(seatNumber);
    seat.setSeatStatus("free");
  }

  toggleSeatValue(seatNumber) {
    let seat = this.getSeat(seatNumber);
    if ((seat.seatStatus).localeCompare("free") == 0) {
      seat.setSeatStatus("selected");
      return "selected";
    } else if ((seat.seatStatus).localeCompare("selected") == 0) {
      seat.setSeatStatus("free");
      return "free";
    } else {
      return "reserved";
    }
  }
  toString() {
    return JSON.stringify(this, null, '');
  }
}