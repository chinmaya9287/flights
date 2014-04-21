define([], function () {
    /**
     * this controller initials the service and the view
     * @class searchTabs_controller
     * @param {Object} options
     * @param {Object} options.service
     * @param {Object} options.view
     */
    var searchTabs_controller = function(options) {
        var controller = {

            originList: null,

            view: null,

            service: null,

            //initialise the service and view
            init:  function() {
                var self = this;

                this.service = options.service;
                this.view = options.view;

                this.service.getFlightRoutes(function() {

                    self.view.buildDropdowns(self.service.originList, self.service.destinationList);
                });

            }
        };

        controller.init();

        return controller;
    };

    return searchTabs_controller;
});