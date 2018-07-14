'use strict';

(function () {


  var renderPin = function (advert, i) {
    var mapPin = window.card.template.content.querySelector('.map__pin');
    var filtersBlock = window.map.map.querySelector('.map__filters-container');
    var pinElement = mapPin.cloneNode(true);
    var pinX = advert.location.x;
    var pinY = advert.location.y;
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    pinElement.setAttribute('data-index', i);
    var openCard = function (evt) {
      var target = evt.target;
      var buttonClick = target.closest('button');
      if (!buttonClick) {
        return;
      }
      window.map.map.insertBefore(window.card.renderCard(window.data.cards[i]), filtersBlock);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    };
    var onPinOpenCardClick = function (evt) {
      openCard(evt);
    };
    var onPinOpenCardKeydown = function (evt) {
      if (evt.keyCode === window.card.enterKeycode) {
        openCard(evt);
      }
    };
    pinElement.addEventListener('click', onPinOpenCardClick);
    pinElement.addEventListener('keydown', onPinOpenCardKeydown);
    return pinElement;
  };


  var createPins = function () {
    var pinBlock = window.map.map.querySelector('.map__pins');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.cards.length; i++) {
      pinFragment.appendChild(renderPin(window.data.cards[i], i));
    }
    pinBlock.appendChild(pinFragment);
  };


  window.pin = {
    createPins: createPins
  };

})();
