/*
Consumes an array of task functions to be executed in series. Each task
must complete before the next one is started.

If any task returns a rejected Promise or throws an error, the resulting
Promise will reject with that error.
*/
export default tasks => {
    const serialPromises = [];
    let promisePointer = Promise.resolve();

    tasks.forEach(task => {
        promisePointer = promisePointer.then(() => task());
        serialPromises.push(promisePointer);
    });

    return Promise.all(serialPromises);
};
