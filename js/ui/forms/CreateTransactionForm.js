/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let user = User.current();
    let selectIncome = this.element.querySelector('#income-accounts-list');
    let selectExpense = this.element.querySelector('#expense-accounts-list');
    let select;

    if (selectIncome !== null) {
      select = selectIncome;
    } else if (selectExpense !== null) {
      select = selectExpense;
    }

    Account.list(user, (err, response) => {
      if (response.success) {
        select.innerHTML = '';
        response.data.forEach((item, i) => {
          select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        });
      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options = this.submit() ) {
    let arr_input = Array.from(this.element.querySelectorAll('input'));
    let selectIncome = this.element.querySelector('#income-accounts-list');
    let selectExpense = this.element.querySelector('#expense-accounts-list');
    let select;
    let str;
    let type;
    let id;

    if (selectIncome !== null) {
      type = 'income';
      select = selectIncome;
      str = '#modal-new-income';
    } else if (selectExpense !== null) {
      type = 'expense';
      select = selectExpense;
      str = '#modal-new-expense';
    }

    options.data.account_id = select.value;
    options.data.type = type;

    Transaction.create(options.data, (err, response) => {
      console.log(User.current());
      console.log(options.data);

      if (response.success) {
        console.log(response);
        arr_input.forEach((item, i) => {
          item.value = '';
        });

        let modal = new Modal(this.element.closest(str));
        modal.close();

        App.update();

      } else {
        console.log(response);
      }

    });
  }
}
