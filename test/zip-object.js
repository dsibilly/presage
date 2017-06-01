import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import zipObject from '../js/zip-object';

describe('zipObject', () => {
    it('should create an object', () => {
        expect(zipObject([], [])).to.eql({});
    });

    it('should zip keys and values into an object by index', () => {
        expect(zipObject([
            'key1',
            'key2',
            'key3'
        ], [
            10,
            20,
            30
        ])).to.eql({
            key1: 10,
            key2: 20,
            key3: 30
        });
    });
});
