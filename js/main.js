require([
    'searchTabs/searchTabs_controller',
    'searchTabs/searchTabs_service',
    'searchTabs/searchTabs_view',
    'searchResults/searchResults_controller',
    'searchResults/searchResults_service',
    'searchResults/searchResults_view'
], function (searchTabs_controller, searchTabs_service, searchTabs_view, searchResults_controller, searchResults_service, searchResults_view) {
    $(document).ready(function() {
        var searchTabs, searchResults, isOneWay;

        //set up the tabs
        $("#tabs" ).tabs();
        isOneWay = true;

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
                isOneWay: isOneWay,
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

        $('.one-way-tab').click(function() {
            //disable the return date picker
            searchTabs.view.disableReturnDatePicker(true);
            isOneWay = true;
            searchTabs.updateIsOneWay(true);
        });

        $('.return-tab').click(function() {
            //disable the return date picker
            searchTabs.view.disableReturnDatePicker(false);
            isOneWay = false;
            searchTabs.updateIsOneWay(false);
        });


        //attach the view to the left
        $('body').find(".search-form").append(searchTabs.view.element);
        $('body').find(".search-results").append(searchResults.view.element);
    });
});

