define(['chai', 'chai-jquery', 'searchResults/SearchResults_service'], function (chai, plugin, SearchResults_service) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Results Service', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createSearchResultsService() {
                var searchResultsServiceInstance = new SearchResults_service();
            }

            expect(createSearchResultsService).to.not.throw(Error);
        });

    });
});