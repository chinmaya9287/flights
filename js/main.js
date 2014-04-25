require([
    'jquery',
    'searchTabs/SearchTabs_controller',
    'searchTabs/SearchTabs_service',
    'searchTabs/SearchTabs_view',
    'searchResults/SearchResults_controller',
    'searchResults/SearchResults_service',
    'searchResults/SearchResults_view',
    'flightTabs/FlightTabs_controller',
    'flightTabs/FlightTabs_view'
], function ($, SearchTabs_controller, SearchTabs_service, SearchTabs_view, SearchResults_controller, SearchResults_service, SearchResults_view, FlightTabs_controller, FlightTabs_view) {

    'use strict';

    $(document).ready(function () {
        var flightTabs, searchTabs, searchResults;


        //initial the flight tab
        flightTabs = new FlightTabs_controller({
            view: new FlightTabs_view(),
            options: {
                callbacks: {
                    clickTabCallback: function (isOneWay) {
                        if (isOneWay) {
                            //disable the return date picker
                            searchTabs.view.disableReturnDatePicker(true);
                            searchTabs.updateIsOneWay(true);
                            //clear the results list
                            searchResults.clearList();

                        } else {
                            //disable the return date picker
                            searchTabs.view.disableReturnDatePicker(false);
                            searchTabs.updateIsOneWay(false);
                            //clear the results list
                            searchResults.clearList();
                        }

                    }
                }
            }
        });

        //attach the view to the content
        $('body').find("#content").append(flightTabs.view.element);

        //the tab should only be triggered after it is attached to the DOM
        flightTabs.view.tab();

        //initial the search results
        searchResults = new SearchResults_controller({
            service: new SearchResults_service(),
            view: new SearchResults_view()
        });


        //initial the search tab
        searchTabs = new SearchTabs_controller({
            service: new SearchTabs_service(),
            view: new SearchTabs_view(),
            options: {
                isOneWay: flightTabs.isOneWay,
                callbacks: {
                    searchSubmitCallback: function (data) {
                        searchResults.searchFlights(data);
                    }
                }
            }

        });

        //attach sub views to the tab control
        flightTabs.view.attachSections({
            searchForm: searchTabs.view.element,
            searchResults: searchResults.view.element
        });

        //bind the events for price slider
        searchTabs.view.displayPriceRange(function (priceFrom, priceTo) {
            searchResults.refineSearch(priceFrom, priceTo);
        });

    });
});

