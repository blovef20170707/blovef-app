<template>
	<view class="wrap">
		<view class="container">
			<scroll-view scroll-top="0" scroll-y="true" class="scrollwrap">
			</scroll-view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTrainee
	} from '@/common/http.api.js';
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.scrollwrap {
		margin: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		color: #7d7e7f;
		background: url('https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/vip.png');
		background-size:cover;
		overflow: scroll;
	}


	// .container {
	// 	width: 97%;
	// }
</style>