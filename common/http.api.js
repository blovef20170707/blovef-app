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
let getMessageUrl = '/sys/getMessage';

let evaluationUrl = '/carSuit/evaluation';
let evaluationReportUrl = '/carSuit/evaluationReport';
let queryLoanArrayUrl = '/carSuit/queryLoan';

let crrtTrainLoginAuthUrl = '/crrt/train/login/auth';
let crrtTrainLoginIndexUrl = '/crrt/train/login/index';
let crrtTrainIndexUrl = '/crrt/train/index';
let crrtTrainCircleUrl = '/crrt/train/circle/index';
let crrtTrainStudyIndexUrl = '/crrt/train/study/index';
let crrtTrainTeamIndexUrl = '/crrt/train/team/index';
let crrtTrainShareIndexUrl = '/crrt/train/share/index';
let crrtTrainScientificIndexUrl = '/crrt/train/scientific/index';
let crrtTrainCourseIndexUrl = '/crrt/train/course/index';
let crrtTrainCourseWareUrl = '/crrt/train/course/ware';

let crrtTrainDocUrl = '/crrt/train/doc/index';
let crrtTrainApplicationUrl = '/crrt/train/application';
let crrtTrainTraineeUrl = '/crrt/train/trainee';
let crrtTrainTraineesUrl = '/crrt/train/trainees';
let crrtTrainPerfectUrl = '/crrt/train/perfect';
let crrtTrainCourseUrl = '/crrt/train/course';
let crrtTrainCourseSearchUrl = '/crrt/train/course/search';
let crrtTrainFeedBackCourseUrl = '/crrt/train/feedback/course';

let crrtTrainFeedBackUrl = '/crrt/train/feedback';
let crrtTrainSatisfactionUrl = '/crrt/train/satisfaction';

let crrtTrainFeedBackPracticeUrl = '/crrt/train/feedback/practice';
let crrtTrainSatisfactionPracticeUrl = '/crrt/train/satisfaction/practice';

let crrtTrainExaminationUrl = '/crrt/train/examination';
let crrtTrainTraineeExaminationUrl = '/crrt/train/trainee/examination';
let crrtTrainExaminationCreateUrl = '/crrt/train/trainee/examination/create';
let crrtTrainExaminationTopicUrl = '/crrt/train/trainee/examination/topic';
let crrtTrainExaminationEndUrl = '/crrt/train/trainee/examination/end';
let crrtTrainExamineUrl = '/crrt/train/examine';
let crrtFeedBackOpenUrl = '/crrt/train/feedback/open';

let carTaxiComplainUrl = '/car/taxi/complain';
let carTaxiComplainListUrl = '/car/taxi/complain/list';
let carTaxiComplainInfoUrl = '/car/taxi/complain/info';
let carTaxiInformationInfoUrl = '/car/taxi/information/info';
let carTaxiMeUrl = '/car/taxi/me';
let carTaxiAuthUrl = '/car/taxi/auth';
let carTaxiEmployeeAuthUrl = '/car/taxi/employee/auth';
let carTaxiIndexUrl = '/car/taxi/index';

// post请求
//base
export const apiWxLogin = (params, config = {}) => http.post(wxLoginUrl, params, config)
export const apiCreateInstance = (params, config = {}) => http.post(createInstanceUrl, params, config)
export const apiGetControlContext = (params, config = {}) => http.post(getControlContextUrl, params, config)
export const apiGetPageContext = (params, config = {}) => http.post(getPageContextUrl, params, config)
export const apiSetControlContext = (params, config = {custom: {toast: true}}) => http.post(setControlContextUrl, params, config)
export const apiInitPageContext = (params, config = {}) => http.post(initPageContextUrl, params, config)
export const apiSetBatchControlContext = (params, config = {}) => http.post(setBatchControlContextUrl, params, config)
export const apiNodeAction = (params, config = {custom: {toast: true}}) => http.post(nodeActionUrl, params, config)
//loan
export const apiEvaluation = (params, config = {custom: {toast: false}}) => http.post(evaluationUrl, params, config)
export const apiEvaluationReport = (params, config = {custom: {toast: false}}) => http.post(evaluationReportUrl, params, config)
export const apiQueryLoanArray = (params, config = {custom: {toast: false}}) => http.post(queryLoanArrayUrl, params, config)
//crrt
export const apiCrrtTrainApplication = (params, config = {}) => http.post(crrtTrainApplicationUrl, params, config)
export const apiCrrtTrainPerfect = (params, config = {}) => http.post(crrtTrainPerfectUrl, params, config)
export const apiCrrtTrainFeedBack = (params, config = {}) => http.post(crrtTrainFeedBackUrl, params, config)

export const apiCrrtTrainFeedBackPractice = (params, config = {}) => http.post(crrtTrainFeedBackPracticeUrl, params, config)

export const apiCrrtTrainExaminationCreate = (params, config = {}) => http.post(crrtTrainExaminationCreateUrl, params, config)
export const apiCrrtTrainExaminationTopic = (params, config = {}) => http.post(crrtTrainExaminationTopicUrl, params, config)
export const apiCrrtTrainExaminationEnd = (params, config = {}) => http.post(crrtTrainExaminationEndUrl, params, config)
export const apiCrrtTrainExamine = (params, config = {}) => http.post(crrtTrainExamineUrl, params, config)
export const apiCrrtFeedBackOpen = (params, config = {}) => http.post(crrtFeedBackOpenUrl, params, config)
//taxi
export const apiTaxiComplain= (params, config = {}) => http.post(carTaxiComplainUrl, params, config)
export const apiCarTaxiEmployeeAuth= (params, config = {}) => http.post(carTaxiEmployeeAuthUrl, params, config)






// get请求 注意：get请求的配置等，都在第二个参数中，详见前面解释
//base
export const apiGetMenu = (data) => http.get(getMenuUrl, data)
//crrt
export const apiCrrtTrainLoginIndex = (data) => http.get(crrtTrainLoginIndexUrl, data)
export const apiCrrtTrainIndex = (data) => http.get(crrtTrainIndexUrl, data)
export const apiCrrtTrainCircleIndex = (data) => http.get(crrtTrainCircleUrl, data)
export const apiCrrtTrainStudyIndex = (data) => http.get(crrtTrainStudyIndexUrl, data)
export const apiCrrtTrainDocIndex = (data) => http.get(crrtTrainDocUrl, data)
export const apiCrrtTrainTeamIndex = (data) => http.get(crrtTrainTeamIndexUrl, data)
export const apiCrrtTrainShareIndex = (data) => http.get(crrtTrainShareIndexUrl, data)
export const apiCrrtTrainScientificIndex = (data) => http.get(crrtTrainScientificIndexUrl, data)
export const apiCrrtTrainCourseSearch = (data) => http.get(crrtTrainCourseSearchUrl, data)
export const apiCrrtTrainCourseIndex = (data) => http.get(crrtTrainCourseIndexUrl, data)
export const apiCrrtTrainCourseWare = (data) => http.get(crrtTrainCourseWareUrl, data)
export const apiCrrtTrainTrainee = (data) => http.get(crrtTrainTraineeUrl, data)
export const apiCrrtTrainTrainees = (data) => http.get(crrtTrainTraineesUrl, data)
export const apiCrrtTrainCourse = (data) => http.get(crrtTrainCourseUrl, data)
export const apiCrrtTrainFeedBackCourse = (data) => http.get(crrtTrainFeedBackCourseUrl, data)
export const apiCrrtTrainSatisfaction = (data) => http.get(crrtTrainSatisfactionUrl, data)
export const apiCrrtTrainSatisfactionPractice = (data) => http.get(crrtTrainSatisfactionPracticeUrl, data)
export const apiCrrtTrainExamination = (data) => http.get(crrtTrainExaminationUrl, data)
export const apiCrrtTrainTraineeExamination = (data) => http.get(crrtTrainTraineeExaminationUrl, data)
export const apiCrrtTrainLoginAuth = (data) => http.get(crrtTrainLoginAuthUrl, data)
export const apiGetMessage = (data) => http.get(getMessageUrl, data)
//taxi
export const apiCarTaxiComplainList = (data) => http.get(carTaxiComplainListUrl, data)
export const apiCarTaxiComplainInfo = (data) => http.get(carTaxiComplainInfoUrl, data)
export const apiCarTaxiInformationInfo = (data) => http.get(carTaxiInformationInfoUrl, data)
export const apiCarTaxiMe = (data) => http.get(carTaxiMeUrl, data)
export const apiCarTaxiIndex = (data) => http.get(carTaxiIndexUrl, data)
export const apiCarTaxiAuth = (data) => http.get(carTaxiAuthUrl, data)

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
