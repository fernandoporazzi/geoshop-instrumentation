;(function(window, document, undefined) {

  'use strict';

  var GeoShopInstumentation = (function() {

    function getKeyMap() {
      return {
        storeId: 'storeId',
        page: 'p',
        isUserLogged: 'login',
        userName: 'un',
        userEmail: 'ue',
        session: 's'
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
        img = new Image(),
        imgServerUrl = 'http://localhost:3000/__geoshop.gif?';

      img.src = imgServerUrl + params;

      img.addEventListener('load', function() {
        console.log('image loaded', img);
      }, false);
    }

    return {
      init: init
    };

  })();

  GeoShopInstumentation.init();

})(window, document);
