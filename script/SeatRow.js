import Seat from "/script/Seat.js";

export default class SeatRow {
  columns = [];
  /*TODO should take array of SeatStatus */
  constructor(SeatNumber) {
    /*fill columns array with all seats for this row, all seats are initiated as false. 
    Ie no seats are taken.*/
    for (let i = 0; i < SeatNumber; i++) {
      this.columns.push(new Seat('free'));
    }
  }
}