
$(document).ready(function() {
    //initial the search tab
    var searchTabs  = new searchTabs_controller();

    //attach the view to the left
    $('body').find("#left-side-panel").append(searchTabs.view.element);
});
