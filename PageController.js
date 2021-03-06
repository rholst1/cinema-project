//import { initNewBookingMain } from "/newBookingScript/newBookingMain.js";
import { initMyBookings } from "/myBookingsPage/script/my-bookings-page.js";
import { initHomepage } from "/HomePage/script/homepage.js";
import { initCurrentmovies } from "/MoviePage/script/currentmovies.js";

if (!window.HashChangeEvent) (function () {
  var lastURL = document.URL;
  window.addEventListener("hashchange", function (event) {
    Object.defineProperty(event, "oldURL", { enumerable: true, configurable: true, value: lastURL });
    Object.defineProperty(event, "newURL", { enumerable: true, configurable: true, value: document.URL });
    lastURL = document.URL;
  });
}());
window.addEventListener("hashchange", hashchanged, false);
$('.menu-bar').on('click', '.selected-text', () => {
  history.pushState(null, null, (location.hash.replace(/^#/, '')).replace(/$\//));
});
hashchanged();
//"#moreinfo/title=" + title.replaceAll(" ", "-")
function buildFrontPage() {
  $('.menu-home').toggleClass('selected-text');
  initHomepage()
}
function buildCurrentMoviesPage() {
  $('.menu-films').toggleClass('selected-text');
  initCurrentmovies();
}
function buildTicketPage(hash) {
  $('.menu-tickets').toggleClass('selected-text')
  $.getScript('BookingPage/script/newBookingMain.js');
  if (hash !== '') {
    /* if (hash.includes('showing')) {
       hash = hash.split('/'); //#tickets-film:filmID-showing:showingID
       let title = (hash[0].split('='))[1];
       let showingID = (hash[1].split('='))[1];
       $.getScript('BookingPage/script/newBookingMain.js');
     }*/
    if (hash.includes('film')) {
      let title = (hash.split('='))[1];
      title = title.replaceAll('-', ' ');
      $.getScript("/BookingPage/script/movies.js", () => {
        renderMovieBooking(title);
      })
    }
  }
}
function buildBookingsPage() {
  $('.menu-bookings').toggleClass('selected-text');
  initMyBookings();
}
function clear() {
  $(".movie-info").remove();
  $('main').html('');
  $('main').off('click');
}
function buildMoreInfoPage(hash) {
  let title = (hash.split('='))[1];
  title = title.replaceAll('-', ' ');
  $.getScript('/MoviePage/script/moremovieinfo.js', () => {
    buildInitialPage(title);
  })
}
function hashchanged() {
  $('.selected-text').toggleClass('selected-text');
  clear();
  let hash = location.hash.replace(/^#/, '');
  if (hash.startsWith('home') || hash === '') buildFrontPage();
  if (hash.startsWith('currentMovies')) buildCurrentMoviesPage();
  if (hash.startsWith('tickets')) buildTicketPage(hash.slice(8)); // slice at "ticket/"
  if (hash.startsWith('bookings')) buildBookingsPage();
  if (hash.startsWith('moreinfo')) buildMoreInfoPage(hash.slice(9)); //slice at "moreinfo/"
}
