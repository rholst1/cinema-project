import SeatRow from '/script/SeatRow.js';
export default class Cinema {


  /* seating should be an array contain number of seats for each row. Argument
  reserved is optional and should provide array with seat coordinates ({col}_{row} 
    for reserved seats.*/
  constructor(seatings, reservedSeats, name, randomise) {
    /* 2d-array of the seatings, row dimension is contained in SeatRow objects*/
    this.rows = [];
    /*the greatest row width is saved for easy access.*/
    this.maxRowWidth = 1;
    /*Name of the cine represented in this object*/
    this.name = name;
    /*How many seats the cinema contains*/
    numberOfSeats = 0;
    /*Parse list of row widths and create corresponding SeatRow objects.*/
    for (let rowWidth of seatings) {
      this.rows.push(new SeatRow(rowWidth));
      numberOfSeats++;
      /*Save the row value to maxRowWidth if it's greater TODO is this needed?*/
      if (rowWidth > this.maxRowWidth) {
        this.maxRowWidth = rowWidth;
      }
    }
    if (reservedSeats != undefined) {
      reservedSeats.forEach(seat => {
        let seatArray = this.getSeatCoordinates(seat);
        let col = parseInt(seatArray[0]);
        let row = parseInt(seatArray[1]);
        this.rows[row].columns[col].setSeatStatus("reserved");
      });
    }
    if (randomise != undefined) {
      this.rows.forEach(row => {
        row.columns.forEach(column => {
          if (Math.random() > 0.5) {
            column.setSeatStatus("reserved");
          }
        });
      });
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
    return this.rows[row].columns[col].getSeatCoordinates();
  }
  /*expects seat as string in the form {col}_{row} ex: 2_1. Will toggle a between true/false 
  and return the new value.*/
  toggleSeatValue(seat) {
    let seatArray = this.getSeatCoordinates(seat);
    let col = seatArray[0];
    let row = seatArray[1];
    if ((this.rows[row].columns[col].getSeatStatus()).localeCompare("free") == 0) {
      this.rows[row].columns[col].setSeatStatus("selected");
      return "selected";
    } else if ((this.rows[row].columns[col].getSeatStatus()).localeCompare("selected") == 0) {
      this.rows[row].columns[col].setSeatStatus("free");
      return "free";
    } else {
      return "reserved";
    }
  }
}