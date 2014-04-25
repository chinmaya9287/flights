define(['chai', 'chai-jquery', 'controls/Select2Dropdown'], function (chai, plugin, Select2Dropdown) {

    var expect = chai.expect;

    chai.use(plugin);

    describe('Select2 Dropdown', function() {
        var sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should fail to initialise if no parameters are passed in', function () {
            function createSelect2Dropdown() {
                var selectInstance = new Select2Dropdown();
            }

            expect(createSelect2Dropdown).to.throw(Error);
        });

        it('should initialise correctly when created with required parameters', function () {
            function createSelect2Dropdown() {
                var selectInstance = new Select2Dropdown({
                    id: 'selectID',
                    parentElement: $('<div></div>')
                });
            }

            expect(createSelect2Dropdown).to.not.throw(Error);
        });

        it('should have a class name when passed a class name parameter', function () {
            var selectInstance = new Select2Dropdown({
                id: 'selectID',
                parentElement: $('<div></div>'),
                className: 'testClass'
            });

            expect($(selectInstance.element)).to.have.class('testClass');
        });

        it('should create a single grouped list when passed a single data list to buildOptions', function () {
            var selectInstance,
                dataList,
                $group,
                $option;

            selectInstance = new Select2Dropdown({
                id: 'selectID',
                parentElement: $('<div></div>')
            });

            dataList = {
                Group1: [
                    {
                        id: 'option1',
                        name: 'Option 1'
                    }
                ]
            };

            selectInstance.buildOptions(dataList);

            $group = $(selectInstance.element).children();
            $option = $group.children();

            expect($group).to.have.attr('label', 'Group1');

            expect($option).to.have.attr('value', 'option1');
            expect($option).to.have.text('Option 1');
        });

        it('should create a multiple grouped list when passed a multiple data list to buildOptions', function () {
            var selectInstance,
                dataList,
                $group1,
                $group2,
                $option1,
                $option2,
                $option3,
                $option4;

            selectInstance = new Select2Dropdown({
                id: 'selectID',
                parentElement: $('<div></div>')
            });

            dataList = {
                Group1: [
                    {
                        id: 'option1',
                        name: 'Option 1'
                    },
                    {
                        id: 'option2',
                        name: 'Option 2'
                    }
                ],
                Group2: [
                    {
                        id: 'option3',
                        name: 'Option 3'
                    },
                    {
                        id: 'option4',
                        name: 'Option 4'
                    }
                ]
            };

            selectInstance.buildOptions(dataList);

            $group1 = $(selectInstance.element).children().first();
            $option1 = $group1.children().first();
            $option2 = $group1.children().last();

            $group2 = $(selectInstance.element).children().last();
            $option3 = $group2.children().first();
            $option4 = $group2.children().last();

            expect($group1).to.have.attr('label', 'Group1');
            expect($option1).to.have.attr('value', 'option1');
            expect($option1).to.have.text('Option 1');
            expect($option2).to.have.attr('value', 'option2');
            expect($option2).to.have.text('Option 2');

            expect($group2).to.have.attr('label', 'Group2');
            expect($option3).to.have.attr('value', 'option3');
            expect($option3).to.have.text('Option 3');
            expect($option4).to.have.attr('value', 'option4');
            expect($option4).to.have.text('Option 4');
        });


    });
});
