'use strict';

(function () {

  var PRICE_MIN_BUNGALO = 0;
  var PRICE_MIN_FLAT = 1000;
  var PRICE_MIN_HOUSE = 5000;
  var PRICE_MIN_PALACE = 10000;

  var formElement = document.querySelector('.ad-form');
  var fieldsetElement = formElement.querySelectorAll('fieldset');
  var inputAddressElement = formElement.querySelector('input[name="address"]');
  var homeTypeElement = formElement.elements.type;
  var timeInElement = formElement.elements.timein;
  var timeOutElement = formElement.elements.timeout;
  var roomElement = formElement.elements.rooms;
  var capacityElement = formElement.elements.capacity;

  var changeType = function () {
    var inputPriceElement = formElement.elements.price;

    var PriceMap = {
      bungalo: PRICE_MIN_BUNGALO,
      flat: PRICE_MIN_FLAT,
      house: PRICE_MIN_HOUSE,
      palace: PRICE_MIN_PALACE
    };

    inputPriceElement.min = PriceMap[homeTypeElement.value];
    inputPriceElement.placeholder = inputPriceElement.min;
  };

  var onTypeAndPriceChange = function () {
    changeType();
  };

  var onTimeInChange = function () {
    timeOutElement.value = timeInElement.value;
  };

  var onTimeOutChange = function () {
    timeInElement.value = timeOutElement.value;
  };

  var changeRoomAndCapacity = function () {
    var ValidationRoomsAndCapacity = {
      1: ['1'],
      2: ['2', '1'],
      3: ['3', '2', '1'],
      100: ['0']
    };

    var selectRoom = roomElement.options[roomElement.selectedIndex].value;
    var selectCapacity = capacityElement.options[capacityElement.selectedIndex].value;
    var isCapasityFalse = ValidationRoomsAndCapacity[selectRoom].indexOf(selectCapacity) === -1;

    if (isCapasityFalse) {
      capacityElement.setCustomValidity('Количество гостей не должно превышать количество комнат,' +
      'при выборе 100 комнат - возможно выбрать только вариант "не для гостей"');
    } else {
      capacityElement.setCustomValidity('');
    }
  };

  var onRoomAndCapacityChange = function () {
    changeRoomAndCapacity();
  };

  var changeFieldsetForm = function () {
    homeTypeElement.addEventListener('change', onTypeAndPriceChange);
    timeInElement.addEventListener('change', onTimeInChange);
    timeOutElement.addEventListener('change', onTimeOutChange);
    roomElement.addEventListener('change', onRoomAndCapacityChange);
    capacityElement.addEventListener('change', onRoomAndCapacityChange);
  };

  var onSuccessUpLoadForm = function () {
    var successBlockElement = document.querySelector('.success');

    successBlockElement.classList.remove('hidden');

    var successButtonElement = successBlockElement.querySelector('.success__button');

    successButtonElement.addEventListener('click', function () {
      successBlockElement.classList.add('hidden');
    });

    window.map.resetMapAndForm();
  };

  formElement.addEventListener('submit', function (evt) {
    window.backend.requestData(window.util.variablesConst.URL_POST, 'POST', new FormData(formElement), onSuccessUpLoadForm, window.util.loadErrorPopup);
    evt.preventDefault();
  });

  var initForm = function () {
    changeRoomAndCapacity();
    changeFieldsetForm();
    changeType();
  };

  initForm();

  window.formOut = {
    form: formElement,
    inputAddress: inputAddressElement,
    fieldset: fieldsetElement,
    changeType: changeType
  };

})();