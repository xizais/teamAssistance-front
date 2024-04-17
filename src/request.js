import requests from "../src/api"
import fileRequests from "@/fileApi";

// 用户处理
export const userLogin = (data) => requests({ url: '/api/User/login',method: 'post', data });// 用户登入
export const logout = (data) => requests({ url: '/api/User/logout',method: 'post', data });// 用户登出
export const getCurPerInfo = (data) => requests({ url: '/api/User/getCurPerInfo',method: 'post', data });// 用户信息
export const getAllPerInfo = (data) => requests({ url: '/api/User/getAllPerInfo',method: 'post', data });// 获取系统所有用户信息
export const deletePerInfo = (data) => requests({ url: '/api/User/deletePerInfo',method: 'post', data });// 删除用户信息

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
export const doneTask = (data) => requests({ url: '/api/TaskManager/doneTask',method: 'post', data });// 个人任务处理
export const approvalTask = (data) => requests({ url: '/api/TaskManager/approvalTask',method: 'post', data });// 个人任务审批



// 发布配置处理
export const getPubObject = (data) => requests({ url: '/api/PubConfig/getPubObjectInfo',method: 'post', data });// 获取发布配置对象数据
export const getPubConfigInfo = (data) => requests({ url: '/api/PubConfig/getPubConfigInfo',method: 'post', data });// 获取发布配置数据
export const savePubConfig = (data) => requests({ url: '/api/PubConfig/savePubConfig',method: 'post', data });// 保存或更新发布配置数据


// 工作待办处理
export const handleWorkTask = (data) => requests({ url: '/api/WorkTask/handleWorkTask',method: 'post', data });// 处理工作待办
export const getWorkInfoList = (data) => requests({ url: '/api/WorkTask/getWorkInfoList',method: 'post', data });// 获取个人工作信息
export const deleteWorkTask = (data) => requests({ url: '/api/WorkTask/deleteWorkTask',method: 'post', data });// 删除已完成的工作记录



// 文件处理
export const uploadFile = (data) => fileRequests({ url: '/api/File/uploadFile',method: 'post', data });// 上传文件
export const deleteFile = (data) => fileRequests({ url: '/api/File/deleteFile',method: 'post', data });// 下载文件
export const exportFile = (data) => fileRequests({ url: '/api/File/exportFile',method: 'post', data });// 文件导入


//场地管理
export const addArea = (data) => requests({ url: '/api/Area/addAreaInfo',method: 'post', data });//新增场地
export const deleteArea = (data) => requests({ url: '/api/Area/deleteAreaInfo',method: 'post', data });//删除场地
export const getAreaList = (data) => requests({ url: '/api/Area/getAreaInfoList',method: 'post', data });//列表
export const editArea = (data) => requests({ url: '/api/Area/getAreaInfo',method: 'post', data });//编辑
export const addAreaBook = (data) => requests({ url: '/api/Area/addAreaBook',method: 'post', data });//新增预约
export const deleteAreaBook = (data) => requests({ url: '/api/Area/deleteAreaBook',method: 'post', data });//删除预约
export const getAreaBookList = (data) => requests({ url: '/api/Area/getAreaBookList',method: 'post', data });//预约列表

// 部门管理数据
export const getOrgList = (data) => requests({ url: '/api/Organize/getOrgList',method: 'post', data });// 部门列表数据
export const getOrgPers = (data) => requests({ url: '/api/Organize/getOrgPers',method: 'post', data });// 部门人员数据
export const getChildOrg = (data) => requests({ url: '/api/Organize/getChildOrg',method: 'post', data });// 部门子级数据
export const saveOrgInfo = (data) => requests({ url: '/api/Organize/saveOrgInfo',method: 'post', data });// 保存部门信息数据
export const getMyPer = (data) => requests({ url: '/api/Organize/getMyPer',method: 'post', data });// 获取我的用户信息
export const outOrgPer = (data) => requests({ url: '/api/Organize/outOrgPer',method: 'post', data });// 剔除组织用户
export const addNewOrgPer = (data) => requests({ url: '/api/Organize/addNewOrgPer',method: 'post', data });// 新增组织用户