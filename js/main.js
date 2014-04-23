console.log('being loaded?');

require([
    'searchTabs/searchTabs_controller',
    'searchTabs/searchTabs_service',
    'searchTabs/searchTabs_view',
    'searchResults/searchResults_controller',
    'searchResults/searchResults_service',
    'searchResults/searchResults_view',
    'flightTabs/flightTabs_controller',
    'flightTabs/flightTabs_view'
], function (searchTabs_controller, searchTabs_service, searchTabs_view, searchResults_controller,
             searchResults_service, searchResults_view, flightTabs_controller, flightTabs_view) {
    $(document).ready(function() {
        var flightTabs, searchTabs, searchResults;


        //initial the flight tab 
        flightTabs = new flightTabs_controller({
            view: new flightTabs_view()
        });

        //attach the view to the content
        $('body').find("#content").append(flightTabs.view.element);

        //the tab should only be triggered after it is attached to the DOM
        flightTabs.view.tab();

        //initial the search results
        searchResults = new searchResults_controller({
            service: new searchResults_service(),
            view: new searchResults_view()
        });


        //initial the search tab
        searchTabs  = new searchTabs_controller({
            service: new searchTabs_service(),
            view: new searchTabs_view(),
            options: {
                isOneWay: flightTabs.isOneWay,
                callbacks: {
                    searchSubmitCallback: function(data) {
                        searchResults.searchFlights(data);
                    },
                    refineSearchWithPriceCallback: function(priceFrom, priceTo) {
                        searchResults.refineSearch(priceFrom, priceTo)
                    }
                }
            }

        });

        //attach sub views to the tab control
        flightTabs.view.attachSections({
            searchForm: searchTabs.view.element,
            searchResults: searchResults.view.element
        });

    });
});

