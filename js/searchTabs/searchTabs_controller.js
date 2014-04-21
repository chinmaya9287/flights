define([], function () {
    /**
     * this controller initials the service and the view
     * @class searchTabs_controller
     * @param {Object} options
     * @param {Object} options.service
     * @param {Object} options.view
     * @param {Object} options.callbacks
     */
    return function(options) {
        var controller = {

            originList: null,

            view: null,

            service: null,

            //initialise the service and view
            init:  function() {
                var self = this;

                this.service = options.service;
                this.view = options.view;
                this.setCallbacks(options.callbacks);

                function searchSubmit(data) {
                    self.searchSubmit(data);
                }
                this.service.getFlightRoutes(function() {
                    self.buildDropdowns();
                    self.service.preselectOrigin();
                    self.getAvailableDestinations(self.service.selectedOriginID);

                    //bind UI Events
                    self.view.bindUIEvents({
                        selectedOriginID: self.service.selectedOriginID,
                        selectedDestinationID: self.service.selectedDestinationID,
                        searchCallback: searchSubmit
                    });

                });

            },

            setCallbacks: function(callbacks) {
                if(callbacks) {
                    this.searchSubmitCallback = callbacks.searchSubmitCallback;
                }
            },

            buildDropdowns: function() {
                var self = this;

                function selectOrigin(selection){
                   self.service.selectedOriginID = parseInt(selection);
                   self.getAvailableDestinations(selection);
                }

                this.view.buildOriginDropdowns(this.service.originList, selectOrigin);
            },

            searchSubmit: function(data) {
                if(this.searchSubmitCallback) {
                    data.selectedOriginID = this.service.selectedOriginID;
                    data.selectedDestinationID = this.service.selectedDestinationID;
                    this.searchSubmitCallback(data);
                }
            },

            /**
             * getAvailabeDestinations
             * the function will retrieve the available destination list when the origin selection is changed
             */
            getAvailableDestinations: function(selectedOrigin) {
                function selectDestination(selection) {
                    self.service.selectedDestinationID = parseInt(selection);
                }

                this.service.getAvailableDestinations(selectedOrigin);
                this.view.buildDestinationDropdown(this.service.destinationList, selectDestination);
            }
        };

        controller.init();

        return controller;
    };
});