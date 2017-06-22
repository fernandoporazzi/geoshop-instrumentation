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
        userId: 'ui',
        session: 's',
        latitude: 'lat',
        longitude: 'lng',
        cart: 'c'
      };
    }

    function getCartQuery() {
      var cartData = GeoShop['cart'],
        i = 0,
        entries = [];

      for (i; i < cartData.length; i++) {
        var self = cartData[i],
          entry = [];

        for (var prop in self) {
          if (self.hasOwnProperty(prop)) {
            entry = entry.concat(prop + ':' + self[prop]);
          }
        }

        entries = entries.concat(entry.join(';'));
      }

      return entries.join('|')
    }

    function mountParameters() {
      var arr = [],
        map = getKeyMap();

      GeoShop.latitude = latitude;
      GeoShop.longitude = longitude;

      // GeoShop variable should be hoisted in the page. Check index.html
      for (var prop in GeoShop) {
        if (GeoShop.hasOwnProperty(prop)) {
          var key = map[prop] || prop;

          if (prop === 'cart') {
            arr.push(key + '=' + getCartQuery());
          } else {
            arr.push(key + '=' + GeoShop[prop]);
          }
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

          if (GeoShop.storeId && GeoShop.session) {
            request();
          }

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
