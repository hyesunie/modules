import SELECTOR from "./const.js";

export default class SlideEffect {
  constructor() {
    this.subscribeEvent();
  }

  subscribeEvent() {
    const subjectSlides = document.querySelectorAll(
      `.${SELECTOR.SUBJECT_SLIDE}`
    );

    subjectSlides.forEach((slide) => {
      slide.addEventListener("click", (e) => {
        let clickedElement =
          e.target.tagName === "H2" ? e.target.parentElement : e.target;

        subjectSlides.forEach((e) => {
          e.classList.remove(SELECTOR.SUBJECT_CLICK);
          if (e.lastElementChild.tagName === "DIV") {
            e.lastElementChild.remove();
          }
        });
        clickedElement.classList.add(SELECTOR.SUBJECT_CLICK);

        clickedElement.appendChild(this._createSubjectButton(3));

        //TODO:아래 캐로셀 이동 시키는 코드 추가, span 태그 개수를 아래 캐로셀 갯수 만큼 생성
      });
    });

    let translateX = 0;
    const contentContainer = document.querySelector(
      `.${SELECTOR.CONTENT_SLIDE_CONTAINER}`
    );
    document
      .querySelector(`.${SELECTOR.CONTENT_NEXT_BUTTON}`)
      .addEventListener("click", (e) => {
        translateX += contentContainer.offsetWidth;
        contentContainer.style.transform = `translate3d(-${translateX}px,0,0)`;
      });

    document
      .querySelector(`.${SELECTOR.CONTENT_PRE_BUTTON}`)
      .addEventListener("click", (e) => {
        translateX -= contentContainer.offsetWidth;
        contentContainer.style.transform = `translate3d(-${translateX}px,0,0)`;
      });
  }

  _createSubjectButton(childCount) {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add(SELECTOR.SUBJECT_BUTTON_CONTAINER);

    for (let i = 0; i < childCount; i++) {
      const childDiv = document.createElement("div");
      childDiv.classList.add(SELECTOR.SUBJECT_SLIDE_BUTTON);
      containerDiv.appendChild(childDiv);
    }

    return containerDiv;
  }
}
