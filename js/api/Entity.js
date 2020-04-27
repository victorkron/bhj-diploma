/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  static HOST = 'https://bhj-diplom.letsdocode.ru';
  static URL = '';

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let xhr = createRequest({
      url: this.HOST + this.URL,
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback
    });

    return xhr;
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let newData = Object.assign(data, { _method: 'PUT' });
    let xhr = createRequest({
      url: this.HOST + this.URL,
      data: newData,
      responseType: 'json',
      method: 'POST',
      callback: callback
    });

    return xhr;
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let newData = Object.assign(data, { id: id })

    let xhr = createRequest({
      url: this.HOST + this.URL,
      data: newData,
      responseType: 'json',
      method: 'GET',
      callback: callback
    });

    return xhr;
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let newData = Object.assign(data, { _method: 'DELETE', id: id })
    
    let xhr = createRequest({
      url: this.HOST + this.URL,
      data: newData,
      responseType: 'json',
      method: 'POST',
      callback: callback
    });

    return xhr;
  }
}
