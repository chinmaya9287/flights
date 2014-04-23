/**
 * flightTab_view
 *
 */
define([
    'text!./flightTabs.html'
], function (template) {

    /**
     * flightTabs_view
     *
     */
    return function() {
        var view = {
            html: template,

            element: null,

            init: function() {
                var self = this;

                this.element = $(this.html);
            },

            //trigger the jquery tab control
            tab: function() {
                $("#tabs" ).tabs();
            },

            bindUIEvents: function(callback) {

                $(this.element).find('.one-way-tab').click(function() {
                    if(callback) {
                        callback(true);
                    }

                });

                $(this.element).find('.return-tab').click(function() {
                    if(callback) {
                        callback(false);
                    }
                });

            },

            attachSections: function(sections) {
                $(this.element).find(".search-form").append(sections.searchForm);
                $(this.element).find(".search-results").append(sections.searchResults);
            }
        };

        view.init();
        return view;
    };
});
