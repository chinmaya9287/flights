define([], function () {

    return function(options) {
        var service = {

            //initialise the service and view
            init:  function() {


            },

            getFlights: function(successCallback) {
                var self = this;

                $.ajax({
                    url: 'json/flights_routes.json',
                    dataType: 'json'
                })
                    .done(function(data) {
                        self.cityList = data.cities;

                        self.originList = self.groupByCountries(data.cities);
                        self.flightRoutes = data.flightRoutes;

                        if(successCallback) {
                            successCallback(data);
                        }

                    }).fail(function() {

                    });
            },

        };

        service.init();

        return service;
    };
});