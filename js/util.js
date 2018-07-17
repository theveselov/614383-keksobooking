'use strict';

(function () {

  var VariablesConst = {

    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    PIN_TIP_HEIGHT: 22,
    MAX_LIMIT_TOP: 500,
    MIN_LIMIT_TOP: 150,
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking',
    DEBOUNCE_INTERVAL: 500,
    QUANTITY_PINS: 5
  };

  var loadErrorPopup = function (errorMessage) {
    var popupElement = document.createElement('div');
    popupElement.classList.add('loadPopup');

    var errorMessageElement = document.createElement('p');
    errorMessageElement.classList.add('loadMessage');
    errorMessageElement.textContent = errorMessage;
    popupElement.appendChild(errorMessageElement);

    var loadPopupButtonElement = document.createElement('button');
    loadPopupButtonElement.classList.add('loadPopupButton');
    loadPopupButtonElement.textContent = 'Закрыть';
    popupElement.appendChild(loadPopupButtonElement);

    loadPopupButtonElement.addEventListener('click', function () {
      popupElement.style.display = 'none';
    });

    document.body.insertAdjacentElement('afterbegin', popupElement);
    return popupElement;
  };

  var debounce = function (fun, interval) {
    var lastTimeout;

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(fun, interval || VariablesConst.DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    debounce: debounce
  };

  window.util = {
    variablesConst: VariablesConst,
    loadErrorPopup: loadErrorPopup,
    debounce: debounce
  };

})();