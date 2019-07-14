/*
Consumes an array or object containing task functions to be executed in
parallel. Each task is started in array index order, but may complete
out of order.

Each task's output will be in a result array at the same index as the
task itself.

If any task returns a rejected Promise or throws an error, the resulting
Promise will reject with that error.
*/
import _tryInvoke from './try-invoke';

export default tasks => Promise.all(tasks.map(_tryInvoke));
