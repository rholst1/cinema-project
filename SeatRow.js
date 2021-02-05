export default class SeatRow {
  columns = [];
  constructor(SeatNumber) {
    /*fill columns array with all seats for this row, all seats are initiated as false. 
    Ie no seats are taken.*/
    for (let i = 0; i < SeatNumber; i++) {
      this.columns.push(false);
    }
  }
}