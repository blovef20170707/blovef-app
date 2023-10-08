<template>
	<view>
		<view class="wrap">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom"
				refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100"
				@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				@refresherabort="onAbort">
				<view class="page-box">
					<view class="order">
						<view class="top">
						</view>
						<view class="item"> 
							<view>
								<view>
									审批：耗材入库
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="more">
								<u-icon name="more-dot-fill" color="rgb(4, 4, 4)"></u-icon>
							</view>
							<view>
								<u-button class="cardButton" @click="createInstance()" size="mini" :plain="true" type="success"
									:ripple="true">
									发起
								</u-button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import { apiCreateInstance } from '@/common/http.api.js';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			console.log("onLoad")
			console.log(uni.$u);
		},
		onShow() {
			console.log("onShow")
		},
		methods: {
			createInstance(){
				var params = {
					"procdef_id": "1",
					"procdef_version": 1
				};
				apiCreateInstance(params).then(data => {
					console.log(data);
					uni.$u.route({
						url: '/pages/page/details',
						params: {
							params: JSON.stringify(data.parameter),
							type: "GETPAGE"
						},
					});
				}).catch(res => {
					console.log("createInstanceException:", res);
					this.$u.toast("加载出错");
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.page-box {}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		box-sizing: border-box;
		margin: 20rpx auto;
		// font-size: 28rpx;

		.top {
			width: 100%;
			height: 20rpx;
			background-color:#19be6b;
		}

		.item {
			padding: 20rpx;
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			padding: 0 20rpx;
			justify-content: space-between;
			align-items: center;

			.cardButton {
				margin-left: 8rpx
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		// font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			// font-size: 24rpx;
			color: #fa3534;
			margin-top: 20rpx;
		}
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.sort-row-name {
		width: 100%;
		margin: 10rpx;
	}

	.sort-row-value {
		width: 100%;
		margin: 10rpx;
	}

	.sort-list {
		width: 100%;
	}

	.sort-op {
		display: flex;
		width: 100%;
	}

	.ads-list {
		margin-top: 40rpx;
	}
</style>
