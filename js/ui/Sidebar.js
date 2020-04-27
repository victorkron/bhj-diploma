/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let toggleButton = document.querySelector('.sidebar-toggle');
    toggleButton.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('body.sidebar-mini').classList.toggle('sidebar-open');
      document.querySelector('body.sidebar-mini').classList.toggle('sidebar-collapse');
    });

    toggleButton.addEventListener('touchend', event => {
      event.preventDefault();
      document.querySelector('body.sidebar-mini').classList.toggle('sidebar-open');
      document.querySelector('body.sidebar-mini').classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let reg = document.querySelector('.menu-item_register a');
    reg.addEventListener('click', event => {
      App.getModal('register').open();
    });

    let login = document.querySelector('.menu-item_login a');
    login.addEventListener('click', event => {
      App.getModal('login').open();
    });

    let logout = document.querySelector('.menu-item_logout a');
    logout.addEventListener('click', event => {
      App.getModal('login').open();
      User.logout(User.current(), (err, response) => {
        if (response.success == true) {
          App.setState('init');
        }
      });
    });

  }

}
