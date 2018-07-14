'use strict';

(function () {

  var PRICE_MIN_BUNGALO = 0;
  var PRICE_MIN_FLAT = 1000;
  var PRICE_MIN_HOUSE = 5000;
  var PRICE_MIN_PALACE = 10000;

  var form = document.querySelector('.ad-form');
  var formFieldset = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('input[name="address"]');
  var timeIn = form.elements.timein;
  var timeOut = form.elements.timeout;
  var room = form.elements.rooms;
  var capacity = form.elements.capacity;

  var changeType = function (evt) {
    var inputPrice = form.elements.price;
    var price = {
      bungalo: PRICE_MIN_BUNGALO,
      flat: PRICE_MIN_FLAT,
      house: PRICE_MIN_HOUSE,
      palace: PRICE_MIN_PALACE
    };
    var newMinPrice = price[evt.target.value];
    inputPrice.min = newMinPrice;
    inputPrice.placeholder = newMinPrice;
  };

  var onTypeAndPriceChange = function (evt) {
    changeType(evt);
  };

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  var changeRoomAndCapacity = function () {
    var validationRoomsAndCapacity = {
      1: ['1'],
      2: ['2', '1'],
      3: ['3', '2', '1'],
      100: ['0']
    };
    var selectRoom = room.options[room.selectedIndex].value;
    var selectCapacity = capacity.options[capacity.selectedIndex].value;
    var isCapasityFalse = validationRoomsAndCapacity[selectRoom].indexOf(selectCapacity) === -1;
    if (isCapasityFalse) {
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат,' +
      'при выборе 100 комнат - возможно выбрать только вариант "не для гостей"');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var onRoomAndCapacityChange = function () {
    changeRoomAndCapacity();
  };

  var changeFieldsetForm = function () {
    var homeType = form.elements.type;
    homeType.addEventListener('change', onTypeAndPriceChange);
    timeIn.addEventListener('change', onTimeInChange);
    timeOut.addEventListener('change', onTimeOutChange);
    room.addEventListener('change', onRoomAndCapacityChange);
    capacity.addEventListener('change', onRoomAndCapacityChange);
  };


  changeRoomAndCapacity();
  changeFieldsetForm();


  window.form = {
    form: form,
    inputAddress: inputAddress,
    formFieldset: formFieldset
  };

})();
