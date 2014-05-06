define(['chai', 'chai-jquery', 'searchResults/SearchResults_controller'], function (chai, plugin, SearchResults_controller) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Results Controller', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly when passed a view and a service', function () {

            function createSearchResultsController() {
                var searchResultsControllerInstance = new SearchResults_controller({
                    view: {},
                    service: {
                        getFlights: function () {}
                    }

                });
            }

            expect(createSearchResultsController).to.not.throw(Error);
        });

        it('should initialise correctly when passed the price range options', function () {
            var getFlightsStub = sandbox.stub(),
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {},
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
            });


            assert(getFlightsStub.called);
            assert(searchResultsControllerInstance.maxPrice, 10);
            assert(searchResultsControllerInstance.minPrice, 1);

        });

        it('should initialise correctly when passed the price range options', function () {
            var getFlightsStub = sandbox.stub(),
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {},
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });


            assert(getFlightsStub.called);
            assert(searchResultsControllerInstance.maxPrice, 10);
            assert(searchResultsControllerInstance.minPrice, 1);

        });

        it('should filter the flight from origin lists when performing a one way search search', function () {
            var destroyListStub = sandbox.stub(),
                filterFlightsFromOriginStub = sandbox.stub(),
                filterFlightsFromDestinationStub = sandbox.stub(),
                filterData = {isOneWay: true},
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        destroyList: destroyListStub
                    },
                    service: {
                        getFlights: function() {},
                        filterFlightsFromOrigin: filterFlightsFromOriginStub,
                        filterFlightsFromDestination: filterFlightsFromDestinationStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });

            searchResultsControllerInstance.searchFlights(filterData, 1, 10);
            assert(destroyListStub.called);

            assert(searchResultsControllerInstance.filterData, filterData);
            assert(filterFlightsFromOriginStub.called);

            assert.isFalse(filterFlightsFromDestinationStub.called);

        });

        it('should filter the flight from destination lists when performing return search search', function () {
            var destroyListStub = sandbox.stub(),
                filterFlightsFromOriginStub = sandbox.stub(),
                filterFlightsFromDestinationStub = sandbox.stub(),
                filterData = {isOneWay: false},
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        destroyList: destroyListStub
                    },
                    service: {
                        getFlights: function() {},
                        filterFlightsFromOrigin: filterFlightsFromOriginStub,
                        filterFlightsFromDestination: filterFlightsFromDestinationStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });

            searchResultsControllerInstance.searchFlights(filterData, 1, 10);
            assert(destroyListStub.called);

            assert(searchResultsControllerInstance.filterData, filterData);
            assert(filterFlightsFromOriginStub.called);

            assert(filterFlightsFromDestinationStub.called);

        });


        it('should buildFlightsFromOrigin without refine search by price ', function () {
            var getFlightsStub = sandbox.stub(),
                buildFlightsFromOriginStub = sandbox.stub(),
                refineSearchByPriceStub = sandbox.stub(),
                list = [{1:"1"}],
                filterData = {a: "a"},
                priceFrom = 1,
                priceTo = 10,
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        buildFlightsFromOrigin: buildFlightsFromOriginStub,
                        refineSearchByPrice: refineSearchByPriceStub
                    },
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });


            searchResultsControllerInstance.buildFlightsFromOrigin(list, filterData, priceFrom, priceTo);
            assert(buildFlightsFromOriginStub.calledWith(list, filterData));
            assert.isFalse(refineSearchByPriceStub.called);

        });

        it('should buildFlightsFromOrigin with refine search by price ', function () {
            var getFlightsStub = sandbox.stub(),
                buildFlightsFromOriginStub = sandbox.stub(),
                refineSearchByPriceStub = sandbox.stub(),
                list = [{1:"1"}],
                filterData = {a: "a"},
                priceFrom = 2,
                priceTo = 7,
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        buildFlightsFromOrigin: buildFlightsFromOriginStub,
                        refineSearchByPrice: refineSearchByPriceStub
                    },
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });


            searchResultsControllerInstance.buildFlightsFromOrigin(list, filterData, priceFrom, priceTo);
            assert(buildFlightsFromOriginStub.calledWith(list, filterData));
            assert(refineSearchByPriceStub.calledWith(2, 7));

        });

        it('should buildFlightsFromDestination without refine search by price ', function () {
            var getFlightsStub = sandbox.stub(),
                buildFlightsFromDestinationStub = sandbox.stub(),
                refineSearchByPriceStub = sandbox.stub(),
                list = [{1:"1"}],
                filterData = {a: "a"},
                priceFrom = 1,
                priceTo = 10,
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        buildFlightsFromDestination: buildFlightsFromDestinationStub,
                        refineSearchByPrice: refineSearchByPriceStub
                    },
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });


            searchResultsControllerInstance.buildFlightsFromDestination(list, filterData, priceFrom, priceTo);
            assert(buildFlightsFromDestinationStub.calledWith(list, filterData));
            assert.isFalse(refineSearchByPriceStub.called);

        });

        it('should buildFlightsFromOrigin with refine search by price ', function () {
            var getFlightsStub = sandbox.stub(),
                buildFlightsFromDestinationStub = sandbox.stub(),
                refineSearchByPriceStub = sandbox.stub(),
                list = [{1:"1"}],
                filterData = {a: "a"},
                priceFrom = 2,
                priceTo = 7,
                searchResultsControllerInstance = new SearchResults_controller({
                    view: {
                        buildFlightsFromDestination: buildFlightsFromDestinationStub,
                        refineSearchByPrice: refineSearchByPriceStub
                    },
                    service: {
                        getFlights: getFlightsStub
                    },
                    options: {
                        maxPrice: 10,
                        minPrice: 1
                    }
                });


            searchResultsControllerInstance.buildFlightsFromDestination(list, filterData, priceFrom, priceTo);
            assert(buildFlightsFromDestinationStub.calledWith(list, filterData));
            assert(refineSearchByPriceStub.calledWith(2, 7));

        });
    });
});