import axios from 'axios';
import { JSONObject } from 'fast-json-parse';

const api = axios.create({
    baseURL: 'http://localhost:8099/api',
    // 可根据需要设置其他默认配置，如请求头等
});

export const sendRequest = async (url, method, data) => {
    try {
        const response = await api.request({
            url,
            method,
            data,
        });

        // 手动转换为 com.alibaba.fastjson.JSONObject 类型
        const jsonObject = new JSONObject(response.data);

        return jsonObject;
    } catch (error) {
        throw new Error(error.message);
    }
};