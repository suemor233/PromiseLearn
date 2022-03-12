function doSth() {
    return function () {
        return function () {
            console.log('start')
        }
    }
}

const promise = new Promise((resolve,reject)=>{
    // resolve('start')
    // reject('错误')
    throw new Error('15 gg')
})

promise.then((res)=>{
    console.log(res)
    // return new Promise((resolve, reject) => resolve('成功'))
}).catch(err=>{
    console.log(err)
})


Promise.all([0,'123',false]).then((res)=>{
    console.log(res)
    return Promise.resolve('成功了')
}).then((res)=>{
    console.log(res)
})
