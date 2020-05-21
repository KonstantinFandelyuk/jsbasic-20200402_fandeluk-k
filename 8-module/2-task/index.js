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
  }
  render() {
    for (let card of this.products) {
      let itemCard = new ProductCard(card);
      this.productGridInner.insertAdjacentElement(`beforeend`, itemCard.elem);
    }
  }
  updateFilter(filters) {
    document.querySelector(".products-grid__inner").innerHTML = "";
    for (let card of this.products) {
      let itemCard = new ProductCard(card);

      if (filters.noNuts === true) {
        if (card.nuts === false || card.nuts === undefined) {
          this.productGridInner.insertAdjacentElement(
            `beforeend`,
            itemCard.elem
          );
        }
      }
      if (filters.vegeterianOnly === true) {
        if (card.vegeterian === true || card.vegeterian != undefined) {
          this.productGridInner.insertAdjacentElement(
            `beforeend`,
            itemCard.elem
          );
        }
      }
      if (card.spiciness <= filters.maxSpiciness) {
        this.productGridInner.insertAdjacentElement(`beforeend`, itemCard.elem);
      }
      if (filters.category === card.category) {
        this.productGridInner.insertAdjacentElement(`beforeend`, itemCard.elem);
      }
    }
  }
}
