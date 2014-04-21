
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

            departureDateControl: null,

            arriveDateControl: null,

            passengersControl: null,

            init: function() {
                var self = this;

                this.element = $(this.html);


                //default the one way tab is selected
                this.disableArriveDatePicker(true);


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
                this.departureDateControl.datepicker("option", "dateFormat", "dd MM yy");
                this.arriveDateControl.datepicker();
                this.arriveDateControl.datepicker("option", "dateFormat", "dd MM yy");

                this.passengersControl.spinner({
                    min: 1,
                    max: 100,
                    step: 1,
                    start: 1
                });

            },

            bindUIEvents: function(searchSelected) {
                var data = {}, self = this,
                    departureDate, arriveDate, passengers;

                //bind UI events
                $(this.element).find(".btn-search").click(function() {

                    departureDate = self.departureDateControl.val();
                    arriveDate = self.arriveDateControl.val();
                    passengers = self.passengersControl.val();

                    data = {
                        departureDate: departureDate,
                        arriveDate: arriveDate,
                        passengers: passengers
                    };

                    if(searchSelected) {
                        searchSelected(data);
                    }

                });
            },

            promtAlert: function(message) {
                alert(message);
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
