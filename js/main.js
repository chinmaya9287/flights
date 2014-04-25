require([
    'jquery',
    'searchForm/SearchForm_controller',
    'searchForm/SearchForm_service',
    'searchForm/SearchForm_view',
    'searchResults/SearchResults_controller',
    'searchResults/SearchResults_service',
    'searchResults/SearchResults_view',
    'flightTabs/FlightTabs_controller',
    'flightTabs/FlightTabs_view'
], function ($, SearchForm_controller, SearchForm_service, SearchForm_view,
             SearchResults_controller, SearchResults_service, SearchResults_view,
             FlightTabs_controller, FlightTabs_view) {

    'use strict';

    $(document).ready(function () {
        var flightTabs, searchForm, searchResults,
            maxPrice = 300, minPrice = 100;


        //initial the flight tab
        flightTabs = new FlightTabs_controller({
            view: new FlightTabs_view(),
            options: {
                callbacks: {
                    clickTabCallback: function (isOneWay) {
                        if (isOneWay) {
                            //disable the return date picker
                            searchForm.view.disableReturnDatePicker(true);
                            searchForm.updateIsOneWay(true);

                            //clear the results list
                            searchForm.clearList();

                        } else {
                            //disable the return date picker
                            searchForm.view.disableReturnDatePicker(false);
                            searchForm.updateIsOneWay(false);

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
            view: new SearchResults_view(),
            options: {
                maxPrice: maxPrice,
                minPrice: minPrice
            }
        });


        //initial the search tab
        searchForm = new SearchForm_controller({
            service: new SearchForm_service(),
            view: new SearchForm_view(),
            options: {
                isOneWay: flightTabs.isOneWay,
                maxPrice: maxPrice,
                minPrice: minPrice,
                callbacks: {
                    searchSubmitCallback: function (data) {
                        searchResults.searchFlights(data, searchForm.priceFrom, searchForm.priceTo);
                    },
                    refinePriceCallback: function (priceFrom, priceTo) {
                        searchResults.refineSearch(priceFrom, priceTo);
                    }
                }
            }

        });

        //attach sub views to the tab control
        flightTabs.view.attachSections({
            searchForm: searchForm.view.element,
            searchResults: searchResults.view.element
        });
    });
});

