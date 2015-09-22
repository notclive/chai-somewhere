var chai = require('chai');
var chaiSomewhere = require('../chai-somewhere');
var expect = chai.expect;

chai.use(chaiSomewhere);

describe('chai somewhere with the contain assertion', function () {

    it('checks the root object', function () {
        expect(['foo']).to.somewhere.contain('foo');
    });

    it('checks the child of an object', function () {
        expect({child: ['foo']}).to.somewhere.contain('foo');
    });

    it('checks the child of an array', function () {
        expect([['foo']]).to.somewhere.contain('foo');
    });

    it('checks deeply nested children', function () {
        expect([{child: [{child: ['foo']}]}]).to.somewhere.contain('foo');
    });

    it('handles cyclic references', function () {
        var cyclic = {};
        cyclic.child = cyclic;

        expect([cyclic, 'foo']).to.somewhere.contain('foo');
    });

    it('doesn\'t match when the value isn\'t anywhere', function () {
        expect([{child: [{child: ['foo']}]}]).not.to.anywhere.contain('fu');
    });

    it('only takes effect when the somewhere property is present', function () {
        expect([['foo']]).not.to.contain('foo');
    });
});