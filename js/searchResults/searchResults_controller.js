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

            /**
             * initialise the service and view
             */
            init: function () {
                this.service = options.service;
                this.view = options.view;
                if (options.options) {
                    this.maxPrice = options.options.maxPrice;
                    this.minPrice = options.options.minPrice;
                }

                this.service.getFlights();
            },

            /**
             * perform search action and generate the flight from origin and flight from destination list
             * it also performs a filter based on the provied price ragne
             * @param filterData
             * @param priceFrom
             * @param priceTo
             */
            searchFlights: function (filterData, priceFrom, priceTo) {
                var self = this;

                this.filterData = filterData;

                //destroy the list
                this.view.destroyList();

                //render the flight list from origin
                this.service.filterFlightsFromOrigin(filterData, function (list) {
                    self.buildFlightsFromOrigin(list, filterData, priceFrom, priceTo);
                });

                //render the flight list from destination if it is return
                if (filterData.isOneWay === false) {
                    this.service.filterFlightsFromDestination(filterData, function (list) {
                        self.buildFlightsFromDestination(list, filterData, priceFrom, priceTo);
                    });
                }

            },

            /**
             * build the flights from origin
             * @param list
             * @param filterData
             */
            buildFlightsFromOrigin: function (list, filterData, priceFrom, priceTo) {
                this.view.buildFlightsFromOrigin(list, filterData);

                //check whether the list need to be refiend by the price range
                if (priceFrom > this.minPrice || priceTo < this.maxPrice) {
                    this.view.refineSearchByPrice(priceFrom, priceTo);
                }
            },

            /**
             * build the flights from destination
             * @param list
             * @param filterData
             */
            buildFlightsFromDestination: function (list, filterData, priceFrom, priceTo) {
                this.view.buildFlightsFromDestination(list, filterData);

                //check whether the list need to be refiend by the price range
                if (priceFrom > this.minPrice || priceTo < this.maxPrice) {
                    this.view.refineSearchByPrice(priceFrom, priceTo);
                }
            },

            /**
             * filter the current flight list based on the price range
             * @param priceFrom
             * @param priceTo
             */
            refineSearch: function (priceFrom, priceTo) {
                this.view.refineSearchByPrice(priceFrom, priceTo);
            },

            /**
             * destroy the flight list for redrawing
             */
            clearList: function () {
                this.view.destroyList();
            }


        };

        controller.init();

        return controller;
    };
});