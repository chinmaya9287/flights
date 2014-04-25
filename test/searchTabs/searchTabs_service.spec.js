define(['chai', 'chai-jquery', 'searchTabs/SearchTabs_service'], function (chai, plugin, SearchTabs_service) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Search Tabs Service', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createSearchTabsService() {
                var searchTabsServiceInstance = new SearchTabs_service();
            }

            expect(createSearchTabsService).to.not.throw(Error);
        });

        it('should retrieve a list of flight routes and make a call to format the data', function () {
            var searchTabsServiceInstance = new SearchTabs_service(),
                groupByCountriesStub,
                ajaxStub,
                data = {
                    cities: [
                        {
                            "id": 1,
                            "cityName": "TestCity1",
                            "countryID": 1,
                            "countryName": "TestCountry1"
                        },
                        {
                            "id": 2,
                            "cityName": "TestCity2",
                            "countryID": 2,
                            "countryName": "TestCountry2"
                        }
                    ],
                    flightRoutes: [
                        {
                            "id": 1,
                            "originCityID": 1,
                            "originCityName": "TestCity1",
                            "destinationCityID": 2,
                            "destinationCityName": "TestCity2"
                        }
                    ]
                };

            ajaxStub = sandbox.stub($, 'ajax');
            ajaxStub.returns({
                done: function (callback) {
                    callback(data);
                    return {
                        fail: function () {}
                    };
                }
            });


            groupByCountriesStub = sandbox.stub(searchTabsServiceInstance, 'groupByCountries');

            searchTabsServiceInstance.getFlightRoutes();

            assert(groupByCountriesStub.calledWith(data.cities));

            expect(searchTabsServiceInstance.cityList).equals(data.cities);
            expect(searchTabsServiceInstance.flightRoutes).equals(data.flightRoutes);
        });

        it('should group cities by country', function () {
            var searchTabsServiceInstance = new SearchTabs_service(),
                data = {
                    cities: [
                        {
                            "id": 1,
                            "cityName": "TestCity1",
                            "countryID": 1,
                            "countryName": "TestCountry1"
                        },
                        {
                            "id": 2,
                            "cityName": "TestCity2",
                            "countryID": 2,
                            "countryName": "TestCountry2"
                        }
                    ]
                },
                formattedData;

            formattedData = searchTabsServiceInstance.groupByCountries(data.cities);



            expect(formattedData).to.have.property('TestCountry1');
            expect(formattedData).to.have.property('TestCountry2');
        });

        it('should preselect the first city in the list', function () {
            var searchTabsServiceInstance = new SearchTabs_service(),
                data = {
                    cities: [
                        {
                            "id": 1,
                            "cityName": "TestCity1",
                            "countryID": 1,
                            "countryName": "TestCountry1"
                        },
                        {
                            "id": 2,
                            "cityName": "TestCity2",
                            "countryID": 2,
                            "countryName": "TestCountry2"
                        }
                    ]
                };

            searchTabsServiceInstance.cityList = data.cities;

            searchTabsServiceInstance.preselectOrigin();

            expect(searchTabsServiceInstance.selectedOriginID).to.equal(data.cities[0].id);
        });

        it('should return all available destinations for the selected origin', function () {
            var searchTabsServiceInstance = new SearchTabs_service(),
                data = {
                    cities: [
                        {
                            "id": 1,
                            "cityName": "TestCity1",
                            "countryID": 1,
                            "countryName": "TestCountry1"
                        },
                        {
                            "id": 2,
                            "cityName": "TestCity2",
                            "countryID": 2,
                            "countryName": "TestCountry2"
                        }
                    ],
                    flightRoutes: [
                        {
                            "id": 1,
                            "originCityID": 1,
                            "originCityName": "TestCity1",
                            "destinationCityID": 2,
                            "destinationCityName": "TestCity2"
                        }
                    ]
                };

            searchTabsServiceInstance.cityList = data.cities;
            searchTabsServiceInstance.flightRoutes = data.flightRoutes;

            searchTabsServiceInstance.getAvailableDestinations(data.cities[0].id);

            expect(searchTabsServiceInstance.destinationList).to.have.property('TestCountry2');
            expect(searchTabsServiceInstance.destinationList.TestCountry2).to.have.length(1);
            expect(searchTabsServiceInstance.destinationList.TestCountry2[0]).to.equal(data.cities[1]);
        });
    });
});