<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<u-swiper :list="banList" imgMode="heightFix"></u-swiper>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 5px;"></view>
				<view style="display: flex;height: 25px;padding-left: 5px;">
					<view style="width: 20%;">
						<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/message1.png"
							width="25px" height="25px">
						</u--image>
					</view>
					<view @click="timeable()"
						style="width: 75%;height:25px;text-align: left;display: flex;align-items: center;flex-wrap: wrap;">
						<text style="font-size: 12px;">2023年10月安全教育通知</text>
					</view>
					<view
						style="padding-right: 5px;width: 5%;height:25px;display: flex;align-items: center;flex-wrap: wrap;">
						<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view>
					<view>
						<view>
							<u-grid :border="false" col="4">
								<u-grid-item v-for="(item,index) in appList" :key="index" @click="appAction(item)"
									customStyle="padding-top: 10px; padding-bottom: 10px">
									<u--image :src="item.img" width="40px" height="40px">
									</u--image>
									<text class="grid-text">{{item.title}}</text>
								</u-grid-item>
							</u-grid>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;" v-if="informationList.length != 0">
				<view style="height: 5px;">
				</view>
				<view style="display: flex;padding-left: 5px;">
					<view style="width: 60%;"><text
							style="font-size: 12px;font-weight:bolder;color: #272727;">{{column}}</text>
					</view>
					<view style="width: 40%;">
						<view style="float: right;display: flex;padding-right: 5px;">
							<!-- <text style="font-size: 12px;">查看全部</text><u-icon name="arrow-right" size="12"></u-icon> -->
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view>
					<view style="padding-left: 5px;border-bottom:1px solid #e7e7e7"
						v-for="(item,index) in informationList" :key="index">
						<view style="height: 10px;">
						</view>
						<view style="display: flex;" @click="fillin(item)">
							<view style="width: 2px;">
							</view>
							<view style="width: 10px;">
							</view>
							<view style="width:100%;height: 100px;">
								<view>
									<view>
										<u--text lines="2" size="14" bold=true color="#272727"
											:text="item.title"></u--text>
									</view>
								</view>
								<view style="height: 45px;"></view>
								<view style="display: flex;">
									<view style="width: 60%;">
										<u--text size="12" color="#8f8f8f" :text="item.name"></u--text>
									</view>
									<view style="width: 40%;padding-right: 5px;">
										<view style="float: right;display: flex;">
											<u--text size="12" color="#8f8f8f" :text="item.time"></u--text>
										</view>
									</view>
								</view>
							</view>
							<view style="width: 10px;">
							</view>
							<view style="height:100px;position: relative;padding: 0">
								<u--image radius="5" :src="item.icon" width="110px" height="100px" mode="scaleToFill">
								</u--image>
							</view>
							<view style="width: 2px;">
							</view>
						</view>
						<view style="height: 10px;">
						</view>
					</view>
				</view>
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCarTaxiIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				column: '',
				token: '',
				banList: [],
				appList: [],
				informationList: []
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			this.getIndex();
		},
		methods: {
			getIndex() {
				apiCarTaxiIndex({}).then(data => {
					console.log("首页", data)
					if (data) {
						this.banList = data.banList;
						this.informationList = data.informationList;
						this.appList = data.appList;
						this.column = data.column;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			timeable() {
				console.log("test")
				// uni.$u.route('/pages/crrt/timeable/index');
			},
			fillin(item) {
				uni.$u.route('/pages/car/taxi/information');
			},
			appAction(item) {
				console.log("item", item);
				if (item.title == '公司简介' || item.title == '投诉建议') {
					uni.$u.route({
						"type": "switchTab",
						"url": item.url
					});
				} else {
					uni.$u.route(item.url);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: white;
	// }
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