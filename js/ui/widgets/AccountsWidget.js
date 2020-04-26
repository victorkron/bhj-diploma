/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element == undefined || element == null) {
      console.error('ErrorAsyncFormConstructor');
    }
    this.element = element;
    this.update();
    //this.registerEvents(); // Перенесла в метод update(), т.к. надо, чтобы registerEvents() срабатывал после отприсовки боковых эелементов
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let openWindow = this.element.querySelector('.create-account');
    openWindow.addEventListener('click', event => {
      event.preventDefault();
      App.getModal('createAccount').open();
    });

    let arr_li = Array.from(this.element.querySelectorAll('.account'));
    let fun = this.onSelectAccount;

    arr_li.forEach((item, i) => {
      item.addEventListener('click', event => {
        event.preventDefault();
        fun(item);
      });

    });

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();
    if (user == undefined) {
      console.error('Пользователь не авторизован');
      return false;
    }



    let fun = (item) => { this.renderItem(item) };

    Account.list(user, (err, response) => {
      if (response.success) {
        this.clear();
        response.data.forEach((item, i) => {
          fun(item);
        });
        this.registerEvents();
      }
    });

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let arr = Array.from(this.element.querySelectorAll('.account'));
    let elem = this.element;

    arr.forEach((item, i) => {
      elem.removeChild(item);
    });

  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let arr_li = Array.from(element.closest('ul').querySelectorAll('li'));

    arr_li.forEach((item, i) => {
      item.classList.remove('active');
    });

    element.classList.add('active');

    App.showPage('transactions', { account_id: element.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let li = document.createElement('li');
    //li.classList.add('active');
    li.classList.add('account');
    li.dataset.id = item.id;

    let str = `<a href="#"><span>${item.name}</span> / <span>${item.sum} ₽</span></a>`;

    li.innerHTML = str;

    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    let fun = this.getAccountHTML;
    let htmlElement = fun(item);
    this.element.appendChild(htmlElement);
  }
}
