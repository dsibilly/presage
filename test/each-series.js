import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import eachSeries from '../js/each-series';

describe('eachSeries', () => {
    it('should generate side-effects for each item in the collection', () => {
        const sideEffects = [];

        return eachSeries([
            10,
            20,
            30
        ], item => new Promise(resolve => {
            process.nextTick(() => {
                sideEffects.push(item * 2);
                resolve();
            });
        })).then(() => {
            expect(sideEffects).to.eql([
                20,
                40,
                60
            ]);
        });
    });

    it('should resolve each item in the collection in series', () => {
        const taskHistory = [];

        return eachSeries([
            10,
            20,
            30
        ], (item, index) => {
            const joinedArgs = [item, index].join(', ');

            taskHistory.push(`eachSeries ${joinedArgs}`);

            return new Promise(resolve => {
                process.nextTick(() => {
                    taskHistory.push(`resolve ${joinedArgs}`);
                    resolve();
                });
            });
        }).then(() => {
            expect(taskHistory).to.eql([
                'eachSeries 10, 0',
                'resolve 10, 0',
                'eachSeries 20, 1',
                'resolve 20, 1',
                'eachSeries 30, 2',
                'resolve 30, 2'
            ]);
        });
    });
});
