"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsDefined = void 0;
function assertIsDefined(value) {
    if (!value) {
        throw new Error(`Expected 'value' to be defined, but received ${value}`);
    }
}
exports.assertIsDefined = assertIsDefined;
// we use T instead of any because we want to keep a non-nullable type
//asserts is a type predicate that asserts the value is of a certain type, provided by TypeScript
//value === undefined || value === null or !value is the check for null or undefined
