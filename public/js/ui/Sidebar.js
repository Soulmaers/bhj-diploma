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
    const menu = document.querySelector('.sidebar-toggle');
    const skin = document.querySelector('body');
    menu.addEventListener('click', () => {
      skin.classList.toggle('sidebar-open');
      skin.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */

  static initAuthLinks() {
    const formLogin = document.querySelector(".menu-item_login");
    const formRegister = document.querySelector(".menu-item_register");
    const formLogout = document.querySelector(".menu-item_logout");
    const reg = App.getModal('register');
    const login = App.getModal('login');
    formRegister.addEventListener('click', () => {
      reg.open();
    })
    formLogin.addEventListener('click', () => {
      login.open();
    })
    formLogout.addEventListener('click', () => {
      User.logout();
      if (response.success = true) {
        App.setState('init');
      }
    })
  }
}