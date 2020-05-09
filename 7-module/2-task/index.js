import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    // Получаем элементы
    let modal = document.createElement("div");
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
    this.modal = modal;
    // Методы
    this.modal.insertAdjacentHTML(`beforeend`, template);
    this.modal.addEventListener("click", (event) => this.closeX(event));
    document.body.addEventListener("keydown", (event) =>
      this.closeEscape(event)
    );
    //
  }
  setTitle(title) {
    let titleElement = this.modal.querySelector(".modal__title");
    console.log(titleElement);
    titleElement.textContent = title;
  }
  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.modal);
  }
  setBody(modalBody) {
    let bodyElement = this.modal.querySelector(".modal__body");
    bodyElement.innerHTML = "";
    bodyElement.append(modalBody);
  }
  closeX(event) {
    let close = event.target.closest(".modal__close");
    if (close) {
      document.body.classList.remove("is-modal-open");
      this.modal.remove();
    }
  }
  closeEscape(event) {
    if (
      (event.key === "Escape" || event.keyCode === 27) &&
      document.body.classList.contains("is-modal-open")
    ) {
      document.body.classList.remove("is-modal-open");
      this.modal.remove();
    }
  }
  close() {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
  }
}
