"use strict";

//NAVIGATION ITEMS OPACITY WHILE HOVERING
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav_lists");
const navHeight = nav.getBoundingClientRect().height;
const overlay =document.querySelector(".overlay")

const hoverOver = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    siblings.forEach((lk) => {
      if (lk !== link) lk.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", hoverOver.bind(0.5));

nav.addEventListener("mouseout", hoverOver.bind(1));

//STICKY NAVIGATION |||||
const header = document.querySelector(".header");
const headerOberver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  },
  {
    root: null,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
    threshold: 0,
  }
).observe(header);

//NAVIGATION SMOOTH SCROLLING
navList.addEventListener("click", function (e) {
  e.preventDefault();

  const id = e.target.getAttribute("href");

  if (id) document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

// ///////////TABLET AND MOBILE TOGGLE BAR
const toggleBtn = document.querySelector(".toggle-btn");
const navCloseBtn = document.querySelector(".nav_closebtn");
const navOverlay = document.querySelector(".nav_overlay");

const openToggle = function () {
  navList.classList.add("nav--active");

  overlay.classList.remove("hidden");
};

const closeToggle = function () {
  overlay.classList.add("hidden");
  navList.classList.remove("nav--active");
};

toggleBtn.addEventListener("click", openToggle);
navCloseBtn.addEventListener("click", closeToggle);
navOverlay.addEventListener("click", closeToggle);

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeToggle();
});

//HEADER SLIDES
const slides = document.querySelectorAll(".slide");
const maxSlides = slides.length;

const slideBtnRight = document.querySelector(".slide__btn--right");
const slideBtnLeft = document.querySelector(".slide__btn--left");

const dotContainer = document.querySelector(".dots");

slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);

let currentSlide = 0;

const createDots = function () {
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};

const activeSlide = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

createDots(); //creating dots
activeSlide(currentSlide); //activating current slide dot

const goToslide = function (curSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

const changeSlide = function () {
  console.log(this);
  if (!this) {
    //next slide
    if (currentSlide == maxSlides - 1) currentSlide = 0;
    else currentSlide++;

   
  } else {
    // prev slide
    if (currentSlide == 0) currentSlide = maxSlides - 1;
    else currentSlide--;

   
  }
  
  goToslide(currentSlide);
  activeSlide(currentSlide);
};

slideBtnRight.addEventListener("click", changeSlide.bind(0));

slideBtnLeft.addEventListener("click", changeSlide.bind(1));

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  e.key === "ArrowRight" && changeSlide.bind(0)();
  e.key === "ArrowLeft" && changeSlide.bind(1)();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToslide(slide);
    activeSlide(slide);
  }
});

setInterval(function () {
  changeSlide.bind(0)();
}, 5000);

//SECTION NAV
const secNav = document.querySelectorAll(".sec-nav");
secNav.forEach((sec) =>
  sec.addEventListener("click", function (e) {
    e.preventDefault();
  })
);

//REVEALING SECTIONS SLOW
const sectionAll = [...document.getElementsByTagName("section")];

const sectionOberver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    sectionOberver.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
  }
);

sectionAll.forEach((sec) => {
  sec.classList.add("section--hidden");
  sectionOberver.observe(sec);
});

//IMAGE SLOW LOADING...

const imgAll = document.querySelectorAll("img[data-src]");

const imgOberver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 1.0,
    rootMargin: "20px",
  }
);

imgAll.forEach((img) => {
  imgOberver.observe(img);
});

// //MODAL
// const modal = document.querySelector(".modal");
// ;
// const btnClose = document.querySelector(".btn--close-modal");
// const btnOpenAll = document.querySelectorAll(".btn--show-modal");

// //open modal
// const openModal = function (e) {
//   e.preventDefault();

//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// //close modal
// const closeModal = function (e) {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// };

// btnOpenAll.forEach((btn) => btn.addEventListener("click", openModal));
// btnClose.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

// window.addEventListener("keydown", function (e) {
//   if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
// });
