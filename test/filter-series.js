import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import filterSeries from '../js/filter-series';

describe('filterSeries', () => {
    let array;

    beforeEach(() => {
        array = [
            'a',
            'b',
            'c'
        ];
    });

    it('should filter the collection based on the asynchronous response from the iteratee', () => filterSeries(array, value => Promise.resolve(value !== 'b')).then(result => {
        expect(result).to.eql([
            'a',
            'c'
        ]);
    }));

    it('should pass both value and index', () => filterSeries(array, (value, index) => Promise.resolve(index !== 1)).then(result => {
        expect(result).to.eql([
            'a',
            'c'
        ]);
    }));

    it('should work with synchronous return', () => filterSeries(array, value => value !== 'b').then(result => {
        expect(result).to.eql([
            'a',
            'c'
        ]);
    }));

    it('should reject if the iteratee rejects', () => filterSeries(array, () => Promise.reject(new Error('test error'))).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));

    it('should reject if the iteratee throws', () => filterSeries(array, () => {
        throw new Error('test error');
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));
});
