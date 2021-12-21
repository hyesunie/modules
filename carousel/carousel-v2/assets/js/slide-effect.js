import SELECTOR from "./const.js";

export default class SlideEffect {
  constructor() {
    this.subjectInfo = {
      preClickedElement: document.querySelector(`.${SELECTOR.SUBJECT_SLIDE}`),
    };

    this.subjectCount = {
      korea: document.querySelectorAll(
        `.${SELECTOR.CONTENT_SLIDE_CONTAINER} [data-subject="korea"]`
      ).length,
      uk: document.querySelectorAll(
        `.${SELECTOR.CONTENT_SLIDE_CONTAINER} [data-subject="uk"]`
      ).length,
      france: document.querySelectorAll(
        `.${SELECTOR.CONTENT_SLIDE_CONTAINER} [data-subject="france"]`
      ).length,
      swiss: document.querySelectorAll(
        `.${SELECTOR.CONTENT_SLIDE_CONTAINER} [data-subject="swiss"]`
      ).length,
    };

    this.slideInfo = {
      count: document.querySelectorAll(`.${SELECTOR.CONTENT_SLIDE}`).length,
      currentSlide: 1,
      width: document.querySelector(`.${SELECTOR.CONTENT_CONTAINER}`)
        .clientWidth,
    };

    this.init();

    this.subscribeEvent();
  }
  init() {
    const innerButtonContainers = document.querySelectorAll(
      `.${SELECTOR.SUBJECT_BUTTON_CONTAINER} `
    );
    innerButtonContainers.forEach((e) => {
      this._createInnerButton(e);
    });

    const innerButtons = document.querySelectorAll(
      `.${SELECTOR.SUBJECT_INNER_BUTTON}`
    );
    const contentSlides = document.querySelectorAll(
      `.${SELECTOR.CONTENT_SLIDE}`
    );

    try {
      if (innerButtons.length !== contentSlides.length) {
        throw "html이 잘못 됐습니다.";
      }

      for (let i = 1; i <= innerButtons.length; i++) {
        innerButtons[i - 1].setAttribute("id", i);
        contentSlides[i - 1].setAttribute("id", i);
      }
    } catch (e) {
      console.log(e);
    }

    const firstExpandElement = document.querySelector(
      `.${SELECTOR.SUBJECT_SLIDE}`
    );

    this._visibleInnerButton(firstExpandElement);
    this._expandSubject(firstExpandElement);
  }

  subscribeEvent() {
    window.addEventListener("resize", (e) => {});

    const subjectContainer = document.querySelector(`.${SELECTOR.SUBJECT}`);
    subjectContainer.addEventListener("click", (e) => {
      this.onClickSubjectContainer(e);
    });

    const nextButton = document.querySelector(
      `.${SELECTOR.CONTENT_NEXT_BUTTON}`
    );
    nextButton.addEventListener("click", (e) => {
      this.onClickNextButton(e);
    });

    const preButton = document.querySelector(`.${SELECTOR.CONTENT_PRE_BUTTON}`);
    preButton.addEventListener("click", (e) => {
      this.onClickPreButton(e);
    });

    const innerButtonContainers = document.querySelectorAll(
      `.${SELECTOR.SUBJECT_BUTTON_CONTAINER} `
    );
  }

  onClickSubjectContainer(e) {
    if (e.target.classList.contains(SELECTOR.SUBJECT_INNER_BUTTON)) {
      this.onClickInnerButton(e);
    }

    const isSubjectSlide =
      e.target.dataset.subject || e.target.tagName === "H2";

    if (!isSubjectSlide) return;

    const clickedElement =
      e.target.tagName === "H2" ? e.target.parentElement : e.target;

    this._visibleInnerButton(clickedElement);
    this._expandSubject(clickedElement);

    const nextSlide = clickedElement
      .querySelector(`.${SELECTOR.SUBJECT_BUTTON_CONTAINER} div`)
      .getAttribute("id");

    this._slide(nextSlide - this._getSlideInfo().currentSlide);
  }

  onClickNextButton(e) {
    const nextSlide = document.querySelector(
      `.${SELECTOR.SUBJECT_CONTAINER} [id="${
        this._getSlideInfo().currentSlide + 1
      }"]`
    ).parentElement.parentElement;

    nextSlide.click();
    this._slide(1);
  }

  onClickPreButton(e) {
    const preSlide = document.querySelector(
      `.${SELECTOR.SUBJECT_CONTAINER} [id="${
        this._getSlideInfo().currentSlide - 1
      }"]`
    ).parentElement.parentElement;

    preSlide.click();
    this._slide(-1);
  }

  onClickInnerButton(e) {
    const nextSlide = e.target.getAttribute("id");

    this._slide(nextSlide - this._getSlideInfo().currentSlide);
  }

  _expandSubject(targetElement) {
    const newSubjectInfo = this._getSubjectInfo();

    // if (newSubjectInfo.preClickedElement === targetElement) return;
    newSubjectInfo.preClickedElement.classList?.remove(SELECTOR.SUBJECT_CLICK);
    targetElement.classList.add(SELECTOR.SUBJECT_CLICK);
    newSubjectInfo.preClickedElement = targetElement;

    this._setSubjectInfo(newSubjectInfo);
  }

  _visibleInnerButton(targetElement) {
    this._getSubjectInfo()
      .preClickedElement.querySelector(`.${SELECTOR.SUBJECT_BUTTON_CONTAINER}`)
      .classList.add(SELECTOR.HIDDEN);

    targetElement
      .querySelector(`.${SELECTOR.SUBJECT_BUTTON_CONTAINER}`)
      .classList.remove(SELECTOR.HIDDEN);
  }

  _createInnerButton(targetElement) {
    const subject = targetElement.parentElement.dataset.subject;

    for (let i = 1; i <= this.subjectCount[subject]; i++) {
      const innerButton = document.createElement("div");
      innerButton.classList.add(SELECTOR.SUBJECT_INNER_BUTTON);
      targetElement.appendChild(innerButton);
    }

    return targetElement;
  }

  _slide(count) {
    const contentSlideContainer = document.querySelector(
      `.${SELECTOR.CONTENT_SLIDE_CONTAINER}`
    );

    const newSlideInfo = this._getSlideInfo();
    const nextSlide = newSlideInfo.currentSlide + count;
    const offset = -(nextSlide - 1) * this.slideInfo.width;

    newSlideInfo.currentSlide = nextSlide;

    this._setSlideInfo(newSlideInfo);
    contentSlideContainer.style.transform = `translate3d(${offset}px,0,0)`;
  }

  _getSubjectInfo() {
    return { ...this.subjectInfo };
  }

  _setSubjectInfo(newSubjectInfo) {
    this.subjectInfo = { ...newSubjectInfo };
  }

  _getSlideInfo() {
    return { ...this.slideInfo };
  }

  _setSlideInfo(newSlideInfo) {
    this.slideInfo = { ...newSlideInfo };
  }
}
