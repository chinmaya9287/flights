define(['chai', 'chai-jquery', 'searchTabs/searchTabs_view'], function (chai, plugin, searchTabs_view) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs View', function() {

        beforeEach(function() {

        });

        afterEach(function() {

        });

        it('should initialise correctly', function () {
            function createSearchTabsView() {
                var searchTabsViewInstance = new searchTabs_view();
            }

            expect(createSearchTabsView).to.not.throw(Error);
        });

    });
});