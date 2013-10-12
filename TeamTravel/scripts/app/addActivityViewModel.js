var addActivityViewModel = (function () {
        var $newStatus;
        var validator;
        var newRoute;
        var setRoute = function () {
            mobileApp.navigate('views/routeMapView.html');
        };
        var init = function () {
            validator = $('#enterStatus').kendoValidator().data("kendoValidator");
            $newStatus = $('#newStatus');
            
            newRoute = kendo.observable({ StartCity: null, EndCity: null });
            //startWatchingGeolocation();
        };
        var show = function (e) {
            console.log(newRoute);
            if(e.view.params.newRoute!=undefined) {
                console.log("Here "+e.view.params.newRoute.StartCity);
            }
            $newStatus.val('');
            validator.hideMessages();
        };
        var saveActivity = function () {
            if (validator.validate()) {
                var activities = activitiesModel.activities;
                var activity = activities.add();
                activity.Text = $newStatus.val();
                activity.UserId = usersModel.currentUser.get('data').Id;
                activities.one('sync', function () {
                    mobileApp.navigate('#:back');
                });
                activities.sync();
            }
        };
        return {
            init: init,
            show: show,
            me: usersModel.currentUser,
            setRoute: setRoute,
            saveActivity: saveActivity
        };
    }());