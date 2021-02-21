const TicketType = {
  CHILD: "child",
  ADULT: "adult",
  SENIOR: "senior"
};
Object.freeze(TicketType);
export default class Ticket {
  constructor(seatNumber, ticketType, ticketPrice, showing) {
    this.seatNumber = seatNumber;
    this.ticketType = ticketType;
    this.ticketPrice = ticketPrice;
    this.showing = showing;
  }
}