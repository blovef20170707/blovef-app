const http = uni.$u.http;
let getPageContextUrl = '/page/getPageContext';
let getControlContextUrl = '/page/getControlContext';
let initPageContextUrl = '/page/initPageContext';
let setControlContextUrl = '/page/setControlContext';
let setBatchControlContextUrl = '/page/setBatchControlContext';
let getMenuUrl = '/sys/getMenu';
let wxLoginUrl = '/wechat/login';
let nodeActionUrl = '/api/v1/nodeAction';
let createInstanceUrl = '/api/v1/createInstance';

// post请求，获取菜单
export const apiWxLogin = (params, config = {custom: {auth: true, toast: true, catch: true}}) => http.post(wxLoginUrl, params, config)
export const apiCreateInstance = (params, config = {custom: {auth: true, toast: true, catch: true}}) => http.post(createInstanceUrl, params, config)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
export const apiGetMenu = (data) => http.get(getMenuUrl, data)
