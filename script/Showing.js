import Seat from "/script/Seat.js";
import Auditorium from "/script/Auditorium.js";

export default class Showing {
  constructor(auditorium, film, date, time, id, reservedSeats) {
    this.auditorium = auditorium;
    this.film = film;
    this.date = date;
    this.time = time;
    /*this.date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this.time = date.getHours() + '.' + date.getMinutes();*/
    this.seats = [];
    let seatNumber = 0;
    for (let row = 0; row < this.auditorium.seatsPerRow.length; row++) {
      for (let col = 0; col < this.auditorium.seatsPerRow[row]; col++) {
        this.seats.push(new Seat("free", seatNumber++));
      }
    }
    this.id = null;
    if (id != undefined) {
      this.id = id;
    }
    if (reservedSeats != undefined) {
      for (let reservedSeat of reservedSeats) {
        let seatArray = this.getSeatCoordinates(reservedSeat);
        let col = seatArray[0];
        let row = seatArray[1];
        seat = this.getSeat(col, row);
        seat.setSeatStatus("reserved");
      }
    }
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Returns cordinates as array {x,y}. */
  getSeatCoordinates(seat) {
    let seatArray = seat.split('_');
    let col = parseInt(seatArray[0]);
    let row = parseInt(seatArray[1]);
    return [col, row];
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Returns seat booked status as boolean. */
  getSeatValue(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];
    for (let seat of this.seats) {
      if (seat.column === col && seat.row === row) {
        return seat.getSeatCoordinates();
      }
    }
  }
  getSeat(col, row) {
    let seatNumber = this.getSeatNumberFromCoordinates(col, row);
    for (let seat of this.seats) {
      if (seat.seatNumber == seatNumber) {
        return seat;
      }
    }
  }
  getSeatNumberFromCoordinates(column, row) {
    let seatNumber = 0;
    for (let i = 0; i < row; i++) {
      seatNumber += this.auditorium.seatsPerRow[i];
    }
    seatNumber += column;
    return seatNumber;
  }
  getSeatCoordinatesFromSeatNumber(seatNumber) {
    let column = seatNumber;
    let row = 0;
    for (row; row < this.auditorium.seatsPerRow.length; row++) {
      if (column < seatsPerRow[row]) break;
      column -= seatsPerRow[row];
    }
    return [column, row];
  }
  reserveSeat(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];
    seat = this.getSeat(col, row);
    seat.setSeatStatus("reserved");
  }
  resetSeat(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];
    seat = this.getSeat(col, row);
    seat.setSeatStatus("free");
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Will toggle a between true/false 
  and return the new value.*/
  toggleSeatValue(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];

    seat = this.getSeat(col, row);
    if ((seat.getSeatStatus()).localeCompare("free") == 0) {
      seat.setSeatStatus("selected");
      return "selected";
    } else if ((seat.getSeatStatus()).localeCompare("selected") == 0) {
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