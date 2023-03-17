const http = uni.$u.http;
let wxLoginUrl = '/wechat/login';
let createInstanceUrl = '/api/v1/createInstance';
let getControlContextUrl = '/page/getControlContext';
let getPageContextUrl = '/page/getPageContext';
let setControlContextUrl = '/page/setControlContext';
let initPageContextUrl = '/page/initPageContext';
let setBatchControlContextUrl = '/page/setBatchControlContext';
let nodeActionUrl = '/api/v1/nodeAction';
let getMenuUrl = '/sys/getMenu';
let evaluationUrl = '/carSuit/evaluation';
let evaluationReportUrl = '/carSuit/evaluationReport';
let queryLoanArrayUrl = '/carSuit/queryLoan';


// post请求
export const apiWxLogin = (params, config = {}) => http.post(wxLoginUrl, params, config)
export const apiCreateInstance = (params, config = {}) => http.post(createInstanceUrl, params, config)
export const apiGetControlContext = (params, config = {}) => http.post(getControlContextUrl, params, config)
export const apiGetPageContext = (params, config = {}) => http.post(getPageContextUrl, params, config)
export const apiSetControlContext = (params, config = {custom: {toast: true}}) => http.post(setControlContextUrl, params, config)
export const apiInitPageContext = (params, config = {}) => http.post(initPageContextUrl, params, config)
export const apiSetBatchControlContext = (params, config = {}) => http.post(setBatchControlContextUrl, params, config)
export const apiNodeAction = (params, config = {custom: {toast: true}}) => http.post(nodeActionUrl, params, config)
export const apiEvaluation = (params, config = {custom: {toast: false}}) => http.post(evaluationUrl, params, config)
export const apiEvaluationReport = (params, config = {custom: {toast: false}}) => http.post(evaluationReportUrl, params, config)
export const apiQueryLoanArray = (params, config = {custom: {toast: false}}) => http.post(queryLoanArrayUrl, params, config)
// get请求 注意：get请求的配置等，都在第二个参数中，详见前面解释
export const apiGetMenu = (data) => http.get(getMenuUrl, data)





/**
 * 使用custom写法
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

// post请求
export const apiWxLogin = (params, config = {custom: {auth: true, toast: true, catch: true}}) => http.post(wxLoginUrl, params, config)
export const apiCreateInstance = (params, config = {custom: {auth: true, toast: true, catch: true}}) => http.post(createInstanceUrl, params, config)
// get请求 注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
export const apiGetMenu = (data) => http.get(getMenuUrl, data)
 */
