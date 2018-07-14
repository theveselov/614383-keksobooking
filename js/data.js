'use strict';

(function () {

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
          type: TYPES_OFFER[getrandomType(Object.keys(TYPES_OFFER))],
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


  window.data = {
    cards: cards
  };

})();
