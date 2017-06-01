/*
Zips an array of keys and an array of values together into a single
object. Matches are based on array indicies.
*/
export default (keys, values) => {
    const result = {};

    keys.forEach((key, index) => {
        result[key] = values[index];
    });
    return result;
};
