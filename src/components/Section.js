export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderInitialCards() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addInitialItems(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
