;(function(window, document, undefined) {

  'use strict';

  var GeoShopInstumentation = (function() {

    var latitude, longitude;

    function getKeyMap() {
      return {
        storeId: 'storeId',
        page: 'p',
        isUserLogged: 'login',
        userName: 'un',
        userEmail: 'ue',
        session: 's',
        latitude: 'lat',
        longitude: 'lng'
      };
    }

    function mountParameters() {
      var arr = [],
        map = getKeyMap();

      GeoShop.latitude = latitude;
      GeoShop.longitude = longitude;

      // GeoShop variable should be hoisted in the page. Check index.html
      for (var prop in GeoShop) {
        if (GeoShop.hasOwnProperty(prop)) {
          arr.push(map[prop] + '=' + GeoShop[prop]);
        }
      }

      return arr.join('&');
    }

    function request() {
      var params = mountParameters(),
        img = new Image(),
        imgServerUrl = 'http://localhost:3000/__geoshop.gif?';

      img.src = imgServerUrl + params;

      img.addEventListener('load', function() {
        console.log('image loaded', img);
      }, false);
    }

    function init(argument) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          request();
        }, function(err) {
          console.log(err);
        });
      }
    }

    return {
      init: init
    };

  })();

  GeoShopInstumentation.init();

})(window, document);
