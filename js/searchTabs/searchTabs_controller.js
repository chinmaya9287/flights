define([], function () {

    'use strict';

    /**
     * this controller initials the service and the view
     * @class searchTabs_controller
     * @param {Object} options
     * @param {Object} options.service
     * @param {Object} options.view
     * @param {Object} options.callbacks
     */
    return function (options) {
        var controller = {

            originList: null,

            view: null,

            service: null,

            isOneWay: null,

            //initialise the service and view
            init: function () {
                var self = this;

                this.service = options.service;
                this.view = options.view;
                this.isOneWay = options.options.isOneWay;
                this.setCallbacks(options.options.callbacks);

                function searchSubmit(data) {
                    self.searchSubmit(data);
                }

                this.service.getFlightRoutes(function () {
                    self.buildDropdowns();
                    self.service.preselectOrigin();
                    self.getAvailableDestinations(self.service.selectedOriginID);

                    //bind UI Events
                    self.view.bindUIEvents(searchSubmit);

                });

            },

            setCallbacks: function (callbacks) {
                if (callbacks) {
                    this.searchSubmitCallback = callbacks.searchSubmitCallback;
                }
            },

            buildDropdowns: function () {
                var self = this;

                function selectOrigin(selection) {
                    self.service.selectedOriginID = parseInt(selection, 10);
                    self.getAvailableDestinations(selection);
                }

                this.view.buildOriginDropdowns(this.service.originList, selectOrigin);
            },

            updateIsOneWay: function (flag) {
                this.isOneWay = flag;
                this.view.resetPrice();
            },

            searchSubmit: function (data) {
                var selectedOriginID = this.service.selectedOriginID,
                    selectedDestinationID = this.service.selectedDestinationID;

                //check which tab it is on at the moment
                if (this.isOneWay) {
                    if (selectedOriginID === null || selectedDestinationID === null || data.departureDate === "" || data.passengers === "") {
                        this.view.promtAlert("Please provide origin, destination, departure date and passengers number for the search.");
                        return;
                    }
                } else {
                    if (selectedOriginID === null || selectedDestinationID === null || data.departureDate === "" || data.returnDate === "" || data.passengers === "") {
                        this.view.promtAlert("Please provide origin, destination, departure date, return date and passengers number for the search.");
                        return;
                    }
                }

                if (this.searchSubmitCallback) {
                    data.selectedOriginID = selectedOriginID;
                    data.selectedDestinationID = selectedDestinationID;
                    data.isOneWay = this.isOneWay;
                    this.searchSubmitCallback(data);
                }
            },

            /**
             * getAvailabeDestinations
             * the function will retrieve the available destination list when the origin selection is changed
             */
            getAvailableDestinations: function (selectedOrigin) {
                var self = this;

                function selectDestination(selection) {
                    self.service.selectedDestinationID = parseInt(selection, 10);
                }

                this.service.getAvailableDestinations(selectedOrigin);
                this.view.buildDestinationDropdown(this.service.destinationList, selectDestination);
            }
        };

        controller.init();

        return controller;
    };
});