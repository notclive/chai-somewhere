var traverse = require('traverse');

module.exports = function (chai, utils) {

    utils.addProperty(chai.Assertion.prototype, 'somewhere', setSomewhereFlag);
    utils.addProperty(chai.Assertion.prototype, 'anywhere', setSomewhereFlag);

    utils.overwriteChainableMethod(chai.Assertion.prototype, 'contain', overwriteWithTypeFilter(isArrayOrString), keepSameBehaviour);
    utils.overwriteChainableMethod(chai.Assertion.prototype, 'contains', overwriteWithTypeFilter(isArrayOrString), keepSameBehaviour);
    utils.overwriteChainableMethod(chai.Assertion.prototype, 'include', overwriteWithTypeFilter(isArrayOrString), keepSameBehaviour);
    utils.overwriteChainableMethod(chai.Assertion.prototype, 'includes', overwriteWithTypeFilter(isArrayOrString), keepSameBehaviour);

    utils.overwriteMethod(chai.Assertion.prototype, 'property', overwriteWithTypeFilter(allTypes));

    function setSomewhereFlag() {
        utils.flag(this, 'somewhere', true);
        return this;
    };

    function allTypes() {
        return true;
    }

    function isArrayOrString(object) {
        return Array.isArray(object) || object instanceof Array || typeof object === 'string';
    }

    function keepSameBehaviour(_super) {
        return _super;
    }

    function overwriteWithTypeFilter(typeFilter) {
        return function (_super) {
            return function () {
                if (utils.flag(this, 'somewhere')) {
                    performSomewhereAssertion(this, _super, arguments, typeFilter);
                } else {
                    _super.apply(this, arguments);
                }
            };
        };
    }

    function performSomewhereAssertion(assertion, overwrittenMethod, testArguments, typeFilter) {
        var object = utils.flag(assertion, 'object');
        if (utils.flag(assertion, 'negate')) {
            checkAssertionNegativeCase(assertion, object, overwrittenMethod, testArguments, typeFilter);
        } else {
            checkAssertionPositiveCase(assertion, object, overwrittenMethod, testArguments, typeFilter);
        }
    }

    function checkAssertionNegativeCase(assertion, object, overwrittenMethod, testArguments, typeFilter) {
        traverse(object).forEach(function (node) {
            utils.flag(assertion, 'object', node);
            if (!typeFilter || typeFilter(node)) {
                overwrittenMethod.apply(assertion, testArguments);
            }
        });
    }

    function checkAssertionPositiveCase(assertion, object, overwrittenMethod, testArguments, typeFilter) {
        var found = false;
        traverse(object).forEach(function (node) {
            if (!found) {
                if (!typeFilter || typeFilter(node)) {
                    try {
                        utils.flag(assertion, 'object', node);
                        overwrittenMethod.apply(assertion, testArguments);
                        found = true;
                    } catch (ignore) {
                        // Keep looking.
                    }
                }
            }
        });
        if (!found) {
            // Call again with root object to get best error message.
            utils.flag(assertion, 'object', object);
            overwrittenMethod.apply(assertion, testArguments);
        }
    }
};