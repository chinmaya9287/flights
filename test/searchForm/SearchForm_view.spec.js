define(['chai', 'chai-jquery', 'searchForm/SearchForm_view'], function (chai, plugin, SearchForm_view) {

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
            function createSearchFormView() {
                var searchFormViewInstance = new SearchForm_view();
            }

            expect(createSearchFormView).to.not.throw(Error);
        });

    });
});