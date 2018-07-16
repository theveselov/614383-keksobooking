'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var CODE_SUCCESS = 200;
  var TIMEOUT = 10000;


  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onXhrError = function () {
    onErrorLoad('Произошла ошибка соединения');
  };

  var onXhrTimeout = function () {
    onErrorLoad('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
  };

  var getData = function (onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var onXhrLoad = function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onErrorLoad('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);
    if (method === 'GET') {
      xhr.open('GET', URL_GET);
      xhr.send();
    } else {
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };

  var load = function (onLoad, onError) {
    getData(onLoad, onError, 'GET');
  };

  var upLoad = function (data, onLoad, onError) {
    getData(onLoad, onError, 'POST', data);
  };


  window.backend = {
    load: load,
    upLoad: upLoad,
    onErrorLoad: onErrorLoad
  };

})();
