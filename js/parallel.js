import parallelArray from './parallel-array';
import parallelObject from './parallel-object';

export default tasks => {
    if (typeof tasks !== 'object' && !Array.isArray(tasks)) {
        return Promise.reject(new Error('invalid argument: tasks list must be an array or object!'));
    }

    if (Array.isArray(tasks)) {
        return parallelArray(tasks);
    }

    return parallelObject(tasks);
};
