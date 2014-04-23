define(['chai', 'chai-jquery', 'searchResults/searchResults_controller'], function (chai, plugin, searchResults_controller) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Results Controller', function() {

        beforeEach(function() {

        });

        afterEach(function() {

        });

        it('should initialise correctly when passed a view and a service', function () {
            function createSearchResultsController() {
                var searchResultsControllerInstance = new searchResults_controller({
                    view: {},
                    service: {
                        getFlights: function () {}
                    }
                });
            }

            expect(createSearchResultsController).to.not.throw(Error);
        });

    });
});