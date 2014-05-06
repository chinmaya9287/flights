define(['chai', 'chai-jquery', 'flightTabs/FlightTabs_view'], function (chai, plugin, FlightTabs_view) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Flight Tabs View', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createFlightTabsview() {
                var flightTabsviewInstance = new FlightTabs_view();
            }

            expect(createFlightTabsview).to.not.throw(Error);
        });

    });
});