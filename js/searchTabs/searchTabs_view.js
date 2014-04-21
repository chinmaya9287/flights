
define([
    'controls/select2Dropdown',
    'text!./searchTabs.html'
], function (select2Dropdown, template) {

    /**
     * searchTabs_view
     *
     */
    return function() {
        var view = {
            html: template,

            element: null,

            isOneWay: null,

            departureDateControl: null,

            arriveDateControl: null,

            passengersControl: null,

            init: function() {
                var self = this;

                this.element = $(this.html);
                $(this.element).find( "#tabs" ).tabs();

                //default the one way tab is selected
                this.disableArriveDatePicker(true);
                this.isOneWay = true;

                $(this.element).find('.one-way-tab').click(function() {
                    //disable the arrive date picker
                    self.disableArriveDatePicker(true);
                    self.isOneWay = true;
                });

                $(this.element).find('.return-tab').click(function() {
                    //disable the arrive date picker
                    self.disableArriveDatePicker(false);
                    self.isOneWay = false;
                });

                //create origin dropdown and destination dropdown using select2 dropdown
                this.flightOriginDropdown = new select2Dropdown({
                    id: "origin-dropdown",
                    className: "origin-selection",
                    itemValue: "id",
                    itemDisplayName: "cityName",
                    parentElement: this.element.find('.flight-origin')
                });

                this.flightDestinationDropdown = new select2Dropdown({
                    id: "destination-dropdown",
                    className: "destination-selection",
                    itemValue: "id",
                    itemDisplayName: "cityName",
                    parentElement: this.element.find('.flight-to')
                });

                //create departure and arrive date using jquery date picker
                this.departureDateControl = $(this.element).find('#datepicker-departure');
                this.arriveDateControl = $(this.element).find('#datepicker-arrive');
                this.passengersControl = $(this.element).find("#passengers-number");


                this.departureDateControl.datepicker();
                this.arriveDateControl.datepicker();

                this.passengersControl.spinner({
                    min: 1,
                    max: 100,
                    step: 1,
                    start: 1
                });

            },

            bindUIEvents: function(options) {
                var data = {}, self = this,
                    selectedOriginID = options.selectedOriginID,
                    selectedDestinationID = options.selectedDestinationID,
                    searchSelected = options.searchCallback,
                    departureDate, arriveDate, passengers;

                //bind UI events
                $(this.element).find(".btn-search").click(function() {

                    departureDate = self.departureDateControl.val();
                    arriveDate = self.arriveDateControl.val();
                    passengers = self.passengersControl.val();

                    //check which tab it is on at the moment
                    if(self.isOneWay) {
                        if(selectedOriginID !== undefined && selectedOriginID !== null && departureDate !== "" && passengers !== "") {
                            data = {
                                departureDate: departureDate,
                                passengers: passengers,
                                isOneway: true
                            };

                            if(searchSelected) {
                                searchSelected(data);
                            }

                        } else {
                            alert("Please provide origin, destination, departure date and passengers number for the search.");
                        }
                    } else {
                        if(selectedOriginID !== undefined && selectedDestinationID !== null && departureDate !== "" && arriveDate !== "" && passengers !== "") {
                            data = {
                                departureDate: departureDate,
                                arriveDate: arriveDate,
                                passengers: passengers,
                                isOneWay: false
                            };

                            if(searchSelected) {
                                searchSelected(data);
                            }

                        } else {
                            alert("Please provide origin, destination, departure date, arrive date and passengers number for the search.");
                        }
                    }

                });
            },

            disableArriveDatePicker: function(isDisable) {
                var arriveControl =  $(this.element).find('#datepicker-arrive');

                if(isDisable) {
                   arriveControl.attr('disabled','disabled');
                } else {
                   arriveControl.removeAttr('disabled');
                }
            },

            buildOriginDropdowns: function(originList, selectOrigin) {
                this.flightOriginDropdown.buildOptions(originList, selectOrigin);
            },

            buildDestinationDropdown: function(destinationList, selectDestination) {
                this.flightDestinationDropdown.buildOptions(destinationList, selectDestination);
            }
        };

        view.init();
        return view;
    };
});
