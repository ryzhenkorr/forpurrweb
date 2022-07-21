const container = document.querySelector('.slideshow-container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = document.getElementsByClassName("dot");

let slides = document.querySelectorAll('.slide');
let index = 1;
var isAnimating = false;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const getSlides = () => document.querySelectorAll('.slide');

const moveToNextSlide = () => {
  if (!isAnimating) {
    slides = getSlides();
    if (index >= slides.length - 1) return;
    if (index === slides.length - 2) {
      index = 0;
      moveRight(1000);
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    index++;
    changeActiveDot();
    moveRight(1000);
  }
};

const moveToPreviousSlide = () => {
  if (!isAnimating) {
    slides = getSlides();
    if (index <= 0) return;
    if (index === 1) {
      index = slides.length - 1;
      moveLeft(1000);
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    };
    index--;
    changeActiveDot();
    moveLeft(1000);
  }
};

const changeActiveDot = () => {
 for (i = 0; i < dots.length ; i++) {
   dots[i].className = dots[i].className.replace("active", "");
 }
 dots[index-1].className += " active";
};

function showSlide(n) {
  if (index === n) return;
  index = n;
  changeActiveDot();
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

function moveRight(animationTime) {
  isAnimating = true;
  let start = Date.now();
  let timer = setInterval(function() {
    let timePassed = Date.now() - start;
    if (timePassed >= animationTime) {
     clearInterval(timer);
     slide.style.transform = `translateX(${-slideWidth * index}px)`;
     isAnimating = false;
     return;
   }
   slide.style.transform = `translateX(${-slideWidth * (timePassed/animationTime + index - 1)}px)`;
 }, 10);
  
};
function moveLeft(animationTime) {
  isAnimating = true;
  let start = Date.now();
  let timer = setInterval(function() {
   let timePassed = Date.now() - start;
   if (timePassed >= animationTime) {
     clearInterval(timer);
     slide.style.transform = `translateX(${-slideWidth * index}px)`;
     isAnimating = false;
     return;
   }
   slide.style.transform = `translateX(${-slideWidth * (-timePassed/animationTime + index + 1)}px)`;
 }, 10);
};