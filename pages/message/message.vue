<template>
	<view>
		<view class="wrap">
			<view class="tableOperation">
				<view>
					<u-search height="50rpx" placeholder="快捷搜索" :show-action="true" action-text="搜索" :animation="true"
						v-model="keyword" :clearabled="true" bg-color="#ffffff" @custom="quickSearchSubmit()">
					</u-search>
				</view>
			</view>
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom"
				refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100"
				@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				@refresherabort="onAbort">
				<view class="page-box">
					<view class="order" v-for="(row, rowIndex) in messages" :key="rowIndex">
						<view class="top">
						</view>
						<view class="item">
							<view class="left">
								<view class="img">
									<u-avatar :src="avaSrc" size="30"></u-avatar>
								</view>
							</view>
							<view class="content">
								<view class="head">
									<view class="title">{{row.title}}</view>
									<view class="time">{{row.time}}</view>
								</view>
								<view class="body">
									<xzj-readMore hideLineNum="2" showHeight="100">
									{{row.body}}
									</xzj-readMore>
									<!-- <u--textarea v-model="row.body" border="none" :autoHeight="autoHeight">
									</u--textarea> -->
								</view>
							</view>
							<!-- <view class="right">
								<view>
									{{row.time}}
								</view>
								<view class="status">
									<u-icon v-if="row.status == 'N'" name="more-dot-fill" size="20"
										color="rgb(194, 0, 0)"></u-icon>
									<u-icon v-if="row.status == 'Y'" name="more-dot-fill" size="20"
										color="rgb(204, 204, 204)"></u-icon>
								</view>
							</view> -->
						</view>
					</view>
				</view>
			</scroll-view>
			</block>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import frame from '../../common/frame.js';
	export default {
		data() {
			return {
				value: '22223333333333',
				type: 'textarea',
				border: false,
				autoHeight: true,
				messages: [{
						body: 'M100申请入库M100申请入库M100申请入库M100申请入库M100申请入库M100申请入库M100申请入库M100申请入库M100申',
						title: '耗材入库-审批',
						time: '2022/03/06 10:10:10',
						status: 'Y'
					},
					{
						body: 'ST100申请入库',
						title: '新股申购-申请',
						time: '2022/03/07 12:10:10',
						status: 'N'
					},
					{
						body: 'ST100申请入库',
						title: '新股申购-申请',
						time: '2022/03/07 12:10:10',
						status: 'N'
					},
					{
						body: 'ST100申请入库',
						title: '新股申购-申请',
						time: '2022/03/07 12:10:10',
						status: 'N'
					}
				],
			}
		},
		onLoad() {
			console.log("onLoad")
		},
		onShow() {
			console.log("onShow")
		},
		methods: {

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

	.page-box {
		margin: 20rpx 0 0;
	}

	.order {
		background-color: #ffffff;
		// border-radius: 20rpx;
		box-sizing: border-box;
		// font-size: 28rpx;

		border-top: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;

		.top {}

		.item {
			display: flex;

			.left {
				width: 12%;
				position: relative;

				.img {
					height: 30px;
					position: absolute;
					top: 0px;
					left: 2px;
					right: 0px;
					bottom: 0px;
					margin: auto;
				}
			}

			.content {
				width: 88%;
				.head {
					display: flex;
					position: relative;
					.title {
						// font-size: 12px;
					}
					.time {
						// font-size: 12px;
						position: absolute;
						right: 0px;
						bottom: 0px;
					}
				}
				.body {
					// font-size: 12px;
				}
			}

			.right {
				text-align: right;
				position: relative;

				.status {
					position: absolute;
					right: 0px;
					bottom: 0px;
				}
			}
		}

		.bottom {
			display: flex;
			padding: 0 20rpx;
			justify-content: space-between;
			align-items: center;
		}

	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
