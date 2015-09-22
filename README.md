# Chai Somewhere

Chai Somewhere is a Chai plugin that lets you test whether an assertion applies somewhere within a test object.

Chai Somewhere adds the words 'somewhere' and 'anywhere' to Chai's chainable language.

When the words 'somewhere' or 'anywhere' are used in a chain the assertion will try to recursively match on children of the object under test.

The word 'somewhere' and 'anywhere' can be used interchangeably, 'somewhere' is generally more idiomatic in the positive case and 'anywhere' is more idiomatic in the negative case. 

Chai Somewhere currently supports the following assertions

* property
* include/includes/contain/contains

## Examples

All of the following examples are true:

    var chai = require('chai');
    var chaiSomewhere = require('chai-somewhere');
    chai.use(chaiSomewhere);

    expect({child: {foo: 'bar'}}).to.have.somewhere.property('foo');

    expect([{foo: 'bar'}]).to.have.somewhere.property('foo');

    expect([{child: [{child: {foo: 'bar'}}]}]).to.have.somewhere.property('foo');

    expect([{child: [{child: {foo: 'bar'}}]}]).to.not.have.anywhere.property('fu');

See the tests for further examples.