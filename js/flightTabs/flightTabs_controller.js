define([], function () {

    'use strict';

    /**
     * this controller initials the view
     * @class flightTabs_controller
     * @param {Object} options
     * @param {Object} options.view
     */
    return function (options) {
        var controller = {

            view: null,

            isOneWay: null,

            //initialise the service and view
            init: function () {
                var self = this;

                this.view = options.view;
                this.setCallbacks(options.options.callbacks);

                //default tab
                this.isOneWay = true;

                function clickTab(isOneWay) {
                    self.clickTab(isOneWay);
                }

                this.view.bindUIEvents(clickTab);

            },

            setCallbacks: function (callbacks) {
                if (callbacks) {
                    this.clickTabCallback = callbacks.clickTabCallback;
                }
            },

            clickTab: function (isOneWay) {
                this.isOneWay = isOneWay;

                if (this.clickTabCallback) {
                    this.clickTabCallback(isOneWay);
                }
            }


        };

        controller.init();

        return controller;
    };
});