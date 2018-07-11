'use strict';

var QUANTITY_ADVERT = 8;
var X_COORDINATE_MIN = 300;
var X_COORDINATE_MAX = 900;
var Y_COORDINATE_MIN = 150;
var Y_COORDINATE_MAX = 500;
var DIFF_PIN_X = 50 / 2;
var DIFF_PIN_Y = 70;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ROOMS_QUANTITY = 5;
var GUESTS_QUANTITY = 10;

var MAP_PIN_BUTTON_SIZE = 65;
var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 87;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var PHOTOS_WIDTH = 45;
var PHOTOS_HEIGHT = 40;

var PRICE_MIN_BUNGALO = 0;
var PRICE_MIN_FLAT = 1000;
var PRICE_MIN_HOUSE = 5000;
var PRICE_MIN_PALACE = 10000;


var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES_OFFER = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'};

var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS_OFFER = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');


var cardTemplate = document.querySelector('template');
var mapCard = cardTemplate.content.querySelector('.map__card');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var getRandomValue = function (arr) {
  var max = arr.length - 1;
  var rand = Math.random() * (max + 1);
  rand = Math.floor(rand);
  return rand;
};


var getRandomSort = function (array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
};


var getRandomPhotos = function () {
  var photosArray = PHOTOS_OFFER.slice(0);
  getRandomSort(photosArray);
  return photosArray;
};


var getRandomArray = function () {
  var array = getRandomSort(FEATURES_OFFER);
  var arraySize = getRandomNumber(1, array.length);
  var newArray = [];
  for (var i = 0; i < arraySize; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};


var getrandomType = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};


var getAdvert = function () {
  var adverts = [];
  for (var i = 0; i < QUANTITY_ADVERT; i++) {
    var xСoordinate = getRandomNumber(X_COORDINATE_MIN, X_COORDINATE_MAX);
    var yСoordinate = getRandomNumber(Y_COORDINATE_MIN, Y_COORDINATE_MAX);
    adverts[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLES[getRandomValue(OFFER_TITLES)],
        address: xСoordinate + ',' + yСoordinate,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getrandomType(Object.keys(TYPES_OFFER)),
        rooms: getRandomNumber(1, ROOMS_QUANTITY),
        guests: getRandomNumber(1, GUESTS_QUANTITY),
        checkin: CHECKIN_OFFER[getRandomValue(CHECKIN_OFFER)],
        checkout: CHECKOUT_OFFER[getRandomValue(CHECKOUT_OFFER)],
        features: getRandomArray(),
        description: '',
        photos: getRandomPhotos()
      },
      location: {
        x: xСoordinate - DIFF_PIN_X,
        y: yСoordinate - DIFF_PIN_Y
      }
    };
  }
  return adverts;
};

var cards = getAdvert();


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


var cardElement = mapCard.cloneNode(true);

var renderCard = function (advert) {
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';

  cardElement.querySelector('.popup__type').textContent = TYPES_OFFER[advert.offer.type];
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


var renderPin = function (advert, i) {
  var mapPin = cardTemplate.content.querySelector('.map__pin');
  var filtersBlock = map.querySelector('.map__filters-container');
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
    map.insertBefore(renderCard(cards[i]), filtersBlock);
    document.addEventListener('keydown', onPopupEscPress);
  };
  var onPinOpenCardClick = function (evt) {
    openCard(evt);
  };
  var onPinOpenCardKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openCard(evt);
    }
  };
  pinElement.addEventListener('click', onPinOpenCardClick);
  pinElement.addEventListener('keydown', onPinOpenCardKeydown);
  return pinElement;
};


var createPins = function () {
  var pinBlock = map.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    pinFragment.appendChild(renderPin(cards[i], i));
  }
  pinBlock.appendChild(pinFragment);
};


var form = document.querySelector('.ad-form');
var formFieldset = form.querySelectorAll('fieldset');
var inputAddress = form.querySelector('input[name="address"]');
var mapPinMain = map.querySelector('.map__pin--main');

var getMainButtonCoordinate = function () {
  var mapPinButtonCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_BUTTON_SIZE / 2)) + ' , '
+ Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_BUTTON_SIZE / 2));
  inputAddress.value = mapPinButtonCoordinate;
  return mapPinButtonCoordinate;
};

var getPinMainCoordinate = function () {
  var mapPinMainCoordinate = Math.floor((parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2)) + ' , '
+ Math.floor((parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT));
  return mapPinMainCoordinate;
};

var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].removeAttribute('disabled');
  }
  inputAddress.value = getPinMainCoordinate();
  createPins(cards);
};

var onButtonMainPinClick = function () {
  activatePage();
};

var onButtonMainPinKeyDown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
};

var showPage = function () {
  mapPinMain.addEventListener('mouseup', onButtonMainPinClick);
  mapPinMain.addEventListener('keydown', onButtonMainPinKeyDown);
};


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

var deletePins = function () {
  var pins = document.querySelector('.map__pins');
  var buttons = pins.querySelectorAll('button');
  for (var j = 1; j < buttons.length; j++) {
    pins.removeChild(buttons[j]);
  }
};

var getInputsDisabled = function () {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].setAttribute('disabled', '');
  }
};

var resetMapAndForm = function () {
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  getInputsDisabled();
  inputAddress.value = getMainButtonCoordinate();
  deletePins();
  cardElement.classList.add('hidden');
  form.reset();
  getMainButtonCoordinate();
};

var onButtonResetClick = function () {
  resetMapAndForm();
};

var onButtonResetKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    resetMapAndForm();
  }
};

var changeFieldsetForm = function () {
  var homeType = form.elements.type;
  homeType.addEventListener('change', onTypeAndPriceChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  room.addEventListener('change', onRoomAndCapacityChange);
  capacity.addEventListener('change', onRoomAndCapacityChange);
  var resetButton = form.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', onButtonResetClick);
  resetButton.addEventListener('keydown', onButtonResetKeydown);
};

getMainButtonCoordinate();
showPage();
closeCard();
changeFieldsetForm();
