import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    let card = document.createElement("div");
    card.classList.add("card");
    this.elem = card;
    this.id = product.id;
    this.render(product);
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }

  render(product) {
    this.imageUrl = `/assets/images/products/${product.image}`;
    let template = `
    <div class="card__top">
        <img src="${this.imageUrl}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
   `;
    this.elem.insertAdjacentHTML(`beforeend`, template);
  }

  onClick(event) {
    if (event.target.closest(".card__button")) {
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: this.id, // Уникальный идентификатора товара из объекта товара
          bubbles: true, // это событие всплывает - это понадобится в дальнейшем
        })
      );
    }
  }
}
