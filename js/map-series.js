import _series from './series';

export default (coll, iteratee) => _series(coll.map((value, index) => () => iteratee(value, index)));
