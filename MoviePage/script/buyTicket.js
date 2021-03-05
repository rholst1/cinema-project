function buyTicket(i) {
  localStorage['selected-movie'] = i;
  window.location.href = '/BookingPage/html/ticketbooking.html';
}
