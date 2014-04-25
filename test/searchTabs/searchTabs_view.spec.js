define(['chai', 'chai-jquery', 'searchTabs/SearchTabs_view'], function (chai, plugin, SearchTabs_view) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs View', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createSearchTabsView() {
                var searchTabsViewInstance = new SearchTabs_view();
            }

            expect(createSearchTabsView).to.not.throw(Error);
        });

    });
});