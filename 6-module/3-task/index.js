import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    // Создаем элементы
    let carousel = document.createElement("div");
    let carouselInner = document.createElement("div");
    // Добавляем классы
    carousel.classList.add("carousel");
    carouselInner.classList.add("carousel__inner");
    //
    this.elem = carousel;
    this.carouselInner = carouselInner;
    // Добавляем в HTML
    this.elem.append(this.carouselInner);
    // Рендер
    this.renderSlide(slides);
    this.renderArrow();
    this.switchSlide();
    this.carouselInner.addEventListener("click", (event) =>
      this.onClick(event)
    );
  }
  renderSlide(slides) {
    for (let slide of slides) {
      let templateSlider = `
            <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${
              slide.image
            }" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
           `;
      this.carouselInner.insertAdjacentHTML(`beforeend`, templateSlider);
    }
  }
  renderArrow() {
    let templateArrow = `
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div> 
   `;
    this.elem.insertAdjacentHTML(`beforeend`, templateArrow);
  }
  switchSlide() {
    //
    let carouselInner = this.elem.querySelector(".carousel__inner");
    let slideElement = this.elem.querySelectorAll(".carousel__slide").length;
    console.log(slideElement);
    //
    let counter = 0;
    //   //
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    arrowLeft.style.display = "none";
    let arrowRight = this.elem.querySelector(".carousel__arrow_right");
    //   //
    let carouselArrow = this.elem.querySelectorAll(".carousel__arrow");
    //
    for (let arrow of carouselArrow) {
      arrow.addEventListener("click", function (event) {
        let clickRight = event.target.closest(".carousel__arrow_right");
        let clickLeft = event.target.closest(".carousel__arrow_left");
        //

        if (clickRight) {
          switchRight();
        }
        if (clickLeft) {
          switchLeft();
        }
        //
        function switchRight() {
          if (counter < slideElement - 1) {
            ++counter;
            carouselInner.style.transform = `translateX(${
              -carouselInner.offsetWidth * counter
            }px`;
            arrowLeft.style.display = "";
          }
          if (counter == slideElement - 1) {
            arrowRight.style.display = "none";
          }
        }

        function switchLeft() {
          if (counter > 0) {
            counter--;
            carouselInner.style.transform = `translateX(${
              -carouselInner.offsetWidth * counter
            }px`;
            arrowRight.style.display = "";
          }
          if (counter == 0) {
            arrowLeft.style.display = "none";
          }
        }
      });
    }
  }
  onClick(event) {
    if (event.target.closest(".carousel__button")) {
      let slideId = event.target.closest(".carousel__slide").dataset.id;
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slideId, // Уникальный идентификатора товара из объекта товара
          bubbles: true, // это событие всплывает - это понадобится в дальнейшем
        })
      );
    }
  }
}
