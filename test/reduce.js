import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import reduce from '../js/reduce';

describe('reduce', () => {
    it('should reduce the contents of the array to a single value', () => {
        const _array = [
            Promise.resolve(3),
            Promise.resolve(2),
            Promise.resolve(5)
        ];

        return reduce(_array, (memo, item) => memo + item, 0).then(result => {
            expect(result).to.equal(10);
        });
    });

    it('should reject if the reducer rejects', () => {
        const _array = [
            Promise.resolve(3),
            Promise.reject(new Error('test error'))
        ];

        return reduce(_array, (memo, item) => memo + item, 0).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
        });
    });

    it('should reject if the reducer throws', () => {
        const _array = [
            Promise.resolve(3),
            Promise.resolve(3)
        ];

        return reduce(_array, () => {
            throw new Error('test error');
        }).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
        });
    });

    it('should handle an empty collection', () => reduce([], () => {
        // do nothing
    }, 0).then(result => {
        expect(result).to.equal(0);
    }));
});
