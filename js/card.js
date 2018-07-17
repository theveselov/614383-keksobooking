'use strict';

(function () {

  var PHOTOS_WIDTH = 45;
  var PHOTOS_HEIGHT = 40;

  var cardTemplateElement = document.querySelector('template');
  var mapCardElement = cardTemplateElement.content.querySelector('.map__card');

  var cardElement = mapCardElement.cloneNode(true);

  var renderPopup = function (data) {
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    var TypesMap = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'};

    cardElement.querySelector('.popup__type').textContent = TypesMap[data.offer.type];

    var cardRooms;
    if (data.offer.rooms % 5 === 0) {
      cardRooms = 'комнат';
    } else if (data.offer.rooms === 1) {
      cardRooms = 'комната';
    } else {
      cardRooms = 'комнаты';
    }

    var cardGuests;
    switch (data.offer.guests) {
      case 1:
        cardGuests = 'гостя';
        break;
      default:
        cardGuests = 'гостей';
        break;
    }

    cardElement.querySelector('.popup__text--capacity').textContent =
  data.offer.rooms + ' ' + ' ' + cardRooms + ' ' + 'для' + ' ' + data.offer.guests + ' ' + cardGuests;
    cardElement.querySelector('.popup__text--time').textContent =
  'Заезд после' + ' ' + data.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + data.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';

    var createFeaturesElement = function (array) {
      var featuresFragment = document.createDocumentFragment();
      for (var j = 0; j < array.length; j++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + array[j]);
        featuresFragment.appendChild(featureElement);
      }
      return featuresFragment;
    };

    cardElement.querySelector('.popup__features').appendChild(createFeaturesElement(data.offer.features));
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';

    var photoList = cardElement.querySelector('.popup__photos');

    var createPhotos = function () {
      for (var j = 0; j < data.offer.photos.length; j++) {
        var photoElement = document.createElement('img');
        photoElement.classList.add('.popup__photo');
        photoElement.width = PHOTOS_WIDTH;
        photoElement.height = PHOTOS_HEIGHT;
        photoElement.alt = 'Фотография жилья';
        photoElement.src = data.offer.photos[j];
        photoElement.style.marginRight = '5' + 'px';
        photoElement.style.marginBottom = '5' + 'px';
        photoList.appendChild(photoElement);
      }
      return photoElement;
    };

    photoList = createPhotos();
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.classList.remove('hidden');
    return cardElement;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.variablesConst.ESC_KEYCODE) {
      setClosePopup();
    }
  };

  var setClosePopup = function () {
    cardElement.classList.add('hidden');
  };

  var onButtonCloseCardClick = function () {
    setClosePopup();
  };

  var onButtonCloseCardKeydown = function (evt) {
    if (evt.keyCode === window.util.variablesConst.ENTER_KEYCODE) {
      setClosePopup();
    }
  };

  (function () {
    var cardClose = cardElement.querySelector('.popup__close');

    cardClose.addEventListener('click', onButtonCloseCardClick);
    cardClose.addEventListener('keydown', onButtonCloseCardKeydown);
    document.removeEventListener('keydown', onPopupEscPress);
  })();

  window.card = {
    template: cardTemplateElement,
    renderPopup: renderPopup,
    onPopupEscPress: onPopupEscPress,
    setClosePopup: setClosePopup,
  };

})();