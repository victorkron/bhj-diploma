/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element == undefined || element == null) {
      console.error('ErrorTransactionsPageConstructor');
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let btnRemoveAccount = this.element.querySelector('.remove-account');
    let btnRemoveTransaction = this.element.querySelector('.transaction__remove');

    let remA = () => { this.removeAccount(); }
    let remT = this.removeTransaction;

    btnRemoveAccount.addEventListener('click', event => {
      remA();
    });

    /*if (btnRemoveTransaction !== null) { //  Перенесла идею этого блока в renderTransactions, т.к. renderTransactions срабатывает при каждом
                                           // добавлении на строницу новой транзакции, и обновляет события при клике на кнопки. Не получилось реализовать 
                                           // в этом методе, т.к. он почему-то срабатывает единожды, и если добавлять новые элементы в транзакции, то на
                                           // их кнопки обработчики не вешаются.
      btnRemoveTransaction.addEventListener('click', event => {
        remT(btnRemoveTransaction.dataset.id);
      });

    } else {
      console.log(12);
    }*/

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions == undefined || this.lastOptions == null) {

    } else {
      let bool = confirm('Вы действительно хотите удалить этот счет?');
      if (bool) {
        Account.remove(this.lastOptions.account_id, {}, (err, response) => {
          if (response.success) {
            App.update();
          }
        });

      } else {

      }

    }

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    let bool = confirm('Вы действительно хотите удалить этот счет?');
    if (bool) {
      Transaction.remove(id, {}, (err, response) => {
        if (response.success) {
          App.update();
        }
      });
    } else {

    }

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options == undefined || options == null) {

    } else {
      let arr_li = Array.from(document.querySelectorAll('.accounts-panel li')); // в options не передовался айди, поэтому пришлось импровизировать
      arr_li.forEach((item, i) => {
        if (item.classList.contains('active')){
          options.account_id = item.dataset.id;
        }
      });

      this.lastOptions = options;
      let renTitle = (param) => { this.renderTitle(param); }
      //let clear = () => { this.clear(); }
      let renTransactions = (item) => { this.renderTransactions(item); }
      let user = User.current();

      Account.get(options.account_id, {}, (err, response) => { // передается айди конкретного счета!
        if (response == null) {
          renTitle('Название счета');
        } else {
          renTitle(response.data.name);
        }

      });

      Transaction.list(options, (err, response) => { // передается айди конкретного счета!
        //clear();
        renTransactions(response.data);

      });

    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').innerHTML = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let month;
    switch (Number(date.substring(5, 7))) {
      case 1:
        month = 'января';
        break;
      case 2:
        month = 'февраля';
        break;
      case 3:
        month = 'марта';
        break;
      case 4:
        month = 'апреля';
        break;
      case 5:
        month = 'мая';
        break;
      case 6:
        month = 'июня';
        break;
      case 7:
        month = 'июля';
        break;
      case 8:
        month = 'августа';
        break;
      case 9:
        month = 'сентября';
        break;
      case 10:
        month = 'октября';
        break;
      case 11:
        month = 'ноября';
        break;
      case 12:
        month = 'декабря';
        break;
      default:

    }
    let str = date.substring(8, 10) + ' ' + month + ' ' + date.substring(0, 4) + ' г. в ' + date.substring(11, 13) + ':' + date.substring(14, 16);
    return str;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let classElem;
    if (item.type == 'expense') {
      classElem = 'transaction_expense';
    } else if (item.type == 'income') {
      classElem = 'transaction_income';
    }

    let strHtmlElem = `<div class="transaction ${classElem} row">`;
    strHtmlElem += `<div class="col-md-7 transaction__details">`;
    strHtmlElem += `<div class="transaction__icon"><span class="fa fa-money fa-2x"></span></div>`;
    strHtmlElem += `<div class="transaction__info"><h4 class="transaction__title">${item.name}</h4><div class="transaction__date">${this.formatDate(item.updated_at)}</div></div></div>`;
    strHtmlElem += `<div class="col-md-3"><div class="transaction__summ"> ${item.sum} <span class="currency">₽</span></div></div>`;
    strHtmlElem += `<div class="col-md-2 transaction__controls"><button class="btn btn-danger transaction__remove" data-id="${item.id}"><i class="fa fa-trash"></i></button></div>`;
    strHtmlElem += `</div>`;

    return strHtmlElem;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let elem = this.element.querySelector('.content');
    let fun = (item) => { return this.getTransactionHTML(item); }
    elem.innerHTML = '';
    data.forEach((item, i) => {
      elem.innerHTML += fun(item);
    });

    let removeT = (id) => { this.removeTransaction(id); }

    let arr_btn = Array.from(this.element.querySelectorAll('.transaction__remove'));

    arr_btn.forEach((item, i) => {
      item.addEventListener('click', event => {
        removeT(item.dataset.id);
      })
    });

  }
}
