function main() {
  const imgSlides = [...document.querySelectorAll(".carousel__slide__img")];
  const textSlides = [...document.querySelectorAll(".carousel__slide__text")];
  const preBtn = document.querySelector(".pre");
  const nextBtn = document.querySelector(".next");

  preBtn.addEventListener("click", (e) => {
    const currnetImgSlide = imgSlides.find((e) => e.matches("[data-active]"));
    const currentTextSlide = textSlides.find((e) => e.matches("[data-active]"));

    const existPre = currnetImgSlide.previousElementSibling ? true : false;

    delete currnetImgSlide.dataset.active;
    delete currentTextSlide.dataset.active;

    if (existPre) {
      currnetImgSlide.previousElementSibling.dataset.active = true;
      currentTextSlide.previousElementSibling.dataset.active = true;
      return;
    }
    currnetImgSlide.parentNode.lastElementChild.dataset.active = true;
    currentTextSlide.parentNode.lastElementChild.dataset.active = true;
  });

  nextBtn.addEventListener("click", (e) => {
    const currnetImgSlide = imgSlides.find((e) => e.matches("[data-active]"));
    const currentTextSlide = textSlides.find((e) => e.matches("[data-active]"));
    const existNext = currnetImgSlide.nextElementSibling ? true : false;

    delete currnetImgSlide.dataset.active;
    delete currentTextSlide.dataset.active;

    if (existNext) {
      currnetImgSlide.nextElementSibling.dataset.active = true;
      currentTextSlide.nextElementSibling.dataset.active = true;

      return;
    }
    currnetImgSlide.parentNode.firstElementChild.dataset.active = true;
    currentTextSlide.parentNode.firstElementChild.dataset.active = true;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});
