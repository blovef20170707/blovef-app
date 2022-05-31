// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/	
        config.baseURL = 'http://192.168.1.83:62670'; /* 根域名 */
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// config.header.token = vm.$store.state.userInfo.token;
		const token = uni.getStorageSync('token');
		const res = uni.getSystemInfoSync();
		const accountInfo = uni.getAccountInfoSync();
		console.log("token",token);
		config.header.token = token;
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
		config.header.information = JSON.stringify(information);
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url == '/page/uploadControlContext') {
			config.header["content-type"] = "multipart/form-data"
		}
		console.log("config:",config);
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		console.log(response);
		const data = response.data
		const custom = response.config?.custom
		console.log(data);
		if(data.code === "200" && data.success == true){
			if (custom?.toast) {
				uni.$u.toast(data.message??"操作成功")
			}
			console.log(data.message);
			return data.data === undefined ? {} : data.data
		}else { 
			uni.$u.toast(data.message??"系统异常,请联系管理员")
			return Promise.reject(data)
			// 否则返回一个pending中的promise，请求不会进入catch中
			// return new Promise(() => { })
		}
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）会进入catch
		// return Promise.reject(response)
	
		if(response.statusCode === 401){
			console.log("登录失效，请重新登录")
			setTimeout(() => {
				uni.$u.route({
					type: 'reLaunch',
					url: '/pages/login/login'
				});
			}, 1500)
		}else{
			uni.$u.toast("系统异常,请联系管理员")						
		}
		// 修改为不进入catch
		return new Promise(() => { })
		
	})
}







/**
 * 使用custom写法
module.exports = (vm) => {// 此vm参数为页面的实例，可以通过它引用vuex中的变量
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        //config 为默认全局配置
        config.baseURL = 'http://192.168.1.83:62670';
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		console.log("config:",config);
	    config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			// config.header.token = vm.$store.state.userInfo.token;
			const token = uni.getStorageSync('token');
			const res = uni.getSystemInfoSync();
			const accountInfo = uni.getAccountInfoSync();
			console.log("token",token);
			config.header.token = token;
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
			config.header.information = JSON.stringify(information);
			// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
			if (config.url == '/page/uploadControlContext') {
				config.header["content-type"] = "multipart/form-data"
			}			
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	// 对响应成功做点什么 可使用async await 做异步操作
	uni.$u.http.interceptors.response.use((response) => { 
		console.log(response);
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		console.log(data);
		if(data.code === "200"){
			return data.data === undefined ? {} : data.data
		}else { 
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {  
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => { })
			}
		}
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）会进入catch
		// return Promise.reject(response)
	
		if(response.statusCode === 401){
			console.log("验证失败，请重新登录")
			setTimeout(() => {
				uni.$u.route({
					type: 'reLaunch',
					url: '/pages/login/login'
				});
			}, 1500)
		}else{
			uni.$u.toast("系统异常,请联系管理员")						
		}
		// 修改为不进入catch
		return new Promise(() => { })
		
	})
}
 */
