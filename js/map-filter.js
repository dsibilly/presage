export default (mapper, coll, iteratee) => mapper(coll, iteratee).then(mapped => coll.filter((value, index) => mapped[index]));
