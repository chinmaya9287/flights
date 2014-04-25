define([], function () {

    'use strict';

    /**
     * this controller initials the service and the view
     * @class searchResults_controller
     * @param {Object} options
     * @param {Object} options.service
     * @param {Object} options.view
     * @param {Object} options.callbacks
     */
    return function (options) {
        var controller = {

            view: null,

            service: null,

            filterData: null,

            //initialise the service and view
            init: function () {
                this.service = options.service;
                this.view = options.view;
                if (options.options) {
                    this.maxPrice = options.options.maxPrice;
                    this.minPrice = options.options.minPrice;
                }

                this.service.getFlights();
            },

            //perform search action and generate the
            searchFlights: function (filterData, priceFrom, priceTo) {
                var self = this;

                this.filterData = filterData;

                //destroy the list
                this.view.destroyList();

                //render the flight list from origin
                this.service.filterFlightsFromOrigin(filterData, function (list) {
                    self.view.buildFlightsFromOrigin(list, filterData);

                    //check whether the list need to be refiend by the price range
                    if (priceFrom > self.minPrice || priceTo < self.maxPrice) {
                        self.view.refineSearchByPrice(priceFrom, priceTo);
                    }

                });

                //render the flight list from destination if it is return
                if (filterData.isOneWay === false) {
                    this.service.filterFlightsFromDestination(filterData, function (list) {
                        self.view.buildFlightsFromDestination(list, filterData);

                        //check whether the list need to be refiend by the price range
                        if (priceFrom > self.minPrice || priceTo < self.maxPrice) {
                            self.view.refineSearchByPrice(priceFrom, priceTo);
                        }
                    });
                }

            },

            refineSearch: function (priceFrom, priceTo) {
                this.view.refineSearchByPrice(priceFrom, priceTo);
            },

            clearList: function () {
                this.view.destroyList();
            }


        };

        controller.init();

        return controller;
    };
});