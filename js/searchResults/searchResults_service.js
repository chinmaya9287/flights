define(['jquery', 'underscore'], function ($, _) {

    'use strict';
    /**
     * SearchResults_service
     */
    return function () {
        var service = {

            flightList: null,

            filteredFlightList: null,

            /**
             * initialise the service and view
             */
            init: function () {

                this.flightList = [];
                this.filteredFlightList = [];
            },

            /**
             * get the flight list from the json file
             * @param successCallback
             */
            getFlights: function (successCallback) {
                var self = this;

                $.ajax({
                    url: 'json/flights.json',
                    dataType: 'json'
                }).done(function (data) {

                    self.flightList = data;
                    if (successCallback) {
                        successCallback(data);
                    }
                });
            },

            /**
             * filter the flight list based on the provided search data
             * @param data
             * @returns true/false
             */
            filterFlights: function (data) {
                return _.filter(this.flightList, function (item) {
                    //TODO: the filter should also filter by the departure and arrive date
                    //coz we dont have a real web service that could generate the flights with different date so we ignore the dates for now
                    if (data && item.originCityID === data.selectedOriginID && item.destinationCityID === data.selectedDestinationID) {
                        return true;
                    }

                    return false;
                });
            },

            /**
             * filter flights from origin
             * @param filterData
             */
            filterFlightsFromOrigin: function (filterData, callback) {
                this.filteredFlightList = this.filterFlights(filterData);
                if (callback) {
                    callback(this.filteredFlightList);
                }
            },

            /**
             * filter flights from destination
             * @param filterData
             */
            filterFlightsFromDestination: function (filterData, callback) {
                var data = {
                    selectedOriginID: filterData.selectedDestinationID,
                    selectedDestinationID: filterData.selectedOriginID,
                    departureDate: filterData.departureDate,
                    returnDate: filterData.returnDate,
                    passengers: filterData.passengers
                };

                this.filteredFlightList = this.filterFlights(data);
                if (callback) {
                    callback(this.filteredFlightList);
                }
            }

        };

        service.init();

        return service;
    };
});