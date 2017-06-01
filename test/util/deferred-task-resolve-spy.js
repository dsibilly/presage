import {
    spy
} from 'sinon';

export default resolveValue => {
    let resolveFunction;

    const promise = new Promise(resolve => {
            resolveFunction = spy(resolve);
        }),
        resolveSpy = spy(value => resolveFunction(value)),
        taskSpy = spy(() => {
            setImmediate(resolveSpy, resolveValue);
            return promise;
        });

    return {
        resolveSpy,
        taskSpy
    };
};
