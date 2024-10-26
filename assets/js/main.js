document.addEventListener('DOMContentLoaded', function() {
  // Функция запуска таймера
  function startCountdownByClass(className) {
    document.querySelectorAll('.' + className).forEach(timerElement => {
      let [minutes, seconds] = timerElement.textContent.split(":").map(Number);

      const countdown = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          alert("Время вышло!");
          return;
        }

        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }

        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }, 1000);
    });
  }

  startCountdownByClass("timer");

  // Сокращение текста в элементах
  document.querySelectorAll('.c-modal__number-value span').forEach(element => {
    let originalText = element.textContent.trim();
    if (originalText.length > 12) {
      element.textContent = `${originalText.substring(0, 7)}.....${originalText.slice(-5)}`;
    }
  });

  // Переключение активного класса на родительском элементе
  function toggleActiveClass(element, parentSelector) {
    const parent = element.closest(parentSelector);
    if (parent) parent.classList.toggle('active');
  }

  document.querySelectorAll('.c-modal__number-value').forEach(element => {
    element.addEventListener('click', () => toggleActiveClass(element, '.c-modal__number'));
  });

  document.querySelectorAll('.c-popup_m--close, .c-popup_m--copy').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
      const parent = closeButton.closest('.c-modal__number');
      if (parent) parent.classList.remove('active');
    });
  });

  // реквизиты показать/скрыть
  const actionRequisitesBtn = document.querySelectorAll('.actionRequisitesBtn');

  actionRequisitesBtn.forEach(button => {
    button.addEventListener('click', function() {
      const parent = button.closest('.c-modal--wrap');
      const content = parent.querySelector('.actionRequisites');

      button.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  // Копирование текста и отображение сообщения
  function copyTextAndShowMessage(button, textElementSelector, message) {
    const modalWrap = button.closest('.c-modal--wrap');
    const textElement = modalWrap.querySelector(textElementSelector);
    const textToCopy = textElement.textContent.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      const popupCopy = modalWrap.querySelector('.c-modal--popup-copy');
      popupCopy.innerHTML = `<img src="assets/icon/copy-white.svg" alt="copy"> ${message}`;
      popupCopy.classList.add('visible');
      setTimeout(() => popupCopy.classList.remove('visible'), 1500);
    }).catch(err => console.error('Ошибка копирования текста: ', err));
  }

  document.querySelectorAll('.c-popup_m--copy').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.number', 'Номер платежа скопирован'));
  });

  document.querySelectorAll('.btnCopyPhone').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.copyPhone', 'Номер телефона скопирован'));
  });

  document.querySelectorAll('.btnCopySum').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.copySum', 'Сумма скопирована'));
  });

  document.querySelectorAll('.btnCopyNumberCard').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.copyNumberCard', 'Номер карты скопирован'));
  });

  document.querySelectorAll('.btnCopyNumberId').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.copyNumberId', 'Номер ID скопирован'));
  });

  document.querySelectorAll('.btnCopyName').forEach(button => {
    button.addEventListener('click', () => copyTextAndShowMessage(button, '.copyName', 'Имя скопировано'));
  });

  // Переключение активного элемента списка и управление кнопкой
  const listItems = document.querySelectorAll('.c-list--item');
  const modalBtn = document.querySelector('.c-modal__btn');

  listItems.forEach(item => {
    item.addEventListener('click', function() {
      listItems.forEach(i => i.classList.remove('active'));
      this.classList.toggle('active');

      modalBtn.classList.toggle('disabled', !document.querySelector('.c-list--item.active'));
    });
  });

  // Открытие модального окна по кнопке
  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal-id');
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.style.display = 'flex';   // Показать модальное окно
        modal.classList.remove('fade-out'); // Убираем анимацию закрытия, если была
        modal.classList.add('fade-in');  // Анимация открытия (опционально)
      }
    });
  });

// Закрытие модального окна по кнопке
  document.querySelectorAll('.btnModalClose').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.c-modal');

      if (modal) {
        modal.classList.remove('fade-in');  // Убираем анимацию открытия
        modal.classList.add('fade-out');    // Добавляем анимацию закрытия
        setTimeout(() => modal.style.display = 'none', 300);  // Закрываем через 300ms (по окончанию анимации)
      }
    });
  });

  // Таймер для кнопки
  const button = document.querySelector('.btnActiveTimer');
  const timeSpan = button.querySelector('.btnActiveTimer span');
  let [minutes, seconds] = timeSpan.textContent.trim().split(':').map(Number);

  function updateTimer() {
    if (minutes === 0 && seconds === 0) {
      button.classList.remove('disabled');
      timeSpan.textContent = '';
      return;
    }

    if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    timeSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  setInterval(updateTimer, 1000);

  // Обработка ввода суммы
  const sumElement = document.querySelector('span.sum');
  const copySumElement = document.querySelector('.copy-sum');
  const sumInput = document.querySelector('input#sum');
  const inputInner = document.querySelector('.c-input__input-inner');
  const errorMessage = document.querySelector('.errorMessage');
  const confirmButton = document.querySelector('.btnConfirmForm');

  if (sumElement && copySumElement && sumInput) {
    const sumValue = parseFloat(sumElement.textContent.trim());
    copySumElement.textContent = sumValue;
    sumInput.placeholder = sumValue;

    sumInput.addEventListener('focus', () => inputInner.classList.add('focus'));

    sumInput.addEventListener('input', function() {
      const inputValue = parseFloat(this.value);

      inputInner.classList.toggle('focus', inputValue >= sumValue || this.value.trim());
      inputInner.classList.toggle('danger', inputValue < sumValue);
      errorMessage.classList.toggle('active', inputValue < sumValue);
      confirmButton.classList.toggle('disabled', inputValue < sumValue);
    });
  }

  // Загрузка и отображение файлов
  const uploadButton = document.querySelector('#uploadButton');
  const fileInput = document.querySelector('#fileInput');
  const cardWrap = document.querySelector('.c-input--card');
  const deleteButton = document.querySelector('#btnDeleteFile');
  const fileBig = document.querySelector('.fileBig');
  const fileBigContent = document.querySelector('.fileBig .c-modal--open-check');
  const btnModalCloseFile = document.querySelector('.fileBig .btnModalCloseFile');

  uploadButton.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', function() {
    Array.from(this.files).forEach(file => {
      const fileType = file.type;
      const fileReader = new FileReader();
      const cardItem = document.createElement('div');
      cardItem.className = 'c-input--card-item';

      if (fileType.startsWith('image/')) {
        fileReader.onload = e => {
          cardItem.innerHTML = `<img src="${e.target.result}" alt="img">`;
        };
        fileReader.readAsDataURL(file);
      } else if (fileType === 'application/pdf') {
        cardItem.innerHTML = `
          <div class="pdf-icon">
            <img src="assets/icon/pdf.svg" alt="pdf">
            <span>${file.name}</span>
          </div>`;
      } else {
        alert('Можно загрузить только JPG, PNG или PDF файлы.');
        return;
      }

      cardWrap.appendChild(cardItem);
      deleteButton.style.display = 'inline-flex';
    });

    fileInput.value = '';
  });

  cardWrap.addEventListener('click', event => {
    const target = event.target.closest('.c-input--card-item');
    if (target) {
      fileBig.classList.add('active');
      fileBigContent.innerHTML = target.innerHTML;
    }
  });

  btnModalCloseFile.addEventListener('click', () => fileBig.classList.remove('active'));

  document.querySelector('.btnModalClose').addEventListener('click', () => fileBig.classList.remove('active'));

  deleteButton.addEventListener('click', () => {
    while (cardWrap.firstChild) cardWrap.removeChild(cardWrap.firstChild);
    deleteButton.style.display = 'none';
  });
});
