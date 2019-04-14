import wepy from 'wepy'
import util from './util'
import md5 from './md5'
import tip from './tip'

const API_SECRET_KEY = 'fswadfsafdsfd'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = (method, contentType, params = {}, url, isShowLoading = true) => {
  tip.loading()
  let data = params.query || {}
  data.sign = SIGN
  data.time = TIMESTAMP
  return new Promise((resolve, reject) => {
    wepy.request({
      url: url,
      method: method || 'GET',
      data: data,
      header: {
        'Content-Type': contentType,
        'Cookie': 'JSESSIONID=' + wepy.$instance.globalData.JSESSIONID
      },
      success: function (res) {
        console.info(res)
        if (res.data.code === 0) {
          tip.loaded()
          resolve(res.data)
        } else {
          tip.loaded()
          reject(res.data)
        }
      },
      fail: function () {
        // 因为hide会让showToast隐藏
        tip.error('网络请求失败', isShowLoading)
        reject(new Error('Network request failed'))
      },
      complete: function () {
      }
    })
  })
}

const uploadFile = (tempFilePaths, url, isShowLoading = true) => {
  tip.loading()
  let uploadImgCount = 0
  let imgArry = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < tempFilePaths.length; i++) {
      wepy.uploadFile({
        url: url,
        filePath: tempFilePaths[i],
        name: 'file',
        header: {
          'Cookie': 'JSESSIONID=' + wepy.$instance.globalData.JSESSIONID
        },
        formData: {
          'key': i
        },
        success: function (res) {
          let data = JSON.parse(res.data)
          uploadImgCount++
          if (data.code === 0) {
            imgArry.push(data.resPath)
            if (uploadImgCount === tempFilePaths.length) {
              tip.loaded()
              resolve(imgArry)
            }
          } else {
            tip.loaded()
            reject(res.data)
          }
        },
        fail: function () {
          // 因为hide会让showToast隐藏
          tip.error('网络请求失败', isShowLoading)
          reject(new Error('Network request failed'))
        },
        complete: function () {
        }
      })
    }
  })
}
module.exports = {
  wxRequest,
  uploadFile
}
