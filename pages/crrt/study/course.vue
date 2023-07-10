<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 4px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<view style="height: 2px;">
				</view>
				<view style="display: flex;">
					<view style="width: 60%;padding-left:5px;"><text
							style="font-size: 13px;font-weight:bolder;color: #272727;">课件视频</text></view>
				</view>
				<view style="height: 5px;">
				</view>
				<view v-if="course.videoData == false">
					<view>
						<u-swiper height="150px" :showTitle="true" :list="course.videos" keyName="url"
							:autoplay="false"></u-swiper>
					</view>
					<view style="height: 10px;">
					</view>
					<view style="padding-left: 5px;">
						<view style="display: flex;">
							<view style="width: 20%;">
								<u--text :text="course.type" :bold="true" color="#f4621f"></u--text>
							</view>
							<view style="width: 80%;">
								<view style="float: right;display: flex;padding-right:5px">
									<u--text :bold="true" :text="course.pnum"></u--text>
								</view>
							</view>
						</view>
						<view style="height: 5px;">
						</view>
						<view>
							<u--text :bold="true" :text="course.title"></u--text>
						</view>
					</view>
					<view style="height: 10px;">
					</view>
				</view>
				<view v-if="course.videoData == true">
					<view style="display: flex;justify-content: center;align-items: center;">
						<u--image height="150px"
							src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/novideo.png">
						</u--image>
					</view>
				</view>
			</view>
			<view style="height: 4px;background-color: #f1f1f1;">
			</view>
			<view style="width: 100%;height: 100%; background-color: white;border-radius:5px;">
				<view style="height: 2px;">
				</view>
				<u-tabs :list="course.tabslist" :current="current" @change="change">
				</u-tabs>
				<view v-if="current == 0" style="padding-left:5px;">
					<view style="display: flex;">
						<view style="width: 60%;"><text
								style="font-size: 13px;font-weight:bolder;color: #272727;">课程介绍</text></view>
					</view>
					<view>
						<view>
							<view style="height: 5px;">
							</view>
							<view v-for="(item,index) in course.courseintroduces" :key="index">
								<view style="display: flex;">
									<u-icon size="15" name="/static/crrt/shuijin.png"></u-icon>
									<view style="width: 5px;"></view>
									<u--text size="12" :text="item.title" color="#7d7e7f"></u--text>
								</view>
								<view style="height: 2px;">
								</view>
							</view>
						</view>
						<view style="height: 10px;">
						</view>
						<view>
							<view style="height: 5px;">
							</view>
							<view style="display: flex;">
								<view style="width: 60%;"><text
										style="font-size: 13px;font-weight:bolder;color: #272727;">讲师介绍</text></view>
							</view>
							<view style="height: 5px;">
							</view>
							<view style="padding-right:5px;display: flex;justify-content: center;align-items: center;">
								<view style="width: 95%;background-color:#f1f1f1 ;border-radius:5px;">
									<view style="height: 5px;">
									</view>
									<view style="display: flex;">
										<view style="padding-left: 10px;"><u-avatar :src="course.teacher.img"
												size="40"></u-avatar></view>
										<view style="padding-left: 20px;height: 40px;width: 70%;">
											<view style="height: 2px;"></view>
											<view><text
													style="color: #7d7e7f;font-size: 12px;">{{course.teacher.name}}</text>
											</view>
											<view style="height: 4px;"></view>
											<view><text style="color: #7d7e7f;font-size: 12px;">肾内科/主治医师</text></view>
										</view>
										<view
											style="width:10%;display: flex;justify-content: center;align-items: center;">
											<view style="float: right;">
												<u--image src="/static/crrt/right.png" height="15"
													width="15"></u--image>
											</view>
										</view>
									</view>
									<view style="height: 5px;">
									</view>
								</view>
							</view>
						</view>
						<view style="height: 2px;">
						</view>
					</view>
				</view>
				<view v-if="current == 1">
					<view style="display: flex;">
						<view style="width: 60%;padding-left:5px;"><text
								style="font-size: 13px;font-weight:bolder;color: #272727;">课件分享</text></view>
					</view>
					<view>
						<u-list @scrolltolower="scrolltolower(3)">
							<u-list-item v-for="(item, index) in course.coursewares" :key="index">
								<u-cell customStyle="font-size: 12px;" :title="item.title" isLink
									@click="openAtt(item)">
									<u-avatar slot="icon" shape="square" size="30" :src="item.type_url"></u-avatar>
								</u-cell>
							</u-list-item>
						</u-list>
					</view>
				</view>
			</view>
			<view style="height: 4px;">
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainCourseIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				params: {},
				current: 0,
				course: {
					// type: "公开课",
					// pnum: "7391人学习",
					// title: "慢性肾病患者的管理",
					// videoData: false,
					// videos: [{
					// 	url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
					// 	title: '课程1',
					// 	poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					// 	type: 'video'
					// }],
					// tabslist: [{
					// 	name: '介绍',
					// }, {
					// 	name: '课件',
					// }],
					// courseintroduces: [{
					// 	"title": "慢性肾脏病(CKD)的定义"
					// }, {
					// 	"title": "引起肾脏病的原因"
					// }, {
					// 	"title": "慢性肾脏病分期"
					// }, {
					// 	"title": "CKD饮食营养治疗"
					// }],
					// coursewares: [{
					// 	"title": "测试1",
					// 	"type_url": "/static/crrt/pdf.png"
					// }, {
					// 	"title": "测试2",
					// 	"type_url": "/static/crrt/pdf.png"
					// }, {
					// 	"title": "测试3",
					// 	"type_url": "/static/crrt/pdf.png"
					// }],
					// teacher: {
					// 	"img": "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/ltx.jpg",
					// 	"name": "王沂芹",
					// 	"content": "长期从事肾脏病临床、科研、教学及血液净化中心管理工作。现任全军血液净化专业委员会青年委员，重庆市医学会内科学专业委员会委员。"
					// },
				}
			}
		},
		onLoad(option) {
			console.log("onLoad option", option);
			this.params = JSON.parse(option.params);
			this.getCourse();
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			getCourse() {
				let json = {
					params: {
						"course_id": this.params.id
					}
				};
				apiCrrtTrainCourseIndex(json).then(data => {
					console.log("课程详情", data)
					this.course = data;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			change(index) {
				this.current = index.index;
			},
		}
	}
</script>

<style lang="scss">
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
		width: 100%;
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