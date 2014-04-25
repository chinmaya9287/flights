/**
 * flightTab_view
 *
 */
define([
    'jquery',
    'text!./flightTabs.html',
    'jquery-ui'
], function ($, template) {

    'use strict';

    /**
     * flightTabs_view
     *
     */
    return function () {
        var view = {
            html: template,

            element: null,

            init: function () {
                this.element = $(this.html);
            },

            //trigger the jquery tab control
            tab: function () {
                $("#tabs").tabs();
            },

            bindUIEvents: function (callback) {

                $(this.element).find('.one-way-tab').click(function () {
                    if (callback) {
                        callback(true);
                    }

                });

                $(this.element).find('.return-tab').click(function () {
                    if (callback) {
                        callback(false);
                    }
                });

            },

            attachSections: function (sections) {
                $(this.element).find(".search-form").append(sections.searchForm);
                $(this.element).find(".search-results").append(sections.searchResults);
            }
        };

        view.init();
        return view;
    };
});
