import parallelArray from './parallel-array';
import parallelObject from './parallel-object';

export default tasks => {
    if (Array.isArray(tasks)) {
        return parallelArray(tasks);
    }

    return parallelObject(tasks);
};
