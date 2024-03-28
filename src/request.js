import requests from "../src/api"

// 用户处理
export const userLogin = (data) => requests({ url: '/api/User/login',method: 'post', data });// 用户登入

// 信息收集处理
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
export const saveFromPersonData = (data) => requests({ url: '/api/CollectInfo/saveFromPersonData',method: 'post', data });// 保存表单个人数据
export const getFromDataId = (data) => requests({ url: '/api/CollectInfo/getFromDataId',method: 'post', data });// 获取当前处理人对应收集表单的记录ID

// 通知管理处理
export const saveNoticeManager = (data) => requests({ url: '/api/NoticeManager/saveNoticeManager',method: 'post', data });// 保存/修改通知管理内容
export const deleteNotifyInfo = (data) => requests({ url: '/api/NoticeManager/deleteNotifyInfo',method: 'post', data });// 作废通知管理内容
export const getNotifyInfoList = (data) => requests({ url: '/api/NoticeManager/getNotifyInfoList',method: 'post', data });// 获取信息展示列表
export const getNotifyInfo = (data) => requests({ url: '/api/NoticeManager/getNotifyInfo',method: 'post', data });// 获取信息
export const pubNotify = (data) => requests({ url: '/api/NoticeManager/pubNotify',method: 'post', data });// 发布通知
export const getNotifyPersonDataList = (data) => requests({ url: '/api/NoticeManager/getNotifyPersonDataList',method: 'post', data });// 获取用户详情信息

// 任务管理处理
export const saveTask = (data) => requests({ url: '/api/TaskManager/saveTask',method: 'post', data });// 保存任务管理信息
export const getTaskInfoList = (data) => requests({ url: '/api/TaskManager/getTaskInfoList',method: 'post', data });// 保存任务管理信息
export const getTaskInfo = (data) => requests({ url: '/api/TaskManager/getTaskInfo',method: 'post', data });// 保存任务管理信息
export const deleteTask = (data) => requests({ url: '/api/TaskManager/deleteTask',method: 'post', data });// 删除任务管理信息
export const pubTask = (data) => requests({ url: '/api/TaskManager/pubTask',method: 'post', data });// 发布任务管理信息



// 发布配置处理
export const getPubObject = (data) => requests({ url: '/api/PubConfig/getPubObjectInfo',method: 'post', data });// 获取发布配置对象数据
export const getPubConfigInfo = (data) => requests({ url: '/api/PubConfig/getPubConfigInfo',method: 'post', data });// 获取发布配置数据
export const savePubConfig = (data) => requests({ url: '/api/PubConfig/savePubConfig',method: 'post', data });// 保存或更新发布配置数据


// 工作待办处理
export const handleWorkTask = (data) => requests({ url: '/api/WorkTask/handleWorkTask',method: 'post', data });// 处理工作待办
export const getWorkInfoList = (data) => requests({ url: '/api/WorkTask/getWorkInfoList',method: 'post', data });// 获取个人工作信息
export const deleteWorkTask = (data) => requests({ url: '/api/WorkTask/deleteWorkTask',method: 'post', data });// 删除已完成的工作记录



// 文件处理
export const uploadFile = (data) => requests({ url: '/api/File/uploadFile',method: 'post', data });// 上传文件

//场地管理
export const addArea = (data) => requests({ url: '/api/Area/addAreaInfo',method: 'post', data });//新增场地
export const deleteArea = (data) => requests({ url: '/api/Area/deleteAreaInfo',method: 'post', data });//删除场地
export const getAreaList = (data) => requests({ url: '/api/Area/getAreaInfoList',method: 'post', data });//列表
export const editArea = (data) => requests({ url: '/api/Area/getAreaInfo',method: 'post', data });//编辑
export const addAreaBook = (data) => requests({ url: '/api/Area/addAreaBook',method: 'post', data });//新增预约
export const deleteAreaBook = (data) => requests({ url: '/api/Area/deleteAreaBook',method: 'post', data });//删除预约
export const getAreaBookList = (data) => requests({ url: '/api/Area/getAreaBookList',method: 'post', data });//预约列表