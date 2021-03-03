//import { initNewBookingMain } from "/newBookingScript/newBookingMain.js";
import { initMyBookings } from "/my-bookings-page.js";
import { initHomepage } from "/homepage.js";
import { initCurrentmovies } from "/currentmovies.js"

if (!window.HashChangeEvent) (function () {
  var lastURL = document.URL;
  window.addEventListener("hashchange", function (event) {
    Object.defineProperty(event, "oldURL", { enumerable: true, configurable: true, value: lastURL });
    Object.defineProperty(event, "newURL", { enumerable: true, configurable: true, value: document.URL });
    lastURL = document.URL;
  });
}());
window.addEventListener("hashchange", hashchanged, false);
hashchanged();
function buildFrontPage() {

  initHomepage()
}
function buildCurrentMoviesPage() {
  initCurrentmovies();
}
function buildTicketPage(hash) {
  if (hash !== '') {
    if (hash.includes('showing')) {
      hash = hash.split('-'); //#tickets-film:filmID-showing:showingID

      let title = (hash[0].split('='))[1];
      let showingID = (hash[1].split('='))[1];
      $.getScript('newBookingScript/newBookingMain.js');
    }
    if (hash.includes('film')) {
      let title = (hash.split('='))[1];
      $.getScript('newBookingScript/newBookingMain.js');
    }
  } else {
    $.getScript('newBookingScript/newBookingMain.js');
  }
}
function buildBookingsPage() {
  initMyBookings();
}
function clear() {
  $(".movie-info").remove();
  $('main').html('');
}
function buildMoreInfoPage(hash) {
  let title = (hash.split('='))[1];
  title = title.replaceAll('-', ' ');
  console.log(title);
  $.getScript('moremovieinfo.js', () => {
    buildInitialPage(title);
  })
}
function hashchanged() {
  clear();
  let hash = location.hash.replace(/^#/, '');
  if (hash.startsWith('home') || hash === '') buildFrontPage();
  if (hash.startsWith('currentMovies')) buildCurrentMoviesPage();
  if (hash.startsWith('tickets')) buildTicketPage(hash.slice(8)); // slice at "ticket-"
  if (hash.startsWith('bookings')) buildBookingsPage();
  if (hash.startsWith('moreinfo')) buildMoreInfoPage(hash.slice(9));
}
