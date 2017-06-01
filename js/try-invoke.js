/*
Attempts to invoke `sketchyFunction`. If it throws an Error, returns a
rejected Promise.
*/
export default sketchyFunction => {
    try {
        return sketchyFunction();
    } catch (error) {
        return Promise.reject(error);
    }
};
