define(['chai', 'chai-jquery', 'searchResults/searchResults_view'], function (chai, plugin, searchResults_view) {

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
                var searchResultsViewInstance = new searchResults_view();
            }

            expect(createSearchResultsView).to.not.throw(Error);
        });

    });
});