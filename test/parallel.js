import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import parallel from '../js/parallel';

describe('parallel', () => {
    it('should accept an array of tasks', () => parallel([
        () => Promise.resolve('value 1'),
        () => Promise.resolve('value 2')
    ]).then(result => {
        expect(result).to.eql([
            'value 1',
            'value 2'
        ]);
    }).catch(error => {
        throw error;
    }));

    it('should accept a tasks object', () => parallel({
        task1: Promise.resolve('value 1'),
        task2: () => Promise.resolve('value 2'),
        task3: 'value 3'
    }).then(result => {
        expect(result).to.eql({
            task1: 'value 1',
            task2: 'value 2',
            task3: 'value 3'
        });
    }).catch(error => {
        throw error;
    }));
});
