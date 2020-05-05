import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    // Получаем элементы
    let container = document.querySelector(".container");
    let title1 = container.querySelector(".modal__title");
    this.title1 = title1;
    console.log(title1);
    //
    let template = `  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>
      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>`;
    // Делаем ссылки на элементы
    this.template = template;
    this.container = container;
    // Методы
  }
  setTitle(title) {
    // let title1 = this.container.querySelector("h3");
    // // title1.textContent = `${title}`;
    // console.log(title1);
  }
  open() {
    document.body.classList.toggle("is-modal-open");
    this.container.insertAdjacentHTML(`beforeend`, this.template);
  }
}
