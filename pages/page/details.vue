<template>
	<view class="bg-white">
		<bf-pagex v-if="pageContextData.page_layout == 'PAGE-X'" @setPageContext="setPageContext" :pageContextData="pageContextData" :detailsParams="params"></bf-pagex>
		<bf-pagey v-if="pageContextData.page_layout == 'PAGE-Y'" :pageContextData="pageContextData"></bf-pagey>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import frame from '@/common/frame.js';  
	import bfPagex from '@/components/aip/bf-pagex.vue';
	import bfPagey from '@/components/aip/bf-pagey.vue';
	export default {
		components: {
			// 注册
			bfPagex,
			bfPagey
		},
		data() {
			return {
				pageContextData: '',
				params: '',
				type: ''
			}
		},
		/**
		 * @param {Object} option
		 * 第一次进入加载,参数可来源list
		 */
		onLoad(option) {
			console.log("option:", option);
			this.params = JSON.parse(option.params);
			this.type = option.type;
			if("GETPAGE" == this.type) {
				this.getPageContext();
			}
		},
		onShow() {
			console.log("onShow");
		},
		/**
		 * 页面下拉刷新
		 */
		onPullDownRefresh (){
			console.log("onPullDownRefresh");
		},
		methods: {
			getPageContext() {
				frame.getPageContext(this,this.params);
			},
			setPageContext(obj) {
				this.pageContextData = obj;
			}
		}
	}
</script>

<style lang="scss">
</style>
