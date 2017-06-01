import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import parallelObject from '../js/parallel-object';

describe('parallelObject', () => {
    it('should resolve with the values of all resolved Promises', () => parallelObject({
        key1: Promise.resolve('value 1'),
        key2: Promise.resolve('value 2')
    }).then(result => {
        expect(result).to.eql({
            key1: 'value 1',
            key2: 'value 2'
        });
    }).catch(error => {
        throw error;
    }));

    it('should reject if one of the Promise values rejects', () => parallelObject({
        key1: Promise.resolve('value 1'),
        key2: Promise.reject(new Error('test error'))
    }).then(() => {
        throw new Error('should not resolve');
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));

    it('should try to invoke object methods', () => parallelObject({
        key1: () => Promise.resolve('value 1'),
        key2: () => Promise.resolve('value 2')
    }).then(result => {
        expect(result).to.eql({
            key1: 'value 1',
            key2: 'value 2'
        });
    }).catch(error => {
        throw error;
    }));

    it('should pass along non-Promise values to resolved value', () => parallelObject({
        key1: Promise.resolve('value 1'),
        key2: 'value 2'
    }).then(result => {
        expect(result).to.eql({
            key1: 'value 1',
            key2: 'value 2'
        });
    }).catch(error => {
        throw error;
    }));
});
