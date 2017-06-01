import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import mapSeries from '../js/map-series';

describe('mapSeries', () => {
    it('should map the resolved values of the mapping function to the input array', () => mapSeries([
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

    it('should map the array in series', () => {
        const taskHistory = [];

        return mapSeries([
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
                'resolve 10, 0',
                'map 20, 1',
                'resolve 20, 1',
                'map 30, 2',
                'resolve 30, 2'
            ]);
        }).catch(error => {
            throw error;
        });
    });

    it('should not require the maping function to return a Promise', () => mapSeries([
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

    it('should reject if the iteratee rejects', () => mapSeries([
        10,
        20,
        30
    ], num => new Promise((resolve, reject) => {
        if (num === 20) {
            reject(new Error('test error'));
            return;
        }

        resolve(num * 2);
    })).then(() => {
        throw new Error('should not resolve');
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));

    it('should reject if the iteratee throws', () => mapSeries([
        10,
        20,
        30
    ], num => {
        if (num === 20) {
            throw new Error('test error');
        }

        return Promise.resolve(num * 2);
    }).then(() => {
        throw new Error('should not resolve');
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));
});
