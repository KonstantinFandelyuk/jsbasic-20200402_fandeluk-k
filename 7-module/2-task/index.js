import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    // Получаем элементы
    let container = document.querySelector(".container");
    //
    let template = `
    <div class="modal">
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
    </div>
      `;
    // Делаем ссылки на элементы
    this.template = template;
    this.container = container;
    // Методы
    this.container.insertAdjacentHTML(`beforeend`, template);
    this.container.addEventListener("click", (event) => this.close(event));
    this.container.addEventListener("keydown", (event) =>
      this.closeModal(event)
    );
    //
  }
  setTitle(title) {
    let titleElement = this.container.querySelector(".modal__title");
    titleElement.textContent = `${title}`;
  }
  open() {
    document.body.classList.add("is-modal-open");
  }
  setBody(qwe) {
    let bodyElement = this.container.querySelector(".modal__body");
    bodyElement.innerHTML = "";
    bodyElement.innerHTML = `${qwe}`;
  }
  close(event) {
    let close = event.target.closest(".modal__close");
    let modal = document.querySelector(".modal");
    if (close) {
      document.body.classList.remove("is-modal-open");
      modal.remove();
    }
  }
  closeModal(event) {
    let modal = document.querySelector(".modal");
    if (event.code === "Escape") {
      document.body.classList.remove("is-modal-open");
      modal.remove();
    }
  }
}
