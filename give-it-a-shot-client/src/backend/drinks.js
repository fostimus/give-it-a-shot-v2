import REACT_APP_API_URL from "../config/urls";

export default class DrinksApi {
  static getLiquor() {
    return fetch(`${REACT_APP_API_URL}/drinks/liquor`).then(res => res.json());
  }

  static nextQuestion(pageNumber) {
    return fetch(
      `${REACT_APP_API_URL}/drinks/question/${pageNumber}`
    ).then(res => res.json());
  }

  static getLiquorTypes() {
    return fetch(`${REACT_APP_API_URL}/drinks/liquor`).then(res => res.json());
  }

  static getResults(data) {
    return fetch(`${REACT_APP_API_URL}/drinks/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }

  static getDrinkDetails(drinkId) {
    return fetch(`${REACT_APP_API_URL}/drinks/${drinkId}`, {
      method: "GET"
    }).then(res => res.json());
  }

  static getRandomDrink() {
    return fetch(`${REACT_APP_API_URL}/drinks/random`, {
      method: "GET"
    }).then(res => res.json());
  }

  static getRandomLiquor(value) {
    return fetch(`${REACT_APP_API_URL}/drinks/random/liquor/${value}`, {
      method: "GET"
    }).then(res => res.json());
  }

  static getRandomColor(value) {
    return fetch(`${REACT_APP_API_URL}/drinks/random/color/${value}`, {
      method: "GET"
    }).then(res => res.json());
  }
}
