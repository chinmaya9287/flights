define(['jquery', 'underscore'], function ($, _) {

    'use strict';

    /**
     * @class searchForm_service
     */
    return function () {
        var service = {

            originList: null,

            destinationList: null,

            flightRoutes: null,

            cityList: null,

            selectedOriginID: null,

            selectedDestinationID: null,

            init: function () {
                //initialise the variables
                this.originList = [];
                this.destinationList = [];
                this.flightRoutes = [];
                this.cityList = [];
            },

            getFlightRoutes: function (successCallback) {
                var self = this;

                $.ajax({
                    url: 'json/flights_routes.json',
                    dataType: 'json'
                }).done(function (data) {
                    self.cityList = data.cities;

                    self.originList = self.groupByCountries(data.cities);
                    self.flightRoutes = data.flightRoutes;

                    if (successCallback) {
                        successCallback(data);
                    }
                });
            },

            preselectOrigin: function () {
                //preselect the first city in the list
                this.selectedOriginID = this.cityList[0].id;

            },

            getAvailableDestinations: function (selectedOrigin) {
                //find the flight routes that contains selected origin
                var i, destinations,
                    filteredFlightRoutes = _.filter(this.flightRoutes, function (item) {
                        return item.originCityID === parseInt(selectedOrigin, 10);
                    });

                //get the get destination city list
                destinations = _.filter(this.cityList, function (item) {

                    for (i = 0; i < filteredFlightRoutes.length; i++) {
                        if (filteredFlightRoutes[i].destinationCityID === item.id) {
                            return true;
                        }
                    }

                    return false;
                });

                this.destinationList = this.groupByCountries(destinations);
                this.selectedDestinationID = destinations[0].id;
            },

            groupByCountries: function (cities) {
                return _.groupBy(cities, 'countryName');
            }
        };

        service.init();
        return service;
    };
});