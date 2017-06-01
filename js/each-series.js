import reduce from './reduce';

export default (coll, iteratee) => reduce(coll, (memo, item, index) => iteratee(item, index)).then(() => coll);
