/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options = this.submit() ) {
    let arr_input = Array.from(this.element.querySelectorAll('input'));
    
    User.login(options.data, (err, response) => {
      if (response.success) {
        arr_input.forEach((item, i) => {
          item.value = '';
        });

        App.setState('user-logged');

        let modal = new Modal(this.element.closest('#modal-login'));
        modal.close();
      } else {
        console.log(response);
      }

    });
  }
}
