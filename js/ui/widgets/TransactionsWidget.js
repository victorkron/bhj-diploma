/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    let btnIncome = this.element.querySelector('.create-income-button');
    let btnExpense = this.element.querySelector('.create-expense-button');

    btnIncome.addEventListener('click', event => {
      App.getModal('newIncome').open();
    });

    btnExpense.addEventListener('click', event => {
      App.getModal('newExpense').open();
    });

  }
}
