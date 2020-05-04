import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    //  Создаем элементы на страницы
    let ribbonElement = document.createElement("div");
    let ribbonInnerElement = document.createElement("nav");
    //  Присваиваем классы для этих элементов
    ribbonElement.classList.add("ribbon");
    ribbonInnerElement.classList.add("ribbon__inner");
    // Выводим ссылки на элементы
    this.elem = ribbonElement;
    this.ribbonInner = ribbonInnerElement;
    // Добавляем элемент на страницу
    this.elem.append(this.ribbonInner);
    // Верска элемента
    this.renderMenu(categories);
    this.renderArrow();
    //
    this.elem.addEventListener("click", (event) => this.scrollMenu(event));
    this.ribbonInner.addEventListener("scroll", () => this.arrowSwich());
    this.elem.addEventListener("click", (event) => this.onClick(event));
  }
  renderMenu(categories) {
    for (let item of categories) {
      let templateLink = `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
      this.ribbonInner.insertAdjacentHTML(`beforeend`, templateLink);
    }
  }
  renderArrow() {
    let templateArrowRight = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    let templateArrowLeft = ` <button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>`;
    this.elem.insertAdjacentHTML(`beforeend`, templateArrowRight);
    this.elem.insertAdjacentHTML(`afterbegin`, templateArrowLeft);
  }
  scrollMenu() {
    let buttonRight = document.querySelector(".ribbon__arrow_right");
    let buttonLeft = document.querySelector(".ribbon__arrow_left");
    let button = event.target.closest(".ribbon__arrow");
    //
    if (!button) {
      return;
    }
    //
    if (button === buttonRight) {
      this.ribbonInner.scrollBy(350, 0);
    }
    if (button === buttonLeft) {
      this.ribbonInner.scrollBy(-350, 0);
    }
  }
  arrowSwich() {
    let buttonRight = document.querySelector(".ribbon__arrow_right");
    let buttonLeft = document.querySelector(".ribbon__arrow_left");
    //
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    //
    if (scrollRight <= 1) {
      buttonRight.classList.remove("ribbon__arrow_visible");
    } else {
      buttonRight.classList.add("ribbon__arrow_visible");
    }
    if (scrollLeft <= 1) {
      buttonLeft.classList.remove("ribbon__arrow_visible");
    } else {
      buttonLeft.classList.add("ribbon__arrow_visible");
    }
  }
  onClick(event) {
    let button = event.target.closest(".ribbon__arrow");
    if (!button) {
      event.preventDefault();
      let categoriesId = event.target.closest(".ribbon__item").dataset.id;
      let ribbonEl = event.target.closest(".ribbon__item");
      let ribbonItem = document.querySelectorAll(".ribbon__item");

      if (ribbonEl) {
        ribbonItem.forEach(function (element) {
          if (element.classList.contains("ribbon__item_active")) {
            element.classList.remove("ribbon__item_active");
          }
        });
        ribbonEl.classList.add("ribbon__item_active");
      }

      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: categoriesId, // Уникальный идентификатора товара из объекта товара
          bubbles: true, // это событие всплывает - это понадобится в дальнейшем
        })
      );
    } else {
      return false;
    }
  }
}
