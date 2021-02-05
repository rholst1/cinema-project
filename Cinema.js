import SeatRow from '/SeatRow.js';
export default class Cinema {
  /* 2d-array of the seatings, row dimension is contained in SeatRow objects*/
  seatings = [];
  /*the greatest row width is saved for easy access.*/
  maxRowWidth = 1;
  /* seating should be an array contain number of seats for each row*/
  constructor(seatings) {
    /*Parse list of row widths and create corresponding SeatRow objects.*/
    for (let row of seatings) {
      this.seatings = new SeatRow(row);
      /*Save the row value to maxRowWidth if it's greater*/
      if (row > this.maxRowWidth) {
        this.maxRowWidth = row;
      }
    }
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Returns seat booked status as boolean. */
  getSeatValue(seat) {
    seatArray = seat.split('_');
    col = parseInt(seatArray[0]);
    row = parseInt(seatArray[1]);
    return seatings[row].columns[col];
  }
}