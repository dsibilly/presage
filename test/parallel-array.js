import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import deferredTaskResolveSpy from './util/deferred-task-resolve-spy';
import parallelArray from '../js/parallel-array';

describe('parallelArray', () => {
    it('should run each task in parallel', () => {
        const {
                resolveSpy: resolve1,
                taskSpy: task1
            } = deferredTaskResolveSpy('value 1'),
            {
                resolveSpy: resolve2,
                taskSpy: task2
            } = deferredTaskResolveSpy('value 2');

        return parallelArray([
            task1,
            task2
        ]).then(() => {
            expect(task1.calledBefore(task2)).to.equal(true, 'task1 should be called before task2');
            expect(task2.calledBefore(resolve1)).to.equal(true, 'task2 should be called before resolve1');
            expect(resolve1.calledBefore(resolve2)).to.equal(true, 'resolve1 should be called before resolve2');
        });
    });

    it('should resolve with an array of the resolved return values from each task', () => parallelArray([
        () => Promise.resolve('value 1'),
        () => Promise.resolve('value 2')
    ]).then(result => {
        expect(result).to.eql([
            'value 1',
            'value 2'
        ]);
    }));

    it('should pass along non-Promise values to resolve value', () => parallelArray([
        () => Promise.resolve('value 1'),
        () => 'value 2'
    ]).then(result => {
        expect(result).to.eql([
            'value 1',
            'value 2'
        ]);
    }));

    it('should reject if any task rejects', () => parallelArray([
        () => Promise.resolve('value 1'),
        () => Promise.reject(new Error('test error'))
    ]).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
    }));

    it('should reject if the tasks argument is not an array', () => {
        expect(parallelArray.bind(null, {})).to.throw();
    });
});
