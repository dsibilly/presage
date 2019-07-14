import _reduce from './reduce';

export default (coll, iteratee) => _reduce(coll, (memo, item, index) => iteratee(item, index)).then(() => coll);
