console.log('being loaded?');

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

        //initial the search results
        searchResults = new searchResults_controller({
            service: new searchResults_service(),
            view: new searchResults_view()
        });


        //initial the search tab
        searchTabs  = new searchTabs_controller({
            service: new searchTabs_service(),
            view: new searchTabs_view(),
            callbacks: {
                searchSubmitCallback: function(data) {
                    searchResults.searchFlights(data);
                },
                refineSearchWithPriceCallback: function(priceFrom, priceTo) {
                    searchResults.refineSearch(priceFrom, priceTo)
                }
            }
        });



        isOneWay = true;
        $('.one-way-tab').click(function() {
            //disable the arrive date picker
            searchTabs.view.disableArriveDatePicker(true);
            isOneWay = true;
        });

        $('.return-tab').click(function() {
            //disable the arrive date picker
            searchTabs.view.disableArriveDatePicker(false);
            isOneWay = false;
        });


        //attach the view to the left
        $('body').find(".search-form").append(searchTabs.view.element);
    });
});

