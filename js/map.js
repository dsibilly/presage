export default (coll, iteratee) => {
    try {
        return Promise.all(coll.map((value, index) => iteratee(value, index)));
    } catch (error) {
        return Promise.reject(error);
    }
};
