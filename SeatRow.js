class SeatRow {
  row = [];
  constructor(SeatNumber) {
    for (let seat of this.row) {
      /*fill array with false as no one's yet seated*/
      seat = false;
    }
  }
}