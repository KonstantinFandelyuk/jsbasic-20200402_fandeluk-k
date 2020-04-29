import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let carousel = document.createElement("carousel");
    this.elem = carousel;
    this.render(slides);
  }
  render(slides) {
    for (let item of slides) {
      this.imageSlide = `/assets/images/products/${item.image}`;
      console.log(imageSlide);
      let template = `
        <div class="carousel__slide" data-id="penang-shrimp">
        <img src="${this.imageSlide}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.title}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
       `;
      this.elem.insertAdjacentHTML(`beforeend`, template);
    }
  }
}
