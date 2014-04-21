define([], function () {
    /**
     * @class searchTabs_service
     */
    var searchTabs_service = function() {
        var service = {

            originList: null,

            destinationList: null,

            flightRoutes: null,

            init: function() {
                console.log("initialising the service");

                //initialise the variables
                this.originList = [];
                this.destinationList = [];
                this.flightRoutes = [];
            },

            getFlightRoutes: function(successCallback) {
                var self = this;

                $.ajax({
                    url: 'json/flights_routes.json',
                    dataType: 'json'
                })
                    .done(function(data) {
                        self.originList = data.cities;
                        self.flightRoutes = data.flightRoutes;

                        if(successCallback) {
                            successCallback(data);
                        }

                    }).fail(function() {

                    });
            }
        };

        service.init();
        return service;
    };

    return searchTabs_service;
});