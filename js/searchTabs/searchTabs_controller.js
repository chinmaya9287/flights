/**
 * searchTabs_controller
 * this controller initials the service and the view
 */
var searchTabs_controller = function() {
    var controller = {

        originList: null,

        view: null,

        service: null,

        //initialise the service and view
        init:  function() {
            var self = this;

            this.service = new searchTabs_service();
            this.view = new searchTabs_view();

            this.service.getFlightRoutes(function() {

                self.view.buildDropdowns(self.service.originList, self.service.destinationList);
            });

        }
    };

    controller.init();

    return controller;
};
