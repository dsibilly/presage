import _parallelArray from './parallel-array';
import _parallelObject from './parallel-object';

export default tasks => {
    if (Array.isArray(tasks)) {
        return _parallelArray(tasks);
    }

    return _parallelObject(tasks);
};
