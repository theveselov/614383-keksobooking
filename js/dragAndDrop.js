'use strict';

(function () {
  var onMapPinMainMove = function (evt) {
    evt.preventDefault();

    var maxLeft = window.pin.map.offsetWidth - window.map.pinMain.offsetWidth;
    var minLeft = 0;
    var maxTop = window.util.variablesConst.MAX_LIMIT_TOP -
        window.map.pinMain.offsetWidth + window.util.variablesConst.PIN_TIP_HEIGHT;
    var minTop = window.util.variablesConst.MIN_LIMIT_TOP -
        window.map.pinMain.offsetWidth + window.util.variablesConst.PIN_TIP_HEIGHT;

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

      var newTop = window.map.pinMain.offsetTop - shift.y;
      var newLeft = window.map.pinMain.offsetLeft - shift.x;

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

      window.map.pinMain.style.left = newLeft + 'px';
      window.map.pinMain.style.top = newTop + 'px';
    };

    var onWheelMove = function (wheelEvt) {
      wheelEvt.preventDefault();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.formOut.inputAddress.value = window.map.getPinMainCoordinate();
      onMouseMove(upEvt);
      document.removeEventListener('mousemove', onWheelMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onWheelMove);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.dragAndDrop = {
    onMapPinMainMove: onMapPinMainMove,
  };

})();