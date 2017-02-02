;(function(window, document, undefined) {

  'use strict';

  var GeoShopInstumentation = (function() {

    function getKeyMap() {
      return {
        page: 'p',
        isUserLogged: 'login',
        userName: 'un',
        userEmail: 'ue'
      };
    }

    function mountParameters() {
      var arr = [],
        map = getKeyMap();

      // GeoShop variable should be hoisted in the page. Check index.html
      for (var prop in GeoShop) {
        if (GeoShop.hasOwnProperty(prop)) {
          arr.push(map[prop] + '=' + GeoShop[prop]);
        }
      }

      return arr.join('&');
    }

    function init(argument) {
      var params = mountParameters(),
        img = document.createElement('img'),
        imgServerUrl = '/assets/img/__geoshop.gif?';

      img.src = imgServerUrl + encodeURIComponent(params);

      document.body.appendChild(img);
    }

    return {
      init: init
    };

  })();

  GeoShopInstumentation.init();

})(window, document);
