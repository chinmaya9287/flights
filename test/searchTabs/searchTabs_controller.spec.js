define(['chai', 'chai-jquery', 'searchTabs/searchTabs_controller'], function (chai, plugin, searchTabs_controller) {

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
            function createSearchTabsController() {
                var searchTabsControllerInstance = new searchTabs_controller({
                    view: {},
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                });
            }

            expect(createSearchTabsController).to.not.throw(Error);
        });

        it('should set callbacks correctly', function () {
            var searchTabsControllerInstance = new searchTabs_controller({
                    view: {},
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

            searchTabsControllerInstance.setCallbacks(callbacks);

            expect(searchTabsControllerInstance.searchSubmitCallback).to.equal(callbacks.searchSubmitCallback);
        });

        it('should build dropdowns on the view correctly', function () {
            var view = {
                    buildOriginDropdowns: function (list, callback) {
                        callback(1);
                    }
                },
                service = {
                    originList: [],
                    getFlightRoutes: function () {}
                },
                searchTabsControllerInstance = new searchTabs_controller({
                    view: view,
                    service: service,
                    options: {
                        callbacks: {}
                    }
                }),
                getAvailableDestinationsStub;

            getAvailableDestinationsStub = sandbox.stub(searchTabsControllerInstance, 'getAvailableDestinations');

            searchTabsControllerInstance.buildDropdowns();

            expect(service.selectedOriginID).equals(1);
            assert(getAvailableDestinationsStub.calledWith(1));
        });

        it('should update one way flag', function () {
            var searchTabsControllerInstance = new searchTabs_controller({
                    view: {},
                    service: {
                        getFlightRoutes: function () {}
                    },
                    options: {
                        callbacks: {}
                    }
                });

            searchTabsControllerInstance.updateIsOneWay(true);

            expect(searchTabsControllerInstance.isOneWay).to.equal(true);
        });

        it('should retrieve available destinations', function () {
            var view = {
                    buildDestinationDropdown: function (list, callback) {
                        callback(1);
                    }
                },
                service = {
                    originList: [],
                    destinationList: [],
                    getFlightRoutes: function () {},
                    getAvailableDestinations: function () {}
                },
                searchTabsControllerInstance = new searchTabs_controller({
                    view: view,
                    service: service,
                    options: {
                        callbacks: {}
                    }
                });

            searchTabsControllerInstance.getAvailableDestinations(1);

            expect(service.getAvailableDestinations).to.be.called;
            expect(view.buildDestinationDropdown).to.be.called;
            expect(service.selectedDestinationID).to.equal(1);
        });

        it('should trigger a search on submit', function () {
            var view = {
                    buildDestinationDropdown: function (list, callback) {
                        callback(1);
                    }
                },
                service = {
                    selectedOriginID: 1,
                    selectedDestinationID: 2,
                    originList: [],
                    destinationList: [],
                    getFlightRoutes: function () {},
                    getAvailableDestinations: function () {}
                },
                searchTabsControllerInstance = new searchTabs_controller({
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


            searchTabsControllerInstance.isOneWay = true;
            searchTabsControllerInstance.searchSubmitCallback = function () {};

            searchTabsControllerInstance.searchSubmit(data);

            expect(searchTabsControllerInstance.searchSubmitCallback).to.be.called;
        });
    });
});