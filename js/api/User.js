/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static HOST = 'https://bhj-diplom.letsdocode.ru';
  static URL = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user == null) user = undefined;
    return user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let oldCallback = callback;
    let newCallback = (err, response) => {
      if (response.success == true) {
        User.setCurrent(response.user);
      } else {
        if (response.user == undefined) {
          User.unsetCurrent();
        }
      }

      oldCallback(err, response);
    }
    let xhr = createRequest({
      url: this.HOST + this.URL + '/current',
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: newCallback
    });

    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let oldCallback = callback;
    let newCallback = (err, response) => {
      if (response.success == true) {
        User.setCurrent(response.user);
      } else {
        console.error('Неверные E-mail или пароль');
      }

      oldCallback(err, response);
    }
    let xhr = createRequest({
      url: this.HOST + this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: newCallback
    });

    return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let oldCallback = callback;
    let newCallback = (err, response) => {
      if (response.success == true) {
        User.setCurrent(response.user);
      } else {
        console.error(response.error);
      }

      oldCallback(err, response);
    }
    let xhr = createRequest({
      url: this.HOST + this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: newCallback
    });

    return xhr;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let oldCallback = callback;
    let newCallback = (err, response) => {
      if (response.success == true) {
        User.unsetCurrent();
      } else {
        console.error('Система не вышла из аккаунта');
      }

      oldCallback(err, response);
    }
    let xhr = createRequest({
      url: this.HOST + this.URL + '/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: newCallback
    });

    return xhr;
  }
}
