let $btns = $('.btn').click(function () {
  if (this.id == 'all') {
    $('.currentMovies > .movie-container').fadeIn(450);
  } else {
    let $age = $('.' + this.id).fadeIn(450);
    $('.currentMovies > .movie-container').not($age).hide();
  }
  $btns.removeClass('active');
  $(this).addClass('active');
})

$(document).ready(function () {
  $("#toggle").click(function () {
    $(".btn").toggle();
  });
});