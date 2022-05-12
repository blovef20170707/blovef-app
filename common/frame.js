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

/**
 * @param {Object} c_this
 * @param {Object} list
 * 初始化悬浮按钮数组
 */
const initButton = function(c_this,list) {
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
const getPageContext = function(c_this,c_params) {
	if(null == c_params){
		return;
	}
	c_this.$u.api.getPageContext(c_params).then(res => {
		console.log("getPageContextSuccess:", res);
		if (res.success && null != res.data) {
			c_this.pageContextData = res.data;
		}
	}).catch(res => {
		console.log("getPageContextException:", res);
		getApp().$resShow(c_this,res);
	});
}

/**
 * @param {Object} c_this
 * @param {Object} c_params
 * @param {Object} isInitButton
 * 子组件设置父组件的page上下文，以及是否加载子组件的悬浮按钮
 */
const setParentPageContext = function(c_this,c_params,isInitButton) {
	if(null == c_params){
		return;
	}
	c_this.$u.api.getPageContext(c_params).then(res => {
		console.log("getPageContextSuccess:", res);
		if (res.success && null != res.data) {
			c_this.$emit('setPageContext', res.data); 
			if(isInitButton){
				initButton(c_this,res.data.viewButtonVO.controlContextVOList);
			}
		}
	}).catch(res => {
		console.log("getPageContextException:", res);
		getApp().$resShow(c_this,res);
	});
}

const nodeClick = function(c_this,node) {
	console.log("nodeClick",node);
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
const buttonClick = function(c_this,button) {
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
		c_this.$u.api.initPageContext(params).then(res => {
			console.log("initPageContextStart:", res);
			if (res.success && null != res.data) {
				c_this.$u.route({
					url: route_path,
					params: {
						params: JSON.stringify(res.data),
						type: "GETPAGE"
					},
				});
			}
		}).catch(res => {
			console.log("initPageContextException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("DISCARD" == type) {
		params.control_no = button.control_no;
		params.value = 2;
		params.valueSource = button.controlVO.valueSource;
		console.log("DISCARD params:", params);
		c_this.$u.api.setControlContext(params).then(res => {
			console.log("setControlContextStart:", res);
			getApp().$resShow(c_this, res);
			setParentPageContext(c_this,pageParams,true);
		}).catch(res => {
			console.log("setControlContextException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("RECOVERY" == type) {
		params.control_no = button.control_no;
		params.value = 1;
		params.valueSource = button.controlVO.valueSource;
		console.log("RECOVERY params:", params);
		c_this.$u.api.setControlContext(params).then(res => {
			console.log("setControlContextStart:", res);
			getApp().$resShow(c_this, res);
			setParentPageContext(c_this,pageParams,true);
		}).catch(res => {
			console.log("setControlContextException:", res);
			getApp().$resShow(c_this,res);
		})
	} else if ("DEL" == type) {
		params.control_no = button.control_no;
		params.value = 3;
		params.valueSource = button.controlVO.valueSource;
		console.log("DEL params:", params);
		c_this.$u.api.setControlContext(params).then(res => {
			console.log("setControlContextStart:", res);
			getApp().$resShow(c_this, res);
			c_this.getListByControl("search");
		}).catch(res => {
			console.log("setControlContextException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("BATCHSAVE" == type) {
		c_this.$u.api.setBatchControlContext(params).then(res => {
			console.log("setBatchControlContextStart:", res);
			getApp().$resShow(c_this, res);
			c_this.getListByControl("search");
		}).catch(res => {
			console.log("setBatchControlContextException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("NODE_SUBMIT" == type) {
		console.log("NODE_SUBMIT params:", params);
		c_this.$u.api.nodeAction(params).then(res => {
			console.log("nodeActioStart:", res);
			getApp().$resShow(c_this, res);
			setParentPageContext(c_this,pageParams,true);
		}).catch(res => {
			console.log("nodeActioException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("NODE_OVERRULE" == type) {
		console.log("NODE_OVERRULE params:", params);
		c_this.$u.api.nodeAction(params).then(res => {
			console.log("nodeActioStart:", res);
			getApp().$resShow(c_this, res);
			setParentPageContext(c_this,pageParams,true);
		}).catch(res => {
			console.log("nodeActioException:", res);
			getApp().$resShow(c_this, res);
		})
	} else if ("NODE_TERMINATION" == type) {
		console.log("NODE_TERMINATION params:", params);
		c_this.$u.api.nodeAction(params).then(res => {
			console.log("nodeActioStart:", res);
			getApp().$resShow(c_this, res);
			setParentPageContext(c_this,pageParams,true);
		}).catch(res => {
			console.log("nodeActioException:", res);
			getApp().$resShow(c_this, res);
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
	nodeClick
}
