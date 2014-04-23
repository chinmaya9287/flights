define(['chai', 'chai-jquery', 'searchResults/searchResults_service'], function (chai, plugin, searchResults_service) {

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
                var searchResultsServiceInstance = new searchResults_service();
            }

            expect(createSearchResultsService).to.not.throw(Error);
        });

    });
});