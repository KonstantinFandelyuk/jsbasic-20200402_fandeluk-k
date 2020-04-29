import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    //
    let carousel = document.createElement("div");
    let carouselInner = document.createElement("div");
    //
    carousel.classList.add("carousel");
    carouselInner.classList.add("carousel__inner");
    //
    this.elem = carousel;
    this.carouselInner = carouselInner;
    //
    this.elem.append(this.carouselInner);
    //
    this.render(slides);
  }
  render(slides) {
    for (let slide of slides) {
      this.imageSlide = `/assets/images/carousel/${slide.image}`;
      let template = `
            <div class="carousel__slide" data-id="penang-shrimp">
            <img src="${this.imageSlide}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
           `;
      this.carouselInner.insertAdjacentHTML(`beforeend`, template);
    }
  }
}
