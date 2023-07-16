<template>
	<view class="wrap">
		<view class="container">
			<scroll-view scroll-top="0" scroll-y="true" class="scrollwrap">
				<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/vip_new.png"  :width="screenWidth" :height="screenHeight" model="widthFix"></u--image>
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
				screenWidth:'',
				screenHeight:''
			}
		},
		onLoad() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					// 设备屏幕宽度
					_this.screenWidth = res.screenWidth;
					// 设备屏幕高度
					_this.screenHeight = res.screenHeight;
					_this.screenHeight = res.screenWidth/0.395;
					console.log('屏幕宽度：' + _this.screenWidth);
					console.log('屏幕高度：' + _this.screenHeight);
				}
			});
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
		// background: url('https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/vip.png');
		// background-size:cover;
		overflow: scroll;
	}

	.img {
	
	}
</style>