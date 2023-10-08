<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<u-parse :content="model.informationHtml"></u-parse>
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCarTaxiInformationInfo
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				model:{}
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				apiCarTaxiInformationInfo().then(data => {
					// console.log("详情", data)
					if (data) {
						this.model = data;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: white;
	}

	.wrap {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		color: #7d7e7f;
	}

	.container {
		width: 97%;
	}

	.leftLable {
		width: 20%;
		display: flex;
		// justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.leftLable1 {
		display: flex;
		justify-content: center;
		// align-items: center;
		// flex-wrap: wrap;
	}

	.grid-text {
		font-size: 10px;
		color: #7d7e7f;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.zb {
		width: 12px;
		height: 12px;
		background: url('/static/crrt/zb.gif') no-repeat 50%/contain;
		vertical-align: bottom;
	}

	.live {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0px;
		// left: 6px;
		padding: 1px 2px;
		border-radius: 4px;
		line-height: 12px;
		font-weight: 300;
		font-size: 10px;
		color: #fff;
		background-color: #f23f4e;
	}
</style>