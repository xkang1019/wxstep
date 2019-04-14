import {
  wxRequest, uploadFile
} from '../utils/wxRequest'

let env = '-test' // -dev 或者 -test
// const apiMall = 'http://193.112.92.61:8002/'
const apiMall = 'http://localhost:8787/'
const contentTypeForm = 'application/x-www-form-urlencoded'
const contentTypeJson = 'application/json'
/**
 * 发布日记
 * @param params
 * @returns {*}
 */
const addRecordDiary = (params) => wxRequest('POST', contentTypeJson, params, apiMall + 'diary/web/add')
/**
 * 登入
 * @param params
 */
const login = (params) => wxRequest('POST', contentTypeForm, params, apiMall + 'weixinpay/GetOpenId')

/**
 * 上传图片
 * @param tempFilePaths
 */
const uploadFileApi = (tempFilePaths) => uploadFile(tempFilePaths, apiMall + 'api-cms/file/upload')
/**
 * 广场卡片信息显示
 * @param params
 */
const selCardsList = (params) => wxRequest('GET', contentTypeJson, params, apiMall + 'diary/web/list')
/**
 * 主页卡片展示
 */
const selSysCardsList = (params) => wxRequest('GET', contentTypeJson, params, apiMall + 'system/sysCards/web/list')

export default {
  addRecordDiary,
  login,
  uploadFileApi,
  selCardsList,
  selSysCardsList
}
