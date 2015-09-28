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

    it('does not match when the property is not anywhere', function () {
        expect([{child: [{child: {foo: 'baz'}}]}]).not.to.have.anywhere.property('fu');
    });

    it('does not match when the property exists with a different value', function () {
        expect({child: {foo: 'baz'}}).not.to.have.anywhere.property('foo', 'bar');
    });

    it('only checks children when the somewhere property is present', function () {
        expect({child: {foo: 'bar'}}).not.to.have.property('foo');
    });

    it('sets the chain object to be the first matched object', function () {
        expect({child: {foo: 'bar'}}).to.have.somewhere.property('foo').that.equals('bar');
    });

    it('does not try asserting on boolean values', function () {
        expect([true, {foo: 'bar'}]).to.not.have.anywhere.property('fu');
    });
});