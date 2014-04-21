
define([
    'text!./searchResults.html'
], function (select2Dropdown, template) {

    /**
     * searchResults_view
     *
     */
    return function() {
        var view = {
            html: template,

            element: null,


            init: function() {
                var self = this;

                this.element = $(this.html);

            }



        };

        view.init();
        return view;
    };
});
