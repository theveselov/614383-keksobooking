'use strict';

(function () {

  var MIN_HOUSING_FILTER_PRICE = 10000;
  var MAX_HOUSING_FILTER_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var housingTypeElement = mapFiltersElement.querySelector('#housing-type');
  var housingPriceElement = mapFiltersElement.querySelector('#housing-price');
  var housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
  var housingFeaturesElement = mapFiltersElement.querySelectorAll('.map__checkbox');
  var housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');

  var changeHousingType = function (pin) {
    switch (housingTypeElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.type === housingTypeElement.value;
    }
  };

  var changeHousingPrice = function (pin) {
    switch (housingPriceElement.value) {
      case 'low':
        return pin.offer.price <= MIN_HOUSING_FILTER_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_HOUSING_FILTER_PRICE && pin.offer.price <= MAX_HOUSING_FILTER_PRICE;
      case 'high':
        return pin.offer.price >= MAX_HOUSING_FILTER_PRICE;
      default:
        return pin;
    }
  };

  var changeHousingRooms = function (pin) {
    switch (housingRoomsElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.rooms === parseInt(housingRoomsElement.value, 10);
    }
  };

  var changeHousingGuests = function (pin) {
    switch (housingGuestsElement.value) {
      case 'any':
        return pin;
      default:
        return pin.offer.guests === parseInt(housingGuestsElement.value, 10);
    }
  };

  var changeHousingFeatures = function (pin) {
    for (var i = 0; i < housingFeaturesElement.length; i++) {
      if (housingFeaturesElement[i].checked && pin.offer.features.indexOf(housingFeaturesElement[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var getFiltersPins = function () {
    var newPins = window.pins.slice();

    window.pinsWrapperElement.innerHTML = '';

    var filters = newPins.filter(changeHousingType).filter(changeHousingPrice).
        filter(changeHousingRooms).filter(changeHousingGuests).filter(changeHousingFeatures);

    window.pin.createPins(filters, window.util.variablesConst.QUANTITY_PINS);
    window.card.setClosePopup();
  };

  var onFiltersChange = function () {
    window.util.debounce(getFiltersPins);
  };

  mapFiltersElement.addEventListener('change', onFiltersChange);

  window.filter = {
    mapFilters: mapFiltersElement
  };

})();