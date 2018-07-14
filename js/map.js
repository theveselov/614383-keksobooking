'use strict';

(function () {

  var MAP_PIN_BUTTON_SIZE = 65;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 87;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');


  var getMainButtonCoordinate = function () {
    var mapPinButtonCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_BUTTON_SIZE / 2)) + ' , '
    + Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_BUTTON_SIZE / 2));
    window.form.inputAddress.value = mapPinButtonCoordinate;
    return mapPinButtonCoordinate;
  };

  var getPinMainCoordinate = function () {
    var mapPinMainCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2)) + ' , '
    + Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
    return mapPinMainCoordinate;
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    for (var i = 0; i < window.form.formFieldset.length; i++) {
      window.form.formFieldset[i].removeAttribute('disabled');
    }
    window.form.inputAddress.value = getPinMainCoordinate();
    window.pin.createPins(window.data.cards);
    mapPinMain.addEventListener('mousedown', mapPinMainHandler);
  };

  var onButtonMainPinClick = function () {
    activatePage();
  };

  var onButtonMainPinKeyDown = function (evt) {
    if (evt.keyCode === window.card.enterKeycode) {
      activatePage();
    }
  };

  var showPage = function () {
    mapPinMain.addEventListener('mouseup', onButtonMainPinClick);
    mapPinMain.addEventListener('keydown', onButtonMainPinKeyDown);
  };

  var deletePins = function () {
    var pins = document.querySelector('.map__pins');
    var buttons = pins.querySelectorAll('button');
    for (var j = 1; j < buttons.length; j++) {
      pins.removeChild(buttons[j]);
    }
  };

  var getInputsDisabled = function () {
    for (var i = 0; i < window.form.formFieldset.length; i++) {
      window.form.formFieldset[i].setAttribute('disabled', '');
    }
  };

  var resetMapAndForm = function () {
    map.classList.add('map--faded');
    window.form.form.classList.add('ad-form--disabled');
    getInputsDisabled();
    mapPinMain.style.left = '570' + 'px';
    mapPinMain.style.top = '375' + 'px';
    deletePins();
    window.card.cardElement.classList.add('hidden');
    window.form.form.reset();
    getMainButtonCoordinate();
  };

  var onButtonResetClick = function () {
    resetMapAndForm();
  };

  var onButtonResetKeydown = function (evt) {
    if (evt.keyCode === window.card.enterKeycode) {
      resetMapAndForm();
    }
  };
  var setReset = function () {
    var resetButton = window.form.form.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', onButtonResetClick);
    resetButton.addEventListener('keydown', onButtonResetKeydown);
  };


  var mapPinMainHandler = function (evt) {
    evt.preventDefault();
    var maxLeft = map.offsetWidth - MAP_PIN_MAIN_WIDTH;
    var minLeft = 0;
    var maxTop = map.offsetHeight - MAP_PIN_MAIN_HEIGHT;
    var minTop = 0;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newTop = mapPinMain.offsetTop - shift.y;
      var newLeft = mapPinMain.offsetLeft - shift.x;
      if (newLeft < minLeft) {
        newLeft = minLeft;
      } else if (newLeft > maxLeft) {
        newLeft = maxLeft;
      }
      if (newTop < minTop) {
        newTop = minTop;
      } else if (newTop > maxTop) {
        newTop = maxTop;
      }
      mapPinMain.style.left = newLeft + 'px';
      mapPinMain.style.top = newTop + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  getMainButtonCoordinate();
  showPage();
  setReset();


  window.map = {
    map: map,
    pinMain: mapPinMain,
    mainButtonCoordinate: getMainButtonCoordinate
  };

})();
