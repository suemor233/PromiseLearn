const PENDING = 'PENDING',
    FULFILLED = 'FULLFILLED',
    REJECTED = 'REJECTED';


function resolvePromise(promise2, x, resolve, reject) {

    if (promise2 === x) {
        return reject(new TypeError('Chain cycle error'))
    }

    let called = false

    if ((typeof x === 'object' && x !== null) || typeof x === "function") {
        try {
            let then = x.then

            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called)  return;
                    called = true
                    resolvePromise(promise2,y,resolve,reject)
                }, (r) => {
                    if (called)  return;
                    called = true
                    reject(r)
                })
            } else {

                resolve(x)
            }
        } catch (e) {
            if (called)  return;
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }

}

class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value

                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
            }
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value =>value;
        onFulfilled = typeof onRejected === 'function' ? onRejected : reason =>{ throw  reason}

        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }

    catch(errorCallback){
        return this.then(null,errorCallback)
    }

}


export default MyPromise
