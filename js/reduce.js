export default (coll, reducer, initialValue) => new Promise((resolve, reject) => {
    let i = 0;

    const iterator = coll[Symbol.iterator](),
        next = total => {
            const item = iterator.next();

            if (item.done) {
                resolve(total);
                return;
            }

            Promise.all([
                total,
                item.value
            ]).then(value => {
                i += 1;
                next(reducer(value[0], value[1], i));
            }).catch(reject);
        };

    next(initialValue);
});
