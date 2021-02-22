export default class Auditorium {
  /* seating should be an array contain number of seats for each row. Argument
  reserved is optional and should provide array with seat coordinates ({col}_{row} 
    for reserved seats.*/
  constructor(seatsPerRow, name, id) {
    this.name = name;
    this.seatsPerRow = seatsPerRow;
    /*How many seats the auditorium contains*/
    this.numberOfSeats = 0;
    for (let rowWidth of seatsPerRow) {
      this.numberOfSeats += rowWidth;
    }
    this.id = null;
    if (id != undefined) {
      this.id = id;
    }
  }
}