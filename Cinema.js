import SeatRow from '/SeatRow.js';
export default class Cinema {
  /* 2d-array of the seatings, row dimension is contained in SeatRow objects*/
  seatings = []; //todo should have a more intuitive way of reaching individual seats
  /*the greatest row width is saved for easy access.*/
  maxRowWidth = 1;
  /* seating should be an array contain number of seats for each row*/
  constructor(seatings) {
    /*Parse list of row widths and create corresponding SeatRow objects.*/
    for (let rowWidth of seatings) {
      this.seatings.push(new SeatRow(rowWidth));
      /*Save the row value to maxRowWidth if it's greater*/
      if (rowWidth > this.maxRowWidth) {
        this.maxRowWidth = rowWidth;
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
    return this.seatings[row].columns[col];
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Will toggle a between true/false 
  and return the new value.*/
  toggleSeatValue(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];
    if (this.seatings[row].columns[col] == false) {
      this.seatings[row].columns[col] = true;
      return true;
    } else {
      this.seatings[row].columns[col] = false;
      return false;
    }
  }
}