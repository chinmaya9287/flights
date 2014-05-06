define(['chai', 'chai-jquery', 'flightTabs/FlightTabs_controller'], function (chai, plugin, FlightTabs_controller) {

    var expect = chai.expect;
    chai.use(plugin);

    describe('Flight Tabs Controller', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should initialise correctly', function () {
            function createFlightTabsController() {
                var flightTabsControllerInstance = new FlightTabs_controller({
                    view: {
                        bindUIEvents: function(){}
                    }
                });
            }

            expect(createFlightTabsController).to.not.throw(Error);
        });

        it('should initialise set the variables correctly', function () {
            var callback1 = sandbox.spy(),
                flightTabsControllerInstance = new FlightTabs_controller({
                    view: {
                        bindUIEvents: function(){}
                    },
                    options: {
                        callbacks: {
                            clickTabCallback: callback1
                        }
                    }
                });

            assert(flightTabsControllerInstance.isOneWay, true);
            assert(flightTabsControllerInstance.clickTabCallback, callback1);
        });

        it('should trigger click tab event when the tab is changed', function () {
            var callback1 = sandbox.spy(),
                isOneWay = false,
                flightTabsControllerInstance = new FlightTabs_controller({
                    view: {
                        bindUIEvents: function(){}
                    },
                    options: {
                        callbacks: {
                            clickTabCallback: callback1
                        }
                    }
                });

            flightTabsControllerInstance.clickTab(isOneWay);

            assert.isFalse(flightTabsControllerInstance.isOneWay);
            assert(callback1.called);
        });

    });
});