<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<u-swiper :list="banList" imgMode="heightFix"></u-swiper>
			</view>
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 5px;"></view>
				<view style="display: flex;height: 25px;">
					<view style="width: 20%;">
						<u--image src="/static/crrt/message1.png" width="25px" height="25px">
						</u--image>
					</view>
					<view
						style="width: 75%;height:25px;text-align: left;display: flex;align-items: center;flex-wrap: wrap;">
						<text style="font-size: 12px;">2023年理论培训授课安排一览表</text>
					</view>
					<view style="width: 5%;height:25px;display: flex;align-items: center;flex-wrap: wrap;">
						<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view>
					<view>
						<view>
							<u-grid :border="false" col="4">
								<u-grid-item v-for="(item,index) in appList" :key="index"
									customStyle="padding-top: 10px; padding-bottom: 10px">
									<u--image @click="appAction(item)" :src="item.img" width="40px" height="40px">
									</u--image>
									<text class="grid-text">{{item.title}}</text>
								</u-grid-item>
							</u-grid>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="display: flex;">
					<view style="width: 60%;"><text
							style="font-size: 12px;font-weight:bolder;color: #272727;">推荐课程</text></view>
					<view style="width: 40%;">
						<view style="float: right;display: flex;">
							<text style="font-size: 12px;">查看全部</text><u-icon name="arrow-right" size="12"></u-icon>
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view>
					<view style="border-bottom:1px solid #d0d0d0" v-for="(item,index) in courseList" :key="index">
						<view style="height: 5px;">
						</view>
						<view style="display: flex;">
							<view style="width: 2px;">
							</view>
							<view style="height:80px">
								<u--image src="/static/crrt/kc.png" width="110px" height="80px" mode="scaleToFill">
								</u--image>
							</view>
							<view style="width: 10px;">
							</view>
							<view style="width:100%;height: 80px;">
								<view>
									<view>
										<u--text lines="2" size="13" bold=true color="#272727"
											:text="item.title"></u--text>
									</view>
								</view>
								<view style="height: 2px;"></view>
								<view style="display: flex;">
									<view v-for="(tagitem,tagindex) in item.tag" :key="tagindex">
										<u-tag :text="tagitem.name" plain size="mini" :bgColor="tagitem.color"
											color="#ffffff" borderColor="#ffffff" plain plainFill></u-tag>
										<view style="width:2px;"></view>
									</view>
								</view>
								<view style="height: 10px;"></view>
								<view style="display: flex;font-weight:bolder;color: #8f8f8f;font-size: 12px;">
									<view style="width: 75%;">
										<text>{{item.name}}</text>
									</view>
									<view style="width: 25%;">
										<view style="float: right;display: flex;">
											<text>{{item.time}}课时</text>
										</view>
									</view>
								</view>
							</view>
							<view style="width: 2px;">
							</view>
						</view>
						<view style="height: 5px;">
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				notice: '',
				token: '',
				banList: [],
				courseList: [],
				appList: []
			}
		},
		onLoad() {
			this.getIndex();
		},
		onUnload() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
		},
		methods: {
			appAction(item) {
				console.log("item", item);
				console.log("item", item);
				if (!this.token) {
					uni.$u.route('/pages/login/nopass');
				} else {
					uni.$u.route(item.url);
				}
			},
			getIndex(){
				apiCrrtTrainIndex({}).then(data => {
					console.log("首页加载", data)
					this.banList = data.banList;
					this.appList = data.appList;
					this.courseList = data.courseList;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
				
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		// margin: 20px;
		// width: 500px;
		// height: 500px;
		// perspective: 1000px;
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
</style>