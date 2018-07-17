'use strict';

(function () {

  var MAP_PIN_BUTTON_START_LEFT = 570;
  var MAP_PIN_BUTTON_START_TOP = 375;
  var pinMainElement = window.pin.map.querySelector('.map__pin--main');

  var getMainButtonCoordinate = function () {
    var mapPinButtonCoordinate = Math.floor((parseInt(pinMainElement.style.left, 10) + pinMainElement.offsetWidth / 2)) + ' , '
    + Math.floor((parseInt(pinMainElement.style.top, 10) + pinMainElement.offsetWidth / 2));

    window.formOut.inputAddress.value = mapPinButtonCoordinate;
    return mapPinButtonCoordinate;
  };

  var getPinMainCoordinate = function () {
    var mapPinMainCoordinate = Math.floor((parseInt(pinMainElement.style.left, 10) + pinMainElement.offsetWidth / 2)) + ' , '
    + Math.floor((parseInt(pinMainElement.style.top, 10) + pinMainElement.offsetHeight + window.util.variablesConst.PIN_TIP_HEIGHT));

    return mapPinMainCoordinate;
  };

  var activatePage = function () {
    window.pin.map.classList.remove('map--faded');
    window.formOut.form.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.formOut.fieldset.length; i++) {
      window.formOut.fieldset[i].removeAttribute('disabled');
    }

    window.formOut.inputAddress.value = getPinMainCoordinate();

    var onSuccessLoad = function (dataServer) {
      window.pins = dataServer;
      window.pin.createPins(window.pins, window.util.variablesConst.QUANTITY_PINS);
    };

    window.backend.requestData(window.util.variablesConst.URL_GET, 'GET', null, onSuccessLoad,
        window.util.loadErrorPopup);

    pinMainElement.addEventListener('mousedown', window.dragAndDrop.onMapPinMainMove);
    pinMainElement.removeEventListener('mouseup', onButtonMainPinClick);
    pinMainElement.removeEventListener('keydown', onButtonMainPinKeyDown);
  };

  var onButtonMainPinClick = function () {
    activatePage();
  };

  var onButtonMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
      activatePage();
    }
  };

  var showPage = function () {
    pinMainElement.addEventListener('mouseup', onButtonMainPinClick);
    pinMainElement.addEventListener('keydown', onButtonMainPinKeyDown);
  };


  var getInputsDisabled = function () {
    for (var i = 0; i < window.formOut.fieldset.length; i++) {
      window.formOut.fieldset[i].setAttribute('disabled', '');
    }
  };

  var resetMapAndForm = function () {
    window.pin.map.classList.add('map--faded');
    window.formOut.form.classList.add('ad-form--disabled');
    getInputsDisabled();
    pinMainElement.style.left = MAP_PIN_BUTTON_START_LEFT + 'px';
    pinMainElement.style.top = MAP_PIN_BUTTON_START_TOP + 'px';
    window.pinsWrapperElement.innerHTML = '';
    window.card.setClosePopup();
    window.formOut.form.reset();
    getMainButtonCoordinate();
    showPage();
    window.formOut.changeType();
    window.filter.mapFilters.reset();
  };

  var onButtonResetClick = function () {
    resetMapAndForm();
  };

  var onButtonResetKeydown = function (evt) {
    if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
      resetMapAndForm();
    }
  };

  var setReset = function () {
    var resetButtonElement = window.formOut.form.querySelector('.ad-form__reset');

    resetButtonElement.addEventListener('click', onButtonResetClick);
    resetButtonElement.addEventListener('keydown', onButtonResetKeydown);
  };

  var initMap = function () {
    showPage();
    setReset();
    getMainButtonCoordinate();
  };

  initMap();

  window.map = {
    pinMain: pinMainElement,
    getPinMainCoordinate: getPinMainCoordinate,
    resetMapAndForm: resetMapAndForm
  };

})();