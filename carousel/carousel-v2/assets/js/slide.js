import SELECTOR from "./const.js";

export default class SlideEffect {
  constructor() {
    this.subscribeEvent();
    this.translateX = 0;
    this.currentSlideInfo = {
      subject: "korea",
      idx: "0",
    };
  }

  subscribeEvent() {
    const subjectContainer = document.querySelector(`.${SELECTOR.SUBJECT}`);

    subjectContainer.addEventListener("click", (e) => {
      const isSubjectSlide =
        e.target.dataset.subject || e.target.tagName === "H2";

      if (!isSubjectSlide) return;

      const clickedElement =
        e.target.tagName === "H2" ? e.target.parentElement : e.target;

      this._expandSubject(clickedElement);
      this._attachSubjectSlideButton(clickedElement);
    });

    // subjectSlides.forEach((slide) => {
    //   slide.addEventListener("click", (e) => {
    //     let clickedElement =
    //       e.target.tagName === "H2" ? e.target.parentElement : e.target;

    //     subjectSlides.forEach((e) => {
    //       e.classList.remove(SELECTOR.SUBJECT_CLICK);
    //       if (e.lastElementChild.tagName === "DIV") {
    //         e.lastElementChild.remove();
    //       }
    //     });

    //     clickedElement.classList.add(SELECTOR.SUBJECT_CLICK);

    //     const slideCnt = this._countSubjectSlide(
    //       clickedElement.dataset.subject
    //     );
    //     clickedElement.appendChild(
    //       this._createSubjectButton(slideCnt, clickedElement.dataset.subject)
    //     );

    //     //TODO:아래 캐로셀 이동 시키는 코드 추가, span 태그 개수를 아래 캐로셀 갯수 만큼 생성
    //   });
    // });

    const nextButton = document.querySelector(
      `.${SELECTOR.CONTENT_NEXT_BUTTON}`
    );

    nextButton.addEventListener("click", (e) => {
      const { subject, idx } = this._getCurrentSlideInfo();
      const currentSlide = document.querySelector(`[data-${subject}='${idx}']`);
      const nextSlide = currentSlide.nextElementSibling;

      const nextSubject = Object.keys({ ...nextSlide.dataset })[0];
      const nextIdx = nextSlide.dataset[nextSubject];

      this._moveSlide(nextSubject, nextIdx);
      // console.log(temp);
      // for (let prop of nextSlide.dataset) {
      //   console.log(prop);
      // }
      console.log(nextSlide.dataset);
      // this._moveSlide()
    });
    //   .addEventListener("click", (e) => {
    //     this.translateX += this.contentSlideWrapper.offsetWidth;
    //     this.contentSlideWrapper.style.transform = `translate3d(-${this.translateX}px,0,0)`;
    //   });

    // document
    //   .querySelector(`.${SELECTOR.CONTENT_PRE_BUTTON}`)
    //   .addEventListener("click", (e) => {
    //     this.translateX -= this.contentSlideWrapper.offsetWidth;
    //     this.contentSlideWrapper.style.transform = `translate3d(-${this.translateX}px,0,0)`;
    //   });
  }

  _expandSubject(targetElement) {
    const preTargetElement = document.querySelector(
      `.${SELECTOR.SUBJECT_CLICK}`
    );

    if (targetElement === preTargetElement) return;

    preTargetElement?.classList.remove(SELECTOR.SUBJECT_CLICK);
    preTargetElement?.lastElementChild.remove();
    targetElement.classList.add(SELECTOR.SUBJECT_CLICK);
  }

  _attachSubjectSlideButton(parentElement) {
    const slideCnt = this._countSubjectSlide(parentElement.dataset.subject);
    parentElement.appendChild(
      this._createSubjectSlideButton(slideCnt, parentElement.dataset.subject)
    );
  }

  _createSubjectSlideButton(childCount, subject) {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add(SELECTOR.SUBJECT_BUTTON_CONTAINER);

    for (let i = 0; i < childCount; i++) {
      let childDiv = document.createElement("div");
      childDiv.classList.add(SELECTOR.SUBJECT_SLIDE_BUTTON);
      childDiv.dataset[subject] = i;
      childDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("target", e.target);
        this._moveSlide(subject, e.target.dataset[subject]);
      });
      containerDiv.appendChild(childDiv);
    }

    return containerDiv;
  }

  _countSubjectSlide(subject) {
    const contentSlides = [
      ...document.querySelectorAll(`.${SELECTOR.CONTENT_SLIDE}`),
    ];

    return contentSlides.filter((e) => e.dataset[subject] !== undefined).length;
  }

  _moveSlide(subject, idx) {
    const contentSlides = [
      ...document.querySelectorAll(`.${SELECTOR.CONTENT_SLIDE}`),
    ];
    const slideViewport = document.querySelector(
      `.${SELECTOR.CONTENT_WRAPPER}`
    );
    const nextSlideRect = contentSlides
      .find((e) => e.dataset[subject] === idx)
      .getBoundingClientRect();
    const slideViewportRect = slideViewport.getBoundingClientRect();

    const isDifferentSlide =
      Math.abs(nextSlideRect.left - slideViewportRect.left) >=
      slideViewport.offsetWidth - 60;

    this.translateX += isDifferentSlide
      ? -(nextSlideRect.left - slideViewportRect.left)
      : 0;

    const contentSlideWrapper = document.querySelector(
      `.${SELECTOR.CONTENT_SLIDE_WRAPPER}`
    );

    contentSlideWrapper.style.transform = `translate3d(${this.translateX}px,0,0)`;

    this._setCurrentSlideInfo({ subject, idx });
  }

  _setCurrentSlideInfo(newSlideinfo) {
    this.currentSlideInfo = { ...newSlideinfo };
  }

  _getCurrentSlideInfo() {
    return { ...this.currentSlideInfo };
  }
}
