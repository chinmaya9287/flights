define(['chai', 'chai-jquery', 'searchForm/SearchForm_controller'], function (chai, plugin, SearchForm_controller) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs Controller', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly when passed a view and a service', function () {
            function createSearchFormController() {
                var searchFormControllerInstance = new SearchForm_controller({
                    view: {
                        displayPriceRange: function () {}
                    },
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                });
            }

            expect(createSearchFormController).to.not.throw(Error);
        });

        it('should set callbacks correctly', function () {
            var searchFormControllerInstance = new SearchForm_controller({
                    view: {
                        displayPriceRange: function () {}
                    },
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                }),
                callbacks = {
                    searchSubmitCallback: function() {}
                };

            searchFormControllerInstance.setCallbacks(callbacks);

            expect(searchFormControllerInstance.searchSubmitCallback).to.equal(callbacks.searchSubmitCallback);
        });

        it('should build dropdowns on the view correctly', function () {
            var view = {
                    buildOriginDropdowns: function (list, callback) {
                        callback(1);
                    },
                    displayPriceRange: function () {}
                },
                service = {
                    originList: [],
                    getFlightRoutes: function () {}
                },
                searchFormControllerInstance = new SearchForm_controller({
                    view: view,
                    service: service,
                    options: {
                        callbacks: {}
                    }
                }),
                getAvailableDestinationsStub;

            getAvailableDestinationsStub = sandbox.stub(searchFormControllerInstance, 'getAvailableDestinations');

            searchFormControllerInstance.buildDropdowns();

            expect(service.selectedOriginID).equals(1);
            assert(getAvailableDestinationsStub.calledWith(1));
        });

        it('should update one way flag', function () {
            var searchFormControllerInstance = new SearchForm_controller({
                    view: {
                        resetPrice: function() {},
                        displayPriceRange: function () {}
                    },
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                });

            searchFormControllerInstance.updateIsOneWay(true);

            expect(searchFormControllerInstance.isOneWay).to.equal(true);
        });

        it('should retrieve available destinations', function () {
            var view = {
                    buildDestinationDropdown: function (list, callback) {
                        callback(1);
                    },
                    displayPriceRange: function () {}
                },
                service = {
                    originList: [],
                    destinationList: [],
                    getFlightRoutes: function () {},
                    getAvailableDestinations: function () {}
                },
                searchFormControllerInstance = new SearchForm_controller({
                    view: view,
                    service: service,
                    options: {
                        callbacks: {}
                    }
                });

            searchFormControllerInstance.getAvailableDestinations(1);

            expect(service.getAvailableDestinations).to.be.called;
            expect(view.buildDestinationDropdown).to.be.called;
            expect(service.selectedDestinationID).to.equal(1);
        });

        it('should trigger a search on submit', function () {
            var view = {
                    buildDestinationDropdown: function (list, callback) {
                        callback(1);
                    },
                    displayPriceRange: function () {}
                },
                service = {
                    selectedOriginID: 1,
                    selectedDestinationID: 2,
                    originList: [],
                    destinationList: [],
                    getFlightRoutes: function () {},
                    getAvailableDestinations: function () {}
                },
                searchFormControllerInstance = new SearchForm_controller({
                    view: view,
                    service: service,
                    options: {
                        callbacks: {}
                    }
                }),
                data = {
                    departureDate: new Date(),
                    passengers: 1
                };


            searchFormControllerInstance.isOneWay = true;
            searchFormControllerInstance.searchSubmitCallback = function () {};
            searchFormControllerInstance.refinePriceCallback = function() {};

            searchFormControllerInstance.searchSubmit(data, 100, 300);

            expect(searchFormControllerInstance.searchSubmitCallback).to.be.called;
        });
    });
});