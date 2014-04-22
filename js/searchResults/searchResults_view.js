
define([
    'text!./searchResults.html',
    'text!./searchResultItem.html'
], function (template, itemTemplate) {

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

            },

            destroyList: function() {
                $(this.element).find(".flights-from-origin-list").remove();
                $(this.element).find(".flights-from-destination-list").remove();
            },

            buildItem: function(item) {
                var itemElement, itemTemp,
                    title = "From " + item.originCityName + " to " + item.destinationCityName;

                itemTemp = _.template(itemTemplate);

                itemElement = $(itemTemp({title: title}));

                return itemElement;
            },

            buildList: function(list, className) {
                var i, item, listContainer = $('<div class="'+ className +'"></div>'),
                    ulElement = $('<ul></ul>');

                listContainer.append(ulElement);

                for(i=0;i<list.length;i++) {
                    item = this.buildItem(list[i]);

                    ulElement.append(item);
                }

                return listContainer;
            },

            buildFlightsFromOrigin: function(list) {
                var listContainer = this.buildList(list, "flights-from-origin-list");
                $(this.element).filter(".flights-from-origin").append(listContainer);
            },

            buildFlightsFromDestination: function(list) {
                var listContainer = this.buildList(list, "flights-from-destination-list");
                $(this.element).find(".flights-from-destination").append(listContainer);
            }



        };

        view.init();
        return view;
    };
});
