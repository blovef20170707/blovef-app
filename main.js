import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif


// uview start

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

uni.$u.setConfig({
	config: {
		// unit: 'rpx'
	},
	props: {
		radio: {
			// size: 15
		}
	}
})
// 引入请求封装，将app参数传递到配置中
require('@/common/http.interceptor.js')(app)
// uview end


