import requests from "../src/api"


export const userLogin = (data) => requests({ url: '/api/User/login',method: 'post', data });// 用户登入

export const getCollectInfoList = (data) => requests({ url: '/api/CollectInfo/getCollectInfoList',method: 'post', data });// 获取表单配置信息列表
export const saveCollect = (data) => requests({ url: '/api/CollectInfo/saveCollectDesign',method: 'post', data });// 保存表单元素数据
export const getCollectInfo = (data) => requests({ url: '/api/CollectInfo/getCollectInfo',method: 'post', data });// 获取表单配置与元素数据
export const getCollectInfoAndPersonData = (data) => requests({ url: '/api/CollectInfo/getCollectInfoAndPersonData',method: 'post', data });// 获取表单配置与元素数据和用户数据
export const deleteCollectInfo = (data) => requests({ url: '/api/CollectInfo/deleteCollectInfo',method: 'post', data });// 删除表单配置与元素数据
export const pubCollectInfo = (data) => requests({ url: '/api/CollectInfo/pubCollectInfo',method: 'post', data });// 发布表单
export const getFromData = (data) => requests({ url: '/api/CollectInfo/getFromData',method: 'post', data });// 获取表单收集用户的数据
export const clickNotify = (data) => requests({ url: '/api/CollectInfo/clickNotify',method: 'post', data });// 通知表单收集用户的完成收集
export const reverseState = (data) => requests({ url: '/api/CollectInfo/reverseState',method: 'post', data });// 反转发布状态
export const deleteCollectDataById = (data) => requests({ url: '/api/CollectInfo/deleteCollectDataById',method: 'post', data });// 删除表单收集个人数据
export const addFromDataPerson = (data) => requests({ url: '/api/CollectInfo/addFromDataPerson',method: 'post', data });// 添加表单收集个人数据
export const getPubState = (data) => requests({ url: '/api/CollectInfo/getPubState',method: 'post', data });// 获取表单发布状态


export const getPubObject = (data) => requests({ url: '/api/PubConfig/getPubObjectInfo',method: 'post', data });// 获取发布配置对象数据
export const getPubConfigInfo = (data) => requests({ url: '/api/PubConfig/getPubConfigInfo',method: 'post', data });// 获取发布配置数据
export const savePubConfig = (data) => requests({ url: '/api/PubConfig/savePubConfig',method: 'post', data });// 保存或更新发布配置数据


export const handleWorkTask = (data) => requests({ url: '/api/WorkTask/handleWorkTask',method: 'post', data });// 审批数据
export const getWorkInfoList = (data) => requests({ url: '/api/WorkTask/getWorkInfoList',method: 'post', data });// 获取个人工作信息





