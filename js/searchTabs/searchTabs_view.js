define([
    'controls/select2Dropdown'
    //TODO put searchTabs.html here...
], function (select2Dropdown) {
    /**
     * @class searchTabs_view
     * @param originList
     * @param destinationList
     */
    var searchTabs_view = function() {
        var view = {
            html: '<div class="left-side-panel">' +
                '<ul class="nav nav-tabs">' +
                    '<li class="one-way-tab active"><a href="#">One Way</a></li>' +
                    '<li class="return-tab"><a href="#">Return</a></li>' +
                '</ul>' +
                '<div class="search-controls">' +
                    '<div class="flight-origin"><div class="field-name">From</div></div>' +
                    '<div class="flight-to"><div class="field-name">Destination</div></div>' +
                '</div>' +
                '</div>',

            element: null,

            init: function() {
                this.element = $(this.html);

                $(this.element).find('.one-way-tab').click(function() {
                    alert("one way tab is clicked");
                });

                $(this.element).find('.return-tab').click(function() {
                    alert("return tab is clicked");
                });

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