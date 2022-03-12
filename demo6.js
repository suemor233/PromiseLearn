import fetch from "node-fetch";

function getData() {
      return   fetch('http://study.jsplusplus.com/xiaomi/getXiaomiDatas?phone=true')
            .then(res => {
                return res.json()
            }).then(res => {
                return res
            }).catch((err) => {
                return err
            })
}

// getData().then(res =>{
//     console.log(res)
// })
const logData = async () => {
  const res = await getData()
    console.log(res)
}

logData()
