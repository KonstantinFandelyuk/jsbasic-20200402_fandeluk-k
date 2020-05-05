import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    // Получаем элементы
    let container = document.querySelector(".container");
    // Создаем элементы
    let modal = document.createElement("div");
    //
    modal.classList.add("modal");
    //
    let template = `
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
    </div>
      `;
    // Делаем ссылки на элементы
    this.template = template;
    this.container = container;
    this.modal = modal;
    // Методы
    this.container.append(this.modal);
  }
  setTitle() {
    console.log(this.modal.querySelector(".modal__title"));
  }
  open() {
    document.body.classList.toggle("is-modal-open");
    this.modal.insertAdjacentHTML(`beforeend`, this.template);
  }
}
