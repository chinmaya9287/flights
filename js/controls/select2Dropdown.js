/**
 *
 * @param list
 * @param className
 * @param groupName
 * @param optionListName
 * @param itemName
 * @param parementElement
 * @returns {null}
 */
var select2Dropdown = function(options) {

    var control = {

        element: null,

        list: null,

        groupName: null,

        itemValue: null,

        itemDisplayName: null,

        selectedValue: null,

        selectCallback: null,

        init: function() {
            var html;

            this.assignOptions(options);

            this.element = document.createElement('select');

            $(this.element).addClass('select2-dropdown');
            this.element.id = 'select2-dropdown';

            //select2 must be attached to the dom before using it
            this.parentElement.append(this.element);

            if(options.className) {
                $(this.element).addClass(options.className);
            }

            //build the option group if the group name is provided
            if(this.groupName) {
               html = this.buildOptionGroup(this.list);
            } else {
               html = this.buildItemList(this.list);
            }

            $(this.element).html(html);

            $('#' + this.element.id).select2({
                allowClear: true
            });

            this.selectedValue = $('#' + this.element.id).select2("val");


        },

        assignOptions: function(options) {

            if(options.list && options.list.length >0 && options.parentElement) {
                this.list = options.list;
                this.groupName = options.groupName || "groupName";
                this.optionListName = options.optionListName || "list";
                this.itemValue = options.itemValue || "id";
                this.itemDisplayName = options.itemDisplayName || "name";
                this.parentElement = options.parentElement;

            } else {
                throw new Error("list and parent element must be provided for the select2Dropdown");
            }
        },

        buildOptionGroup: function(groupList) {
            var i, optionGroup, optionList, html = "";

            if(this.groupName) {
                for (i = 0; i < groupList.length; i++) {
                    optionGroup = groupList[i][this.groupName];
                    optionList = groupList[i][this.optionListName];

                    if (optionGroup) {
                        html = '<optgroup label="'+ optionGroup +'">';
                    }

                    html = html + this.buildItemList(optionList) + "</optgroup>";
                }
            }

            return html;
        },

        buildItemList: function(optionList) {
            var i, html = "", item;

            for(i=0; i < optionList.length; i++) {
                item = optionList[i];

                html = html + '<option value="'+ item[this.itemValue] +'">'+ item[this.itemDisplayName] +'</option>';
            }

            return html;
        }
    };

    control.init();

    return control.element;
};
