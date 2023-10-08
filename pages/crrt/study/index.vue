<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<u-swiper imgMode="heightFix" :list="banList"></u-swiper>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 5px;"></view>
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
				<view style="display: flex;">
					<view style="width: 100%;padding-left:5px">
						<view>
							<u-search height="20" :inputStyle="inputStyle" :actionStyle="actionStyle"
								placeholder="请输入课程" v-model="keyword" :showAction="true" @custom="search()"></u-search>
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view v-if="tagsearch == true" style="display: flex;">
					<view style="width: 5px;">
					</view>
					<view>
						<u-tag text="专科班" :plain="!zkcheck" size="mini" @click="tagclick1()"></u-tag>
					</view>
					<view style="width: 5px;">
					</view>
					<view>
						<u-tag text="分层次" :plain="!fcccheck" size="mini" @click="tagclick2()"></u-tag>
					</view>
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
								<view style="height: 20px;"></view>
								<view style="display: flex;font-weight:bolder;color: #8f8f8f;font-size: 12px;">
									<view style="width: 75%;">
										<text>{{item.name}}</text>
									</view>
									<view style="width: 25%;padding-right: 5px;">
										<view style="float: right;display: flex;">
											<text v-if="item.document == 'video'">{{item.time}}课时</text>
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
		apiCrrtTrainStudyIndex,
		apiCrrtTrainTrainee,
		apiCrrtTrainCourseSearch
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
				appList: [],
				types: [],
				zkcheck: false,
				fcccheck: false,
				tagsearch: false
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			this.getIndex();
		},
		onUnload() {

		},
		onShow() {
			
		},
		methods: {
			tagclick1() {
				this.zkcheck = !this.zkcheck;
				search();
			},
			tagclick2() {
				this.fcccheck = !this.fcccheck;
				search();
			},
			search() {
				let json = {
					params: {
						"title": this.keyword
					}
				};
				console.log(json)
				apiCrrtTrainCourseSearch(json).then(data => {
					console.log("课程查询", data)
					this.courseList = data;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
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

	.ontagcheck {
		background-color: #afafaf;
		border-radius: 5px;
		height: 15px;
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
		width: 10px;
		height: 10px;
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
		border-radius: 4px;
		line-height: 12px;
		font-weight: 300;
		font-size: 10px;
		color: #fff;
		background-color: #f23f4e;
	}
</style>