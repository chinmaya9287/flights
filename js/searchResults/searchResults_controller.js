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

            //initialise the service and view
            init:  function() {
                var self = this;

                this.service = options.service;
                this.view = options.view;

            }



        };

        controller.init();

        return controller;
    };
});