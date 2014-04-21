require([
    'searchTabs/searchTabs_controller',
    'searchTabs/searchTabs_service',
    'searchTabs/searchTabs_view',
], function (searchTabs_controller, searchTabs_service, searchTabs_view) {
    $(document).ready(function() {
        //initial the search tab
        var searchTabs  = new searchTabs_controller({
            service: new searchTabs_service(),
            view: new searchTabs_view(),
            callbacks: {
                searchSubmitCallback: function(data) {
                    console.log("the search fields are ", data);
                }
            }
        });


        //attach the view to the left
        $('body').find("#left-side-panel").append(searchTabs.view.element);
    });
});

