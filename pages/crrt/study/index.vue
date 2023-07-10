<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<u-swiper imgMode="heightFix" :list="banList"></u-swiper>
			</view>
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 4px;"></view>
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
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 4px;">
				</view>
				<view style="display: flex;">
					<view style="width: 100%;padding-left:3px">
						<view>
							<u-search height="20" :inputStyle="inputStyle" :actionStyle="actionStyle" placeholder="请输入课程"
								v-model="keyword" :showAction="true"></u-search>
						</view>
					</view>
				</view>
				<view style="height: 4px;">
				</view>
				<view>
					<view style="border-bottom:1px solid #d0d0d0" v-for="(item,index) in courseList" :key="index">
						<view style="height: 4px;">
						</view>
						<view style="display: flex;" @click="course(item)">
							<view style="width: 3px;">
							</view>
							<view style="height:80px;">
								<u--image radius="5" :src="item.icon" width="110px" height="80px" mode="scaleToFill">
								</u--image>
							</view>
							<view style="width: 10px;">
							</view>
							<view style="width:100%;height: 80px;">
								<view>
									<view style="display: flex;">
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
								<view style="height: 15px;"></view>
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
						<view style="height: 4px;">
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
		apiCrrtTrainStudyIndex,
		apiCrrtTrainTrainee
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				inputStyle: {
					fontSize: '12px', 
				},
				actionStyle: {
					fontSize: '12px', 
				},
				keyword: '',
				token: '',
				banList: [],
				courseList: [],
				appList: []
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
			appAction(item) {
				console.log("item", item);
				if (item.tag == 0) {
					this.$refs.uToast.show({
						message: '该功能开发中',
						type: 'warning'
					});
				} else {
					uni.$u.route(item.url);
				}
			},
			getIndex() {
				apiCrrtTrainStudyIndex({}).then(data => {
					console.log("首页加载", data)
					this.banList = data.banList;
					this.appList = data.appList;
					this.courseList = data.courseList;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			course(item) {
				if (item.listing_status == 0) {
					this.$refs.uToast.show({
						message: '该课程未开放',
						type: 'warning'
					});
				} else {
					uni.$u.route("/pages/crrt/study/course", {
						params: JSON.stringify(item)
					});
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

	.grid-text {
		font-size: 10px;
		color: #7d7e7f;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>