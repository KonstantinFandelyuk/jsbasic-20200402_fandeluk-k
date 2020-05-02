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
    let templateArrowLeft = ` <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
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
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    // console.log(`До нажатии на кнопку scrollWidth - ${scrollWidth},
    // scrollLeft - ${scrollLeft},
    // clientWidth - ${clientWidth},
    // scrollRight - ${scrollRight}`);
    if (!button) {
      return;
    }
    //

    if (button === buttonRight) {
      if (scrollRight > 0) {
        this.ribbonInner.scrollBy(350, 0);
        // console.log(
        //   "1-е scrollWidth - 2-e scrollLeft, 3-e clientWidth",
        //   this.ribbonInner.scrollWidth,
        //   this.ribbonInner.scrollLeft,
        //   this.ribbonInner.clientWidth
        // );
      }
    }
    if (button === buttonLeft) {
      if (this.ribbonInner.scrollLeft > 0) {
        this.ribbonInner.scrollBy(-350, 0);
        // console.log(
        //   this.ribbonInner.scrollWidth,
        //   this.ribbonInner.scrollLeft,
        //   this.ribbonInner.clientWidth
        // );
      }
    }

    scrollRight === 0
      ? buttonRight.classList.remove("ribbon__arrow_visible")
      : buttonRight.classList.add("ribbon__arrow_visible");
    //
    //
    scrollLeft <= 0
      ? buttonLeft.classList.remove("ribbon__arrow_visible")
      : buttonLeft.classList.add("ribbon__arrow_visible");
  }
}
