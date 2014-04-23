define([], function () {
    /**
     * this controller initials the service and the view
     * @class flightTabs_controller
     * @param {Object} options
     * @param {Object} options.view
     * @param {Object} options.callbacks
     */
    return function(options) {
        var controller = {

            view: null,

            isOneWay: null,

            //initialise the service and view
            init:  function() {
                var self = this;

                this.view = options.view;

                //default tab
                this.isOneWay = true;

                function clickTab(isOneWay) {
                    self.clickTab(isOneWay);
                }

                this.view.bindUIEvents(clickTab);

            },

            clickTab: function(isOneWay) {
                this.isOneWay = isOneWay;
            }


        };

        controller.init();

        return controller;
    };
});