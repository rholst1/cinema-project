export default class Cinema {


  /* seating should be an array contain number of seats for each row. Argument
  reserved is optional and should provide array with seat coordinates ({col}_{row} 
    for reserved seats.*/
  constructor(seatsPerRow, name/*, randomise*/) {
    /* 2d-array of the seatings, row dimension is contained in SeatRow objects*/
    this.seatsPerRow = seatsPerRow;
    /*the greatest row width is saved for easy access.*/
    this.maxRowWidth = 1;
    /*Name of the cine represented in this object*/
    this.name = name;
    /*How many seats the cinema contains*/
    this.numberOfSeats = 0;

    for (let rowWidth of seatsPerRow) {
      this.numberOfSeats += rowWidth;
    }
    /*Parse list of row widths and create corresponding SeatRow objects.*/
    /*for (let rowWidth of seatsPerRow) {
      this.rows.push(new SeatRow(rowWidth));
      this.numberOfSeats += rowWidth;*/
    /*Save the row value to maxRowWidth if it's greater TODO is this needed?*/
    /* if (rowWidth > this.maxRowWidth) {
       this.maxRowWidth = rowWidth;
     }
   }*/
    /*
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
    }*/
  }
  getJSON() {
    let jSONName = this.name;
    let jSONSeats = this.numberOfSeats;
    let jSONSeatsPerRow = this.seatsPerRow;
    return JSON.stringify({
      name: jSONName,
      seats: jSONSeats,
      seatsPerRow: jSONSeatsPerRow
    }, null, '');
  }

}