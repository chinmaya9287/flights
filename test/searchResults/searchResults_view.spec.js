define(['chai', 'chai-jquery', 'searchResults/SearchResults_view'], function (chai, plugin, SearchResults_view) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Results View', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createSearchResultsView() {
                var searchResultsViewInstance = new SearchResults_view();
            }

            expect(createSearchResultsView).to.not.throw(Error);
        });

    });
});