'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var filtersBlockElement = mapElement.querySelector('.map__filters-container');

  var renderPin = function (data) {
    var mapPinElement = window.card.template.content.querySelector('.map__pin');
    var mapButtonElement = mapElement.querySelector('.map__pins button');
    var pinElement = mapPinElement.cloneNode(true);
    var pinX = data.location.x - mapButtonElement.offsetWidth / 2;
    var pinY = data.location.y - mapButtonElement.offsetHeight;

    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }

      mapElement.insertBefore(window.card.renderPopup(data), filtersBlockElement);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    };

    var onPinOpenCardClick = function (evt) {
      openCard(evt);
    };

    var onPinOpenCardKeydown = function (evt) {
      if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
        openCard(evt);
      }
    };

    pinElement.addEventListener('click', onPinOpenCardClick);
    pinElement.addEventListener('keydown', onPinOpenCardKeydown);
    return pinElement;
  };

  (function () {
    window.pinsWrapperElement = document.createElement('div');
    window.pinsWrapperElement.classList.add('pinsWrapper');
    mapElement.insertBefore(window.pinsWrapperElement, filtersBlockElement);
  })();

  var createPins = function (data, k) {
    var lengthPins = data.length >= k ? k : data.length;
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < lengthPins; i++) {
      pinFragment.appendChild(renderPin(data[i]));
    }
    window.pinsWrapperElement.appendChild(pinFragment);
  };

  window.pin = {
    map: mapElement,
    createPins: createPins,
  };

})();