export class UserInfo {
  constructor({ nameInputSelector, descriptionInputSelector }) {
    this._name = document.querySelector(nameInputSelector);
    this._description = document.querySelector(descriptionInputSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
