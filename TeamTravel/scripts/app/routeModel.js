var app = app || {};

var route = (function (e) {
    var routeViewModel = (function () {
        /*var $newStatus;
        var validator;*/
        newRoute = kendo.observable({ StartCity: null, EndCity: null });
        var init = function () {
            //validator = $('#enterStatus').kendoValidator().data("kendoValidator");
            //$newStartLocation = $('#newStatus');
            //startWatchingGeolocation();
            initialize();
        };
        var show = function () {
            //validator.hideMessages();
        };
        var setRoute = function () {
            cities[0]=startCity;
            cities.push(endCity);
            console.log(cities);
            app.viewModels.addActivity.addRoute(cities);
            app.mobileApp.navigate('#:back');
               
        };
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var cities = new Array();
        var startCity;
        var endCity;

        function initialize() {
          directionsDisplay = new google.maps.DirectionsRenderer();
          var chicago = new google.maps.LatLng(41.850033, -87.6500523);
          var mapOptions = {
            zoom:7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: chicago
          }
          map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          directionsDisplay.setMap(map);
        };

        function calcRoute() {
          startCity = document.getElementById('start').value;
          endCity = document.getElementById('end').value;
          var request = {
              origin:startCity,
              destination:endCity,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
        };
        return {
            init: init,
            show: show,
            //me: app.usersModel.currentUser,
            setRoute: setRoute,
            calcRoute: calcRoute
        };
    }());
    
    return {
        routeViewModel: routeViewModel
    };
}());
