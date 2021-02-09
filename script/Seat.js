/*Enum that denotes a seat objects reservation status. SELECTED is used
when the seat is selected in the booking process but not yet reserved.*/
const SeatStatus = {
  RESERVED: "reserved",
  FREE: "free",
  SELECTED: "selected"
};
Object.freeze(SeatStatus);
/* Seat objects represents seats in a cinema. */
export default class Seat {
  seatStatus = SeatStatus.FREE;

  constructor(seatStatus, column, row) {
    this.setSeatStatus(seatStatus);
    this.column = column;
    this.row = row;
  }
  /* Expects a string in the parameter that corresponds to any of the 
  SeatStatus enums. */
  setSeatStatus(seatStatus) {
    console.log(seatStatus);
    switch (seatStatus) {
      case SeatStatus.RESERVED:
        this.seatStatus = SeatStatus.RESERVED;
        break;
      case SeatStatus.FREE:
        this.seatStatus = SeatStatus.FREE;
        break;
      case SeatStatus.SELECTED:
        this.seatStatus = SeatStatus.SELECTED;
        break;
    }
  }
  getSeatStatus() {
    return this.seatStatus;
  }
}