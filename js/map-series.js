import series from './series';

export default (coll, iteratee) => series(coll.map((value, index) => () => iteratee(value, index)));
