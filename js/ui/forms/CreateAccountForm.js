/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options = this.submit() ) {

    let arr_input = Array.from(this.element.querySelectorAll('input'));
    Account.create(options.data, (err, response) => {
      if (response.success) {
        arr_input.forEach((item, i) => {
          item.value = '';
        });

        App.update();
        let modal = new Modal(this.element.closest('.modal'));
        modal.close();
      } else {
        console.log(response);
      }

    });
  }
}
