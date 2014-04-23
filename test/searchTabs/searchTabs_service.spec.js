define(['chai', 'chai-jquery', 'searchTabs/searchTabs_service'], function (chai, plugin, searchTabs_service) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs Service', function() {

        beforeEach(function() {

        });

        afterEach(function() {

        });

        it('should initialise correctly', function () {
            function createSearchTabsService() {
                var searchTabsServiceInstance = new searchTabs_service();
            }

            expect(createSearchTabsService).to.not.throw(Error);
        });

    });
});