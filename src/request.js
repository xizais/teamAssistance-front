import requests from "../src/api"

export const reqCategoryList = () => {
    return requests({ method: 'post', url: '/CollectInfo/saveCollectDesign' });
}

export const reqSearchInfo = (data) => requests({ url: '/CollectInfo/saveCollectDesign',method: 'post', data });// 保存表单元素数据

export const getCollectInfo = (data) => requests({ url: '/CollectInfo/getCollectInfo',method: 'post', data });// 保存表单配置与元素数据


