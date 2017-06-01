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
    reduce,
    series
} from '../js/index';

describe('presage', () => {
    it('should export all presage APIs', () => {
        expect(presage.eachSeries).to.be.a('function');
        expect(presage.filter).to.be.a('function');
        expect(presage.filterSeries).to.be.a('function');
        expect(presage.map).to.be.a('function');
        expect(presage.mapSeries).to.be.a('function');
        expect(presage.reduce).to.be.a('function');
        expect(presage.series).to.be.a('function');

        expect(eachSeries).to.be.a('function');
        expect(filter).to.be.a('function');
        expect(filterSeries).to.be.a('function');
        expect(map).to.be.a('function');
        expect(mapSeries).to.be.a('function');
        expect(reduce).to.be.a('function');
        expect(series).to.be.a('function');
    });
});
