<template>
	<view class="">
		<bf-upload :control="control"></bf-upload>
	</view>

</template>

<script>
	import bfUpload from '@/components/aip/bf-upload.vue';
	export default {
		components: {
			bfUpload,
		},
		data() {
			return {
				control: '',
				detailsParams: ''
			}
		},
		onLoad(option) {
			console.log("option",option);
			this.control = JSON.parse(option.control);
			this.detailsParams = JSON.parse(option.detailsParams);
			console.log("control:", this.control);
			console.log("detailsParams:", this.detailsParams);
		},
		onHide() {
			console.log("onHide");
		},
		onUnload() {
			console.log("onUnload");
			let pages = getCurrentPages(); // 当前页面
			let beforePage = pages[pages.length - 2]; // 上一页
			console.log(pages);
			console.log(beforePage);
			let option = {
				params: JSON.stringify(this.detailsParams),
				type: "GETPAGE"
			}
			beforePage.onLoad(option);
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
