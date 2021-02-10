export default class Cinema {

  /* seating should be an array contain number of seats for each row. Argument
  reserved is optional and should provide array with seat coordinates ({col}_{row} 
    for reserved seats.*/
  constructor(seatsPerRow, name) {
    this.name = name;
    this.seatsPerRow = seatsPerRow;
    /*How many seats the cinema contains*/
    this.numberOfSeats = 0;
    for (let rowWidth of seatsPerRow) {
      this.numberOfSeats += rowWidth;
    }
  }
}