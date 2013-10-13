// add activity view model
var addActivity = (function () {
    var $newStatus;
    var $newScheduleDate;
    var validator;
    var newRoute;
    var setRoute = function () {
        app.mobileApp.navigate('views/routeMapView.html');
    };
    var init = function () {
        validator = $('#enterStatus').kendoValidator().data("kendoValidator");
        $newStatus = $('#newStatus');
        $newScheduleDate = $("#datetimepicker").kendoDateTimePicker({
                value:new Date()
            });
        
        newRoute = kendo.observable({ StartCity: null, EndCity: null });
        //startWatchingGeolocation();
    };
    var show = function () {
        console.log(newRoute);
        validator.hideMessages();
    };
    var saveActivity = function () {
        if (validator.validate()) {
            var activities = app.viewModels.activities.activities;
            var activity = activities.add();
            activity.Text = $newStatus.val();
            activity.UserId = app.viewModels.usersModel.currentUser.get('data').Id;
            activity.StartCity = newRoute.StartCity;
            activity.EndCity = newRoute.EndCity;
            activity.ScheduleDate = $newScheduleDate.val();
            activities.one('sync', function () {
                app.mobileApp.navigate('#:back');
            });
            activities.sync();
        }
    };
    var addRoute = function(cities) {
        newRoute.StartCity = cities[0];
        newRoute.EndCity = cities[cities.length-1];
    };
    return {
        init: init,
        show: show,
        me: app.viewModels.usersModel.currentUser,
        setRoute: setRoute,
        saveActivity: saveActivity,
        addRoute: addRoute
    };
}());