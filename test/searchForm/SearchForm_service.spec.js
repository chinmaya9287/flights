define(['chai', 'chai-jquery', 'searchForm/SearchForm_service'], function (chai, plugin, SearchForm_service) {

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
            function createSearchFormService() {
                var searchFormServiceInstance = new SearchForm_service();
            }

            expect(createSearchFormService).to.not.throw(Error);
        });

        it('should retrieve a list of flight routes and make a call to format the data', function () {
            var searchFormServiceInstance = new SearchForm_service(),
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


            groupByCountriesStub = sandbox.stub(searchFormServiceInstance, 'groupByCountries');

            searchFormServiceInstance.getFlightRoutes();

            assert(groupByCountriesStub.calledWith(data.cities));

            expect(searchFormServiceInstance.cityList).equals(data.cities);
            expect(searchFormServiceInstance.flightRoutes).equals(data.flightRoutes);
        });

        it('should group cities by country', function () {
            var searchFormServiceInstance = new SearchForm_service(),
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

            formattedData = searchFormServiceInstance.groupByCountries(data.cities);



            expect(formattedData).to.have.property('TestCountry1');
            expect(formattedData).to.have.property('TestCountry2');
        });

        it('should preselect the first city in the list', function () {
            var searchFormServiceInstance = new SearchForm_service(),
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

            searchFormServiceInstance.cityList = data.cities;

            searchFormServiceInstance.preselectOrigin();

            expect(searchFormServiceInstance.selectedOriginID).to.equal(data.cities[0].id);
        });

        it('should return all available destinations for the selected origin', function () {
            var searchFormServiceInstance = new SearchForm_service(),
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

            searchFormServiceInstance.cityList = data.cities;
            searchFormServiceInstance.flightRoutes = data.flightRoutes;

            searchFormServiceInstance.getAvailableDestinations(data.cities[0].id);

            expect(searchFormServiceInstance.destinationList).to.have.property('TestCountry2');
            expect(searchFormServiceInstance.destinationList.TestCountry2).to.have.length(1);
            expect(searchFormServiceInstance.destinationList.TestCountry2[0]).to.equal(data.cities[1]);
        });
    });
});