
define([
    'controls/select2Dropdown',
    'text!./searchTabs.html'
], function (select2Dropdown, template) {

/**
 * searchTabs_view
 *
 */
var searchTabs_view = function() {
    var view = {
        html: template,

        element: null,

        init: function() {
            this.element = $(this.html);

            $(this.element).find('.one-way-tab').click(function() {

            });

            $(this.element).find('.return-tab').click(function() {

            });

            $( "#tabs" ).tabs();

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

    return searchTabs_view;
});
