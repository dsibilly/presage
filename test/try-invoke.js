import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import tryInvoke from '../js/try-invoke';

describe('try-invoke', () => {
    it('should invoke the function argument passed to it', () => {
        let _result = false;

        const fn = () => new Promise(resolve => {
            _result = true;
            resolve();
        });

        tryInvoke(fn).then(() => {
            expect(_result).to.equal(true);
        }).catch(error => {
            throw error;
        });
    });

    it('should reject if the function argument throws', () => {
        const fn = () => {
            throw new Error('test error');
        };

        tryInvoke(fn).then(() => {
            throw new Error('should not resolve');
        }).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'test error');
        });
    });
});
