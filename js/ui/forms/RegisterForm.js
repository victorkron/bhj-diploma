/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options = this.submit() ) {
    let arr_input = Array.from(this.element.querySelectorAll('input'));
    User.register(options.data, (err, response) => {
      if (response.success) {
        arr_input.forEach((item, i) => {
          item.value = '';
        });

        App.setState('user-logged');

        let modal = new Modal(this.element.closest('#modal-register'));
        modal.close();
      } else {
        console.log(response);
      }

    });
  }
}
