import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import filter from '../js/filter';

describe('filter', () => {
    it('should filter the collection based on the asynchronous response from the iteratee', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, value => Promise.resolve(value !== 'b')).then(result => {
            expect(result).to.eql([
                'a',
                'c'
            ]);
        });
    });

    it('should pass both value and index', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, (value, index) => Promise.resolve(index !== 1)).then(result => {
            expect(result).to.eql([
                'a',
                'c'
            ]);
        });
    });

    it('should reject if the iteratee rejects', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, () => Promise.reject(new Error('test error'))).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
        });
    });

    it('should reject if the iteratee throws', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, () => {
            throw new Error('test error');
        }).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
        });
    });
});
