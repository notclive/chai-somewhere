var chai = require('chai');
var chaiSomewhere = require('../chai-somewhere');
var expect = chai.expect;

chai.use(chaiSomewhere);

describe('chai somewhere with the property assertion', function () {

    it('checks the root object', function () {
        expect({foo: 'bar'}).to.have.somewhere.property('foo');
    });

    it('checks the child of an object', function () {
        expect({child: {foo: 'bar'}}).to.have.somewhere.property('foo');
    });

    it('checks the child of an array', function () {
        expect([{foo: 'bar'}]).to.have.somewhere.property('foo');
    });

    it('checks deeply nested children', function () {
        expect([{child: [{child: {foo: 'bar'}}]}]).to.have.somewhere.property('foo');
    });

    it('handles cyclic references', function () {
        var cyclic = {};
        cyclic.child = cyclic;

        expect([cyclic, {foo: 'bar'}]).to.have.somewhere.property('foo');
    });

    it('doesn\'t match when the property isn\'t anywhere', function () {
        expect([{child: [{child: {foo: 'baz'}}]}]).to.not.have.anywhere.property('fu');
    });

    it('only takes effect when the somewhere property is present', function () {
        expect({child: {foo: 'bar'}}).to.not.have.property('foo');
    });

    it('property sets the chain object to be the first matched object', function () {
        expect({child: {foo: 'bar'}}).to.have.somewhere.property('foo').that.equals('bar');
    });
});