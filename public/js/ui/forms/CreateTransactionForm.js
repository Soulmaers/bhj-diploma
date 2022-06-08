/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      function ListAccount(el) {
        if (document.querySelectorAll(`#new-${el}-form option`)) {
          Array.from(document.querySelectorAll(`#new-${el}-form option`)).forEach(elem =>
            elem.remove());
        }
        Account.list(User.current(), (response) => {
          if (response.success) {
            let selectIncome = document.querySelector(`#${option}-accounts-list`);
            if (!document.querySelector(`#${option}-accounts-list option`)) {
              response.data.forEach((elem) => {
                const option = `<option value="${elem.id}">${elem.name}</option>`
                selectIncome.insertAdjacentHTML('beforeEnd', option);
              });
            }
          }
        });
      }
      const createIncome = document.querySelector('.create-income-button');
      const createExpense = document.querySelector('.create-expense-button');
      if (this.element.getAttribute('id') === 'new-income-form') {
        createIncome.addEventListener('click', () => ListAccount('income'));
      }
      if (this.element.getAttribute('id') === 'new-expense-form') {
        createExpense.addEventListener('click', () => ListAccount('expense'));
      }
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (responce) => {
      if (responce.success) {
        this.element.reset();
        let formAtt = this.element.closest('.modal').getAttribute('id');
        if (formAtt === 'modal-new-income') {
          App.getModal('newIncome').close();
        }
        if (formAtt === 'modal-new-expense') {
          App.getModal('newExpense').close();
        }
        App.update();
      }
    });

  }
}