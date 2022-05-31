import {
	apiCreateInstance,
	apiGetControlContext,
	apiGetPageContext,
	apiSetControlContext,
	apiInitPageContext,
	apiSetBatchControlContext,
	apiNodeAction
} from '@/common/http.api.js';
const baseUrl = 'http://uniapp.dcloud.io';

/**
 * 得到当期时间
 */
const now = Date.now || function() {
	return new Date().getTime();
};

/**
 * @param {Object} obj
 * 判断数组
 */
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};

/**
 * @param {Object} obj
 * 判断空字符串
 */
const isNull = function(obj) {
	if (obj == null || obj == undefined || obj == '') {
		return true;
	} else if (obj.replace(/(^s*)|(s*$)/g, "").length == 0) {
		return true;
	} else if (!obj) {
		return true;
	} else {
		return false;
	}
}

const getHeader = function(header) {
	const token = uni.getStorageSync('token');
	const res = uni.getSystemInfoSync();
	const accountInfo = uni.getAccountInfoSync();
	header.token = token;
	let information = {
		"client_id": res.deviceId,
		"device_type": "WECHAT",
		"device_os": res.system,
		"device_version": res.model,
		"device_app": accountInfo.miniProgram.appId,
		"coordinate_type": "0",
		"longitude": "0.0",
		"latitude": "0.0"
	};
	header.information = JSON.stringify(information);
	return header;
}


const getTimeValue = function(mode,time) {
	const timeFormat = uni.$u.timeFormat;
	switch (mode) {
		case 'datetime':
			return timeFormat(time, 'yyyy-mm-dd hh:MM')
		case 'date':
			return timeFormat(time, 'yyyy-mm-dd')
		case 'year-month':
			return timeFormat(time, 'yyyy-mm')
		case 'time':
			return e.value
		default:
			return ''
	}
}

/**
 * 设置控件值
 * @param {Object} params 
 */
const setControlValue = function(params) {
	console.log("params:", params);
	apiSetControlContext(params).then(data => {
		console.log("setControlContext Success:", data);
	}).catch(exception => {
		console.log("setControlContext exception:", exception);
	}).finally(res => {

	})
}



/**
 * @param {Object} c_this
 * @param {Object} list
 * 初始化悬浮按钮数组
 */
const initButton = function(c_this, list) {
	c_this.buttonArray = [];
	for (let button of list) {
		c_this.buttonArray.push({
			"iconPath": button.controlVO.img,
			"selectedIconPath": button.controlVO.img,
			"text": button.control_name,
			"active": false
		});
	}
}

/**
 * @param {Object} c_this
 * @param {Object} c_params
 * 得到page上下文
 */
const getPageContext = function(c_this, c_params) {
	if (null == c_params) {
		return;
	}
	apiGetPageContext(c_params).then(data => {
		console.log("getPageContext Success:", data);
		c_this.pageContextData = data;
	}).catch(exception => {
		console.log("getPageContext Exception:", exception);
	});
}

/**
 * @param {Object} c_this
 * @param {Object} c_params
 * @param {Object} isInitButton
 * 子组件设置父组件的page上下文，以及是否加载子组件的悬浮按钮
 */
const setParentPageContext = function(c_this, c_params, isInitButton) {
	if (null == c_params) {
		return;
	}
	apiGetPageContext(c_params).then(data => {
		console.log("getPageContext Success:", data);
		c_this.$emit('setPageContext', data);
		if (isInitButton) {
			initButton(c_this, data.viewButtonVO.controlContextVOList);
		}
	}).catch(exception => {
		console.log("getPageContext Exception:", exception);
	});
}

const nodeClick = function(c_this, node) {
	console.log("nodeClick", node);
	c_this.$u.route({
		url: '/pages/page/details',
		params: {
			params: JSON.stringify(node.parameter),
			type: "GETPAGE"
		},
	});
}

/**
 * @param {Object} c_this
 * @param {Object} button
 * 按钮事件
 */
const buttonClick = function(c_this, button) {
	let type = button.controlVO.click;
	let params = button.controlVO.parameter;
	let route_path = button.controlVO.route_path;
	let server_url = button.controlVO.server_url;
	let pageParams = button.pageParams
	if ("OPENPAGE" == type) {
		if (isNull(route_path)) {
			route_path = '/pages/page/details';
		}
		c_this.$u.route({
			url: route_path,
			params: {
				params: JSON.stringify(params),
				type: "GETPAGE"
			},
		});
	} else if ("INITPAGE" == type) {
		if (isNull(route_path)) {
			route_path = '/pages/page/details';
		}
		apiInitPageContext(params).then(data => {
			console.log("initPageContext Success:", data);
			c_this.$u.route({
				url: route_path,
				params: {
					params: JSON.stringify(data),
					type: "GETPAGE"
				},
			});
		}).catch(exception => {
			console.log("initPageContext Exception:", exception);
		})
	} else if ("DISCARD" == type) {
		params.control_no = button.control_no;
		params.value = 2;
		params.valueSource = button.controlVO.valueSource;
		console.log("DISCARD params:", params);
		apiSetControlContext(params).then(data => {
			console.log("setControlContext Success:", data);
			setParentPageContext(c_this, pageParams, true);
		}).catch(exception => {
			console.log("setControlContext Exception:", exception);
		})
	} else if ("RECOVERY" == type) {
		params.control_no = button.control_no;
		params.value = 1;
		params.valueSource = button.controlVO.valueSource;
		console.log("RECOVERY params:", params);
		apiSetControlContext(params).then(data => {
			console.log("setControlContext Success:", data);
			setParentPageContext(c_this, pageParams, true);
		}).catch(exception => {
			console.log("setControlContext Exception:", exception);
		})
	} else if ("DEL" == type) {
		params.control_no = button.control_no;
		params.value = 3;
		params.valueSource = button.controlVO.valueSource;
		console.log("DEL params:", params);
		apiSetControlContext(params).then(data => {
			console.log("setControlContext Success:", data);
			c_this.getListByControl("search");
		}).catch(res => {
			console.log("setControlContext Exception:", exception);
		})
	} else if ("BATCHSAVE" == type) {
		apiSetBatchControlContext(params).then(data => {
			console.log("setBatchControlContext Success:", data);
			c_this.getListByControl("search");
		}).catch(exception => {
			console.log("setBatchControlContext Exception:", exception);
		})
	} else if ("NODE_SUBMIT" == type) {
		console.log("NODE_SUBMIT params:", params);
		apiNodeAction(params).then(data => {
			console.log("nodeActio Success:", data);
			setParentPageContext(c_this, pageParams, true);
		}).catch(exception => {
			console.log("nodeActio Exception:", exception);
		})
	} else if ("NODE_OVERRULE" == type) {
		console.log("NODE_OVERRULE params:", params);
		apiNodeAction(params).then(data => {
			console.log("nodeActio Success:", data);
			setParentPageContext(c_this, pageParams, true);
		}).catch(exception => {
			console.log("nodeActio Exception:", exception);
		})
	} else if ("NODE_TERMINATION" == type) {
		console.log("NODE_TERMINATION params:", params);
		apiNodeAction(params).then(data => {
			console.log("nodeActio Success:", data);
			setParentPageContext(c_this, pageParams, true);
		}).catch(exception => {
			console.log("nodeActio Exception:", exception);
		})
	}
}

export default {
	baseUrl,
	now,
	isArray,
	isNull,
	buttonClick,
	getPageContext,
	initButton,
	nodeClick,
	setControlValue,
	getHeader,
	getTimeValue
}
