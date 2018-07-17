'use strict';

(function () {


  var CODE_SUCCESS = 200;
  var CODE_ERROR = 500;
  var TIMEOUT = 10000;


  var requestData = function (url, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case CODE_SUCCESS:
          onLoad(xhr.response);
          break;
        case CODE_ERROR:
          onError('Ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    requestData: requestData
  };

})();
