import requests from "../src/api"


export const userLogin = (data) => requests({ url: '/api/User/login',method: 'post', data });// 用户登入

export const getCollectInfoList = (data) => requests({ url: '/api/CollectInfo/getCollectInfoList',method: 'post', data });// 获取表单配置信息列表

export const reqSearchInfo = (data) => requests({ url: '/api/CollectInfo/saveCollectDesign',method: 'post', data });// 保存表单元素数据

export const getCollectInfo = (data) => requests({ url: '/api/CollectInfo/getCollectInfo',method: 'post', data });// 保存表单配置与元素数据

export const deleteCollectInfo = (data) => requests({ url: '/api/CollectInfo/deleteCollectInfo',method: 'post', data });// 删除表单配置与元素数据


