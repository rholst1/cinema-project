let slideIndex = 1;

function changeSlide(slideNumber) {
  slideShow((slideIndex += slideNumber));
}

function changeDotSlide(dotNumber) {
  slideShow((slideIndex = dotNumber));
}

function slideShow(slideNumber) {
  let i;
  let slide = document.getElementsByClassName('slides');
  let dots = document.getElementsByClassName('dot');

  if (slideNumber > slide.length) {
    slideIndex = 1;
  }
  if (slideNumber < 1) {
    slideIndex = slide.length;
  }
  for (i = 0; i < slide.length; i++) {
    slide[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slide[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}
slideShow(slideIndex);
