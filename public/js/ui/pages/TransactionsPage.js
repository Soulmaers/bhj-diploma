/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    this.element = element;
    if (!element) {
      throw new Error('Ошибка')
    }
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions);
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAcc = this.element.querySelector('.remove-account')
    removeAcc.addEventListener('click', () => {
      this.removeAccount();
    })
    let removeElem = this.element;
    removeElem.addEventListener('click', (e) => {
      let removeTran = e.target.closest('.transaction__remove');
      if (removeTran) this.removeTransaction(removeTran.dataset.id);
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      const confirm = confirm('Вы действительно хотите удалить счёт?');
      if (confirm) {
        let id = this.lastOptions.account_id;
        Account.remove([id], (response) => {
          if (response) {
            App.updateWidgets();
            App.updateForms();
          }
        });
        this.clear();
      }

    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    let confirm = confirm('Вы действительно хотите удалить эту транзакцию?')
    if (confirm) {
      Transaction.remove({ id }, (response) => {
        if (response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.lastOptions = options;
      Account.get(options.account_id, (response) => {
        if (response.success) {
          this.renderTitle(response.data.name);
        }
      });
      Transaction.list(options, (response) => {
        if (response.success) {
          this.renderTransactions(response.data);
        }
      });

      return this.lastOptions;
    }
  }
  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    const title = document.querySelector('.content-title').textContent = 'Название счёта';
    this.renderTitle(title);
    this.lastOptions = undefined;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let dateTran = new Date(date);
    return `${dateTran.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })} в ${dateTran.toLocaleTimeString().slice(0, -3)}`;
  }


  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    return `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
          <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
          <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>
    `
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let listTran = this.element.querySelectorAll('.transaction');
    Array.from(listTran).forEach(elem =>
      elem.remove());
    const content = this.element.querySelector('.content');
    data.forEach(elem => content.insertAdjacentHTML('afterBegin', this.getTransactionHTML(elem)));
  }
}