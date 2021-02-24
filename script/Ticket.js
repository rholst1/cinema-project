
const TicketType = {
  CHILD: "child",
  ADULT: "adult",
  SENIOR: "senior"
};
Object.freeze(TicketType);

export default class Ticket {
  static childPrice = null;
  static adultPrice = null;
  static seniorPrice = null;
  //todo clear ticketprice from parameter
  constructor(seatNumber, ticketType, ticketPrice, id) {
    this.seatNumber = seatNumber;
    this.ticketType = ticketType;
    this.ticketPrice = this.getTicketPrice(ticketType);
    if (id != undefined) {
      this.id = id;
    } else {
      this.id = null;
    }
  }
  static loadPriceReference(priceReference) {
    for (let ticketPrice of priceReference) {
      if (ticketPrice.type === "child") Ticket.childPrice = ticketPrice.price;
      if (ticketPrice.type === "adult") Ticket.adultPrice = ticketPrice.price;
      if (ticketPrice.type === "child") Ticket.seniorPrice = ticketPrice.price;
    }
  }
  getTicketPrice(ticketType) {
    if (ticketType === TicketType.CHILD) return Ticket.childPrice;
    if (ticketType === TicketType.ADULT) return Ticket.adultPrice;
    if (ticketType === TicketType.SENIOR) return Ticket.seniorPrice;
  }

}