define([], function () {
    /**
     * this controller initials the service and the view
     * @class searchResults_controller
     * @param {Object} options
     * @param {Object} options.service
     * @param {Object} options.view
     * @param {Object} options.callbacks
     */
    return function(options) {
        var controller = {

            view: null,

            service: null,

            filterData: null,

            //initialise the service and view
            init:  function() {
                var self = this;

                this.service = options.service;
                this.view = options.view;

                this.service.getFlights(function() {

                });

            },

            //perform search action and generate the
            searchFlights: function(filterData) {
                var self = this;

                this.filterData = filterData;

                //destroy the list
                this.view.destroyList();

                //render the flight list from origin
                this.service.filterFlightsFromOrigin(filterData, function(list) {
                    self.view.buildFlightsFromOrigin(list, filterData);
                });

                //render the flight list from destination if it is return
                if(filterData.isOneWay === false) {
                    this.service.filterFlightsFromDestination(filterData, function(list) {
                        self.view.buildFlightsFromDestination(list, filterData);
                    });

                }

            },

            refineSearch: function(priceFrom, priceTo) {
                this.view.refineSearchByPrice(priceFrom, priceTo);
            },

            clearList: function() {
                this.view.destroyList();
            }


        };

        controller.init();

        return controller;
    };
});