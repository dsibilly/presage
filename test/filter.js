import {
    describe,
    it
} from 'mocha';

import chai, {
    should as _should
} from 'chai';

import chaiAsPromised from 'chai-as-promised';
import filter from '../js/filter';

const should = _should();

chai.use(chaiAsPromised);

describe('filter', () => {
    it('should filter the collection based on the asynchronous response from the iteratee', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, value => Promise.resolve(value !== 'b')).should.eventually.eql([
            'a',
            'c'
        ]);
    });

    it('should pass both value and index', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, (value, index) => Promise.resolve(index !== 1)).should.eventually.eql([
            'a',
            'c'
        ]);
    });

    it('should reject if the iteratee rejects', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, () => Promise.reject(new Error('test error'))).should.be.rejectedWith('test error');
    });

    it('should reject if the iteratee throws', () => {
        const array = [
            'a',
            'b',
            'c'
        ];

        return filter(array, () => {
            throw new Error('test error');
        }).should.be.rejectedWith('test error');
    });
});
