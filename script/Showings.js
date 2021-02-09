export default class Showings {
  constructor(auditorium, film, date, reservedSeats) {
    this.auditorium = auditorium;
    this.film = film;
    this.date = date; // Date
    this.reservedSeats = [];
    if (reservedSeats != undefined) {
      this.reservedSeats = reservedSeats;
    }
  }
}