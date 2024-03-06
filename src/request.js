import requests from "../src/api"

export const reqCategoryList = () => {
    return requests({ method: 'post', url: '/CollectInfo/saveCollectDesign' });
}

export const reqSearchInfo = (data) => requests({ url: '/CollectInfo/saveCollectDesign',
    method: 'post', data })
