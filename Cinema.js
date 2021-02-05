import SeatRow from '/SeatRow.js';
export default class Cinema {
  /* 2d-array of the seatings, row dimension is contained in SeatRow objects*/
  seating = [];
  /* seating should be an array contain number of seats for each row*/
  constructor(seatings) {
    for (let row of seatings) {
      this.seatings = new SeatRow(row);
    }
  }
}