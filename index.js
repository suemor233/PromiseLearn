import MyPromise from "./MyPromise.js";

let promise = new MyPromise((resolve,reject)=>{
    // reject('Error')
    // throw new Error('error')
    // setTimeout(()=>{
    //     // resolve('success')
    //
    // },2000)

    resolve('success')
})

let promise2 = promise.then((value)=>{


    // return Promise.resolve('promise resolve')
    return new MyPromise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(new MyPromise((resolve,reject)=>{
                resolve('new promise resolve')
            }))

        },2000)
    })
},(reason)=>{
    return reason
})

promise2.then(value =>{
    console.log(value)
},(reason)=>{
    console.log(reason)
})

