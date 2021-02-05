const SeatStatus = {
  RESERVED: "reserved",
  FREE: "free",
  SELECTED: "selected"
};
Object.freeze(SeatStatus);
export default class Seat {
  seatStatus = SeatStatus.FREE;

  constructor(seatStatus) {
    this.setSeatStatus(seatStatus);
  }
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