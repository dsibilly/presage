/* eslint no-undefined: 0 */

import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import promiseWithCallback from '../js/promise-with-callback';

describe('promiseWithCallback', () => {
    describe('without a value resolver', () => {
        let callbackFunction,
            promise;

        beforeEach(() => {
            ({
                callbackFunction,
                promise
            } = promiseWithCallback());
        });

        describe('when the callback is invoked without any arguments', () => {
            it('should resolve with undefined', () => {
                setImmediate(callbackFunction);
                return promise.then(result => {
                    expect(result).to.equal(undefined);
                });
            });
        });

        describe('when the callback is invoked with a single argument', () => {
            it('should resolve with the value of the argument', () => {
                setImmediate(callbackFunction, null, 'value');
                return promise.then(result => {
                    expect(result).to.equal('value');
                });
            });
        });

        describe('when the callback is invoked with multiple arguments', () => {
            it('should resolve with the value of the first argument', () => {
                setImmediate(callbackFunction, null, 'a', 'b', 'c');
                return promise.then(result => {
                    expect(result).to.equal('a');
                });
            });
        });

        describe('when the callback is invoked with an Error', () => {
            it('should reject with the Error', () => {
                setImmediate(callbackFunction, new Error('test error'));
                return promise.catch(error => {
                    expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
                });
            });
        });

        describe('when the callback is invoked with an Error and arguments', () => {
            it('should ignore the arguments and reject with the Error', () => {
                setImmediate(callbackFunction, new Error('test error'), 'a', 'b', 'c');
                return promise.catch(error => {
                    expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
                });
            });
        });
    });

    describe('with a value resolver', () => {
        let callbackFunction,
            promise;

        beforeEach(() => {
            ({
                callbackFunction,
                promise
            } = promiseWithCallback((...args) => `(${args.join(', ')})`));
        });

        describe('when the callback is invoked without any arguments', () => {
            it('should resolve with undefined', () => {
                setImmediate(callbackFunction);
                return promise.then(result => {
                    expect(result).to.equal('()');
                });
            });
        });

        describe('when the callback is invoked with a single argument', () => {
            it('should resolve with the value returned by the value resolver', () => {
                setImmediate(callbackFunction, null, 'value');
                return promise.then(result => {
                    expect(result).to.equal('(value)');
                });
            });
        });

        describe('when the callback is invoked with multiple arguments', () => {
            it('should resolve with the value returned by the value resolver', () => {
                setImmediate(callbackFunction, null, 'a', 'b', 'c');
                return promise.then(result => {
                    expect(result).to.equal('(a, b, c)');
                });
            });
        });

        describe('when the callback is invoked with an Error', () => {
            it('should reject with the Error', () => {
                setImmediate(callbackFunction, new Error('test error'));
                return promise.catch(error => {
                    expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
                });
            });
        });

        describe('when the callback is invoked with an Error and arguments', () => {
            it('should ignore the arguments and reject with the Error', () => {
                setImmediate(callbackFunction, new Error('test error'), 'a', 'b', 'c');
                return promise.catch(error => {
                    expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
                });
            });
        });

        describe('when the value resolver throws an Error', () => {
            const {
                callbackFunction: callbackFunction2,
                promise: promise2
            } = promiseWithCallback(() => {
                throw new Error('resolver error');
            });

            it('should reject with the Error', () => {
                setImmediate(callbackFunction2, null, 'value');
                return promise2.catch(error => {
                    expect(error).to.be.an.instanceOf(Error).with.property('message', 'resolver error');
                });
            });
        });
    });
});
