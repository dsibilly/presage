import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import map from '../js/map';

describe('map', () => {
    it('should map the array to the resolved value of calling the function on each element', () => map([
        1,
        2,
        3
    ], num => Promise.resolve(num * 2)).then(result => {
        expect(result).to.eql([
            2,
            4,
            6
        ]);
    }).catch(error => {
        throw error;
    }));

    it('should map the array in parallel', () => {
        const taskHistory = [];

        map([
            10,
            20,
            30
        ], (...args) => {
            const joinedArgs = args.join(', ');

            taskHistory.push(`map ${joinedArgs}`);

            return new Promise(resolve => {
                setImmediate(() => {
                    taskHistory.push(`resolve ${joinedArgs}`);
                    resolve();
                });
            });
        }).then(() => {
            expect(taskHistory).to.eql([
                'map 10, 0',
                'map 20, 1',
                'map 30, 2',
                'resolve 10, 0',
                'resolve 20, 1',
                'resolve 30, 2'
            ]);
        });
    });

    it('should not require the mapping function to return a Promise', () => map([
        10,
        20,
        30
    ], num => num * 2).then(result => {
        expect(result).to.eql([
            20,
            40,
            60
        ]);
    }).catch(error => {
        throw error;
    }));

    it('should reject if the mapping function throws', () => map([
        10,
        20,
        30
    ], (num, index) => {
        throw new Error(`test error: ${num}, ${index}`);
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message').and.match(/test error/);
    }));

    it('should reject if the mapping function rejects', () => map([
        10,
        20,
        30
    ], (num, index) => Promise.reject(new Error(`test error: ${num}, ${index}`)).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message').and.match(/test error/);
    })));
});
