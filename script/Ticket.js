const TicketType = {
  CHILD: "child",
  ADULT: "adult",
  SENIOR: "senior"
};
Object.freeze(TicketType);
export default class Ticket {
  constructor(seatNumber, ticketType, ticketPrice) {
    this.seatNumber = seatNumber;
    this.ticketType = ticketType;
    this.ticketPrice = ticketPrice;
  }
}