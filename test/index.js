import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import presage, {
    eachSeries,
    filter,
    filterSeries,
    map,
    mapSeries,
    parallel,
    promiseWithCallback,
    reduce,
    series
} from '../js/index';

describe('presage', () => {
    describe('collections', () => {
        it('should export all collection API functions', () => {
            expect(presage.eachSeries).to.be.a('function');
            expect(presage.filter).to.be.a('function');
            expect(presage.filterSeries).to.be.a('function');
            expect(presage.map).to.be.a('function');
            expect(presage.mapSeries).to.be.a('function');
            expect(presage.reduce).to.be.a('function');

            expect(eachSeries).to.be.a('function');
            expect(filter).to.be.a('function');
            expect(filterSeries).to.be.a('function');
            expect(map).to.be.a('function');
            expect(mapSeries).to.be.a('function');
            expect(reduce).to.be.a('function');
        });
    });

    describe('control flow', () => {
        it('should export all control flow API functions', () => {
            expect(presage.parallel).to.be.a('function');
            expect(presage.series).to.be.a('function');

            expect(parallel).to.be.a('function');
            expect(series).to.be.a('function');
        });
    });

    describe('utilities', () => {
        it('should export all utility API functions', () => {
            expect(presage.promiseWithCallback).to.be.a('function');
            expect(promiseWithCallback).to.be.a('function');
        });
    });
});
