/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  try {
    let xhr = new XMLHttpRequest();
    let formData = null;

    if (options.method == 'GET') {
      let str = `${options.url}?`;
      for (let variable in options.data) {
        str += `${variable}=${options.data[variable]}&`
      }
      str = str.substring(0, str.length-1) // Для удаления последнего символа '&'
      xhr.open(options.method, str);
    } else {
      formData = new FormData();
      for (let variable in options.data) {
        formData.append(variable, options.data[variable]);
      }
      xhr.open(options.method, options.url);
    }

    xhr.addEventListener('readystatechange', event => {
      if (xhr.readyState == xhr.DONE) {
        let response = xhr.response;
        options.callback(null, response);
      }
    });

    for (var variable in options.headers) {
      xhr.setRequestHeader(variable, options.headers[variable]);
    }

    xhr.responseType = options.responseType;
    xhr.send(formData);

    return xhr;

  } catch (error) {
    options.callback(error);
    console.log(error);
  }

};
