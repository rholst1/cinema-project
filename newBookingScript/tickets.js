// Script for when you are selecting amount and type of tickets

let childTickets = 0;
let adultTickets = 0;
let seniorTickets = 0;

// Here you decide how many tickets you want and what type of tickets
function renderTicketChooser() {
  $('main').append(`<div class="ticket-container"></div>`);
  $('main').append(`<div class="continue-container"></div>`);
  let htmlChild = /*html*/ `<span>Barn - 75kr</span><div class="button-container"><button id="childTicketRem" class="general-button">-</button><div class="amountC"><p class="showAmountC">0</p></div><button id="childTicketAdd" class="general-button">+</button></div>`;

  let htmlAdult = /*html*/ `<span>Vuxen - 85kr</span><div class="button-container"><button id="adultTicketRem" class="general-button">-</button><div class="amountA"><p class="showAmountA">0</p></div><button id="adultTicketAdd" class="general-button">+</button></div>`;

  let htmlSenior = /*html*/ `<span>Pensionär - 65kr</span><div class="button-container"><button id="seniorTicketRem" class="general-button">-</button><div class="amountS"><p class="showAmountS">0</p></div><button id="seniorTicketAdd" class="general-button">+</button></div>`;

  let htmlButton = /*html*/ `<div><button id="continue-button" class="general-button">Fortsätt</button></div>`;

  let html = htmlChild + htmlAdult + htmlSenior;
  $('.ticket-container').append(html);
  $('.continue-container').append(htmlButton);
}

function renderChosenTicketsC() {
  $('.showAmountC').remove();
  let html = /*html*/ `<p class="showAmountC">${childTickets}</p>`;
  $('.amountC').append(html);
}

function renderChosenTicketsA() {
  $('.showAmountA').remove();
  let html = /*html*/ `<p class="showAmountA">${adultTickets}</p>`;
  $('.amountA').append(html);
}

function renderChosenTicketsS() {
  $('.showAmountS').remove();
  let html = /*html*/ `<p class="showAmountS">${seniorTickets}</p>`;
  $('.amountS').append(html);
}

function addChildTicket() {
  childTickets++;
  totalAmountTickets++;
  renderChosenTicketsC();
}

function remChildTicket() {
  childTickets--;
  totalAmountTickets--;
  renderChosenTicketsC();
}

function addAdultTicket() {
  adultTickets++;
  totalAmountTickets++;
  renderChosenTicketsA();
}

function remAdultTicket() {
  adultTickets--;
  totalAmountTickets--;
  renderChosenTicketsA();
}
function addSeniorTicket() {
  seniorTickets++;
  totalAmountTickets++;
  renderChosenTicketsS();
}

function remSeniorTicket() {
  seniorTickets--;
  totalAmountTickets--;
  renderChosenTicketsS();
}

$(document).on('click', '#childTicketAdd', function () {
  addChildTicket();
});
$(document).on('click', '#childTicketRem', function () {
  remChildTicket();
});
$(document).on('click', '#adultTicketAdd', function () {
  addAdultTicket();
});
$(document).on('click', '#adultTicketRem', function () {
  remAdultTicket();
});
$(document).on('click', '#seniorTicketAdd', function () {
  addSeniorTicket();
});
$(document).on('click', '#seniorTicketRem', function () {
  remSeniorTicket();
});
