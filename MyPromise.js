const PENDING = 'PENDING',
      FULFILLED = 'FULLFILLED',
      REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value =>{
            if (this.status === PENDING){
                this.status = FULFILLED
                this.value = value

                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason =>{
            if (this.status === PENDING){
                this.status = REJECTED
                this.reason = reason
            }
        }

        try {
            executor(resolve,reject)
        }catch (err){
            reject(err)
        }
    }

    then(onFulfilled,onRejected){
        if (this.status === FULFILLED){
            onFulfilled(this.value)
        }

        if (this.status === REJECTED){
            onRejected(this.reason)
        }

        if (this.status === PENDING){
            this.onFulfilledCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }

}

export default MyPromise
