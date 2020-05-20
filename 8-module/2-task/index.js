import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    let productGrid = document.createElement("div");
    let productGridInner = document.createElement("div");
    //
    productGrid.classList.add("products-grid");
    productGridInner.classList.add("products-grid__inner");
    //
    this.elem = productGrid;
    this.productGridInner = productGridInner;
    this.elem.append(this.productGridInner);
    //
    this.render(products);
    this.updateFilter(this.filters);
  }
  render() {
    for (let card of this.products) {
      this.imageUrl = `/assets/images/products/${card.image}`;
      let template = `
      <div class="card">
      <div class="card__top">
          <img src="${this.imageUrl}" class="card__image" alt="product">
          <span class="card__price">€${card.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${card.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
      </div>
     `;
      this.productGridInner.insertAdjacentHTML(`beforeend`, template);
    }
  }
  updateFilter(filters) {
    for (let card of this.products) {
      if (filters.noNuts == card.nuts) {
        console.log(card);
      }
    }
  }
}
