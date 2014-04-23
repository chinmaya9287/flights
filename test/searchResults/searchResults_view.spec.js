define(['chai', 'chai-jquery', 'searchResults/searchResults_view'], function (chai, plugin, searchResults_view) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Results View', function() {

        beforeEach(function() {

        });

        afterEach(function() {

        });

        it('should initialise correctly', function () {
            function createSearchResultsView() {
                var searchResultsViewInstance = new searchResults_view();
            }

            expect(createSearchResultsView).to.not.throw(Error);
        });

    });
});