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

        it('should retrieve a list of flight ', function () {
            var searchResultsServiceInstance = new SearchResults_service(),
                ajaxStub,
                data = [
                        {
                            "id": 1,
                            "flightNumber": "A-001",
                            "flightRouteID": 1,
                            "originCityID": 1,
                            "originCityName": "Adelaide",
                            "destinationCityID": 2,
                            "destinationCityName": "Brisbane",
                            "departureDateTime": "2014-04-21T20:00:00.000Z",
                            "arrivalDateTime": "2014-04-21T21:00:00.000Z",
                            "price": 150
                        },
                        {
                            "id": 2,
                            "flightNumber": "A-002",
                            "flightRouteID": 1,
                            "originCityID": 2,
                            "originCityName": "Brisbane",
                            "destinationCityID": 1,
                            "destinationCityName": "Adelaide",
                            "departureDateTime": "2014-04-21T08:00:00.000Z",
                            "arrivalDateTime": "2014-04-21T09:00:00.000Z",
                            "price": 150
                        }
                ];

            ajaxStub = sandbox.stub($, 'ajax');
            ajaxStub.returns({
                done: function (callback) {
                    callback(data);
                    return {
                        fail: function () {}
                    };
                }
            });


            searchResultsServiceInstance.getFlights();

            expect(searchResultsServiceInstance.flightList).equals(data);
        });

        it('should filter the flight list based on the provided search fields', function() {
           var data = {
                   selectedOriginID: 1,
                   selectedDestinationID: 2
               },
               results,
               searchResultsServiceInstance = new SearchResults_service();

            searchResultsServiceInstance.flightList = [{
                id: 1,
                originCityID: 1,
                destinationCityID: 2
            }, {
                id: 2,
                originCityID: 1,
                destinationCityID: 2
            }, {
                id: 3,
                originCityID: 2,
                destinationCityID: 1
            }, {
                id: 4,
                originCityID: 2,
                destinationCityID: 3
            }];

            results = searchResultsServiceInstance.filterFlights(data);

            assert(results.length, 2);
            assert(results[0], searchResultsServiceInstance.flightList[0]);
            assert(results[1], searchResultsServiceInstance.flightList[1]);
        });

    });
});