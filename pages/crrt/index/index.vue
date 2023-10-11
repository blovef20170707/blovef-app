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
						<text style="font-size: 12px;">2023年理论培训授课安排一览表</text>
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
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 5px;">
				</view>
				<view style="display: flex;padding-left: 5px;">
					<view style="width: 60%;"><text
							style="font-size: 12px;font-weight:bolder;color: #272727;">推荐课程</text></view>
					<view style="width: 40%;">
						<view style="float: right;display: flex;padding-right: 5px;">
							<text style="font-size: 12px;">查看全部</text><u-icon name="arrow-right" size="12"></u-icon>
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view>
					<view style="padding-left: 5px;border-bottom:1px solid #e7e7e7" v-for="(item,index) in courseList"
						:key="index">
						<view style="height: 10px;">
						</view>
						<view style="display: flex;" @click="course(item)">
							<view style="width: 2px;">
							</view>
							<view style="height:90px;position: relative;padding: 0">
								<u--image radius="5" :src="item.icon" width="110px" height="80px" mode="scaleToFill">
								</u--image>
								<view v-if="item.live == true && item.document == 'video'" class="live">
									<view class="zb"></view>
									<view style="margin-left:4px;">
										<text style="font-size: 10px;">{{item.liveText}}</text>
									</view>
								</view>
								<view v-if="item.document == 'file'" class="filec">
									<view>
										<text style="font-size: 10px;">文件</text>
									</view>
								</view>
							</view>
							<view style="width: 10px;">
							</view>
							<view style="width:100%;height: 90px;">
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
								<view style="height: 20px;"></view>
								<view style="display: flex;font-weight:bolder;color: #8f8f8f;font-size: 12px;">
									<view style="width: 65%;">
										<text>{{item.name}}</text>
									</view>
									<view style="width: 35%;padding-right: 5px;">
										<view style="float: right;display: flex;">
											<text v-if="item.document == 'video'">{{item.time}}课时</text>
											<!-- <text v-if="item.type == 1">pdf</text> -->
										</view>
									</view>
								</view>
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
		apiCrrtTrainIndex,
		apiCrrtTrainTrainee
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
			this.token = uni.getStorageSync('token');
			console.log("onShow crrt index:" + this.token);
			this.getIndex();
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			appAction(item) {
				console.log("item", item);
				if (!this.token) {
					uni.$u.route('/pages/login/login');
				} else {
					if (item.title == '报名入口') {
						uni.$u.route(item.url);
					} else {
						apiCrrtTrainTrainee({}).then(data => {
							console.log("学员", data)
							if (data && data.trainee_status != 2) {
								this.$refs.uToast.show({
									message: '请先报名,并等待审核通过',
									type: 'warning'
								});
							} else {
								console.log(item)
								if (item.tag == 0) {
									this.$refs.uToast.show({
										message: '该功能开发中',
										type: 'warning'
									});
								} else {
									if (item.title == '学习园地') {
										uni.$u.route({
											"type": "switchTab",
											"url": item.url
										});
									} else {
										uni.$u.route(item.url);
									}

								}
							}
						}).catch(exception => {
							console.log("exception", exception)
						}).finally(res => {

						})
					}
				}
			},
			getIndex() {
				console.log("getIndex vue")
				apiCrrtTrainIndex({}).then(data => {
					console.log("首页加载", data)
					this.banList = data.banList;
					this.appList = data.appList;
					this.courseList = data.courseList;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			timeable() {
				console.log("test")
				uni.$u.route('/pages/crrt/timeable/index');
			},
			course(item) {
				if (item.listing_status == 0) {
					this.$refs.uToast.show({
						message: '该课程未开放',
						type: 'warning'
					});
				} else {
					if (item.document == 'file') {
						uni.downloadFile({
							url: item.document_url,
							success: function(res) {
								console.log(res);
								var filePath = res.tempFilePath;
								uni.openDocument({
									filePath: filePath,
									showMenu: true,
									success: function(res) {
										console.log('打开文档成功');
									}
								});
							}
						});
					} else if (item.document == 'video') {
						uni.$u.route("/pages/crrt/study/course", {
							params: JSON.stringify(item)
						});
					}
				}
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

	.file {
		width: 12px;
		height: 12px;
		background: url('/static/crrt/zb.gif') no-repeat 50%/contain;
		vertical-align: bottom;
	}

	.filec {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0px;
		// left: 6px;
		padding: 1px 2px;
		border-radius: 0px 0px 4px 0px;
		line-height: 12px;
		font-weight: 300;
		font-size: 10px;
		color: #fff;
		background-color: #f23f4e;
	}

	.live {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0px;
		// left: 6px;
		padding: 1px 2px;
		border-radius: 5px;
		line-height: 12px;
		font-weight: 300;
		font-size: 10px;
		color: #fff;
		background-color: #f23f4e;
	}
</style>