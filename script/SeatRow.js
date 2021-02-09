import Seat from "/script/Seat.js";
/* The SeatRow object represents a row of seats in a cinema. */
export default class SeatRow {
  /* Each element in columns represents a seat in the form of a Seat object.
  Variable name is columns to make it more intuitive when referencing it 
  from Cinema.js (ex: rows[].columns[]). */
  columns = [];
  /*TODO should take array of SeatStatus */
  constructor(SeatNumber) {
    /*TMP - fill columns array with all seats for this row, all seats are initiated as free. 
    Ie no seats are taken.*/
    for (let i = 0; i < SeatNumber; i++) {
      this.columns.push(new Seat('free'));
    }
  }
}