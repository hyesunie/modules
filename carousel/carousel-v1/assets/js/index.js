function main() {
  const slides = [...document.querySelectorAll(".carousel__slide__img")];
  const preBtn = document.querySelector(".pre");
  const nextBtn = document.querySelector(".next");

  preBtn.addEventListener("click", (e) => {
    const currnetSlide = slides.find((e) => e.matches("[data-active]"));
    const existPre = currnetSlide.previousElementSibling ? true : false;

    delete currnetSlide.dataset.active;

    if (existPre) {
      currnetSlide.previousElementSibling.dataset.active = true;
      return;
    }
    currnetSlide.parentNode.lastElementChild.dataset.active = true;
  });

  nextBtn.addEventListener("click", (e) => {
    const currnetSlide = slides.find((e) => e.matches("[data-active]"));
    const existNext = currnetSlide.nextElementSibling ? true : false;

    delete currnetSlide.dataset.active;

    if (existNext) {
      currnetSlide.nextElementSibling.dataset.active = true;
      return;
    }
    currnetSlide.parentNode.firstElementChild.dataset.active = true;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});
