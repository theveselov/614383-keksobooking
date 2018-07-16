'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PHOTOS_WIDTH = 45;
  var PHOTOS_HEIGHT = 40;


  var cardTemplate = document.querySelector('template');
  var mapCard = cardTemplate.content.querySelector('.map__card');


  var cardElement = mapCard.cloneNode(true);

  var renderCard = function (advert) {
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = advert.offer.type;
    var cardRooms;
    switch (advert.offer.rooms) {
      case 1:
        cardRooms = 'комната';
        break;
      case 5:
        cardRooms = 'комнат';
        break;
      default:
        cardRooms = 'комнаты';
        break;
    }
    var cardGuests;
    switch (advert.offer.guests) {
      case 1:
        cardGuests = 'гостя';
        break;
      default:
        cardGuests = 'гостей';
        break;
    }
    cardElement.querySelector('.popup__text--capacity').textContent =
  advert.offer.rooms + ' ' + ' ' + cardRooms + ' ' + 'для' + ' ' + advert.offer.guests + ' ' + cardGuests;
    cardElement.querySelector('.popup__text--time').textContent =
  'Заезд после' + ' ' + advert.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + advert.offer.checkout;
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
    cardElement.querySelector('.popup__features').appendChild(createFeaturesElement(advert.offer.features));
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    var photoList = cardElement.querySelector('.popup__photos');
    var createPhotos = function () {
      for (var j = 0; j < advert.offer.photos.length; j++) {
        var photoElement = document.createElement('img');
        photoElement.classList.add('.popup__photo');
        photoElement.width = PHOTOS_WIDTH;
        photoElement.height = PHOTOS_HEIGHT;
        photoElement.alt = 'Фотография жилья';
        photoElement.src = advert.offer.photos[j];
        photoElement.style.marginRight = '5' + 'px';
        photoList.appendChild(photoElement);
      }
      return photoElement;
    };
    photoList = createPhotos();
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    cardElement.classList.remove('hidden');
    return cardElement;
  };


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      setCloseCard();
    }
  };


  var setCloseCard = function () {
    cardElement.classList.add('hidden');
  };

  var onButtonCloseCardClick = function () {
    setCloseCard();
  };

  var onButtonCloseCardKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setCloseCard();
    }
  };

  var closeCard = function () {
    var cardClose = cardElement.querySelector('.popup__close');
    cardClose.addEventListener('click', onButtonCloseCardClick);
    cardClose.addEventListener('keydown', onButtonCloseCardKeydown);
    document.removeEventListener('keydown', onPopupEscPress);
  };


  closeCard();


  window.card = {
    template: cardTemplate,
    renderCard: renderCard,
    onPopupEscPress: onPopupEscPress,
    enterKeycode: ENTER_KEYCODE,
    cardElement: cardElement
  };

})();
