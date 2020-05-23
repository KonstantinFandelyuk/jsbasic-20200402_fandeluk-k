export default class StepSlider {
  constructor({ steps, value = 0 }) {
    //
    let container = document.querySelector(".container");
    this.container = container;
    let slider = document.createElement("div");
    slider.classList.add("slider");
    this.steps = steps;
    this.value = value;
    this.elem = slider;
    //
    let template = `
    <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
      <span class="slider__value">0</span>
      </div>
    <!--Полоска слайдера-->
      <div class="slider__progress"></div>
    <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
      <!-- текущий выбранный шаг выделен этим классом -->
      <span class="slider__step-active"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
    `;
    this.container.append(this.slider);
    this.elem.insertAdjacentHTML(`beforeend`, template);
    //
    this.elem.addEventListener("click", (event) => this.StepSlider(event));
  }
  StepSlider() {
    // Для начала определим расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика. Мы будем использовать координаты относительно окна. Возьмем координату по горизонтали (из свойства clientX объекта события) и вычтем из нее координату крайней левой точки слайдера, которую получим с помощью метода getBoundingClientRect():
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    // В итоге мы получим расстояние в пикселях от начала слайдера до места клика. Но нам нужно выбрать значение слайдера из дипазона – 0, 1, 2, 3, 4. Поэтому рассчитаем относительное значение, взяв за основу ширину слайдера:
    let leftRelative = left / this.elem.offsetWidth;
    // Полученное значение будет в диапазоне от 0 до 1, ведь клик был внутри слайдера.
    // Как вы помните, нам нужно получить конкретное значение слайдера (0, 1, 2, 3, 4). Для этого возьмем полученное значение (переменная leftRelative) и умножим его на количество сегментов:
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    // В итоге вероятнее всего вы получите некое дробное значение, например: 1.2345, 3.442 или подобное. При этом оно не будет меньше 0 и не больше максимально возможного значения слайдера, для нашего примера – это 4. Чтобы получить конкретно значение, которое нужно задать слайдеру, округлим дробное значение по правилам математики:
    this.value = Math.round(approximateValue);
    // Его мы и будем использовать для отображения в слайдере, как это требуется выше.
    // Чтобы получить значение в процентах для перемещения ползунка и закрашивания заполненной области, выполним обратное преобразование, разделив value на количество сегментов и умножив на 100:
    let valuePercents = (this.value / segments) * 100;
    //
    let leftPercents = valuePercents; // Значение в процентах от 0 до 100

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let StepSliderElement = document.querySelector(".slider__steps");
    let span = StepSliderElement.querySelectorAll("span");
    this.elem.querySelector(".slider__value").innerHTML = this.value;

    span.forEach((item) => {
      item.classList.remove("slider__step-active");
    });

    if (progress) {
      if (this.value <= span.length - 1) {
        span[this.value].classList.add("slider__step-active");
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
      }
    }

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
