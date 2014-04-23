define(['chai', 'chai-jquery', 'searchTabs/searchTabs_controller'], function (chai, plugin, searchTabs_controller) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs Controller', function() {

        beforeEach(function() {

        });

        afterEach(function() {

        });

        it('should initialise correctly when passed a view and a service', function () {
            function createSearchTabsController() {
                var searchTabsControllerInstance = new searchTabs_controller({
                    view: {},
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                });
            }

            expect(createSearchTabsController).to.not.throw(Error);
        });

    });
});