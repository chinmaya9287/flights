/**
 * searchTabs_view
 *
 */
var searchTabs_view = function(originList, destinationList) {
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

        },

        buildDropdowns: function(originList, destinationList) {

            this.flightOriginDropdown = new select2Dropdown({
                list: originList,
                className: "origin-selection",
                groupName: "countryName",
                optionListName: "cities",
                itemValue: "id",
                itemDisplayName: "cityName",
                parentElement: this.element.find('.flight-origin')
            });



        }


    };

    view.init();
    return view;
};