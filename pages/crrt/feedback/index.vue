<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<view>
					<view style="" v-for="(item,index) in courselist" :key="index">
						<view style="background-color: white;border-radius:5px;">
							<view style="height: 5px;">
							</view>
							<view style="display: flex;">
								<view style="width: 2px;">
								</view>
								<view style="height:40px">
									<u--image src="/static/crrt/feedback.png" width="45px" height="45px"
										mode="scaleToFill">
									</u--image>
								</view>
								<view style="width: 10px;">
								</view>
								<view style="width:100%;height: 45px;">
									<view>
										<view>
											<u--text lines="2" size="13" bold=true color="#272727"
												:text="item.title"></u--text>
										</view>
									</view>
									<view style="height: 5px;"></view>
									<view style="display: flex;">
									</view>
									<view style="display: flex;font-weight:bolder;color: #8f8f8f;font-size: 12px;">
										<view style="width: 75%;">
											<text>{{item.teacher_name}}</text>
										</view>
										<view style="width: 25%;">
											<view style="float: right;display: flex;padding-right: 5px">
												<u-button :text="item.feedbackStatus == 1?'已反馈':'填写问卷'" size="mini"
													color="linear-gradient(to right, rgb(0, 220, 62), rgb(0, 138, 151))"
													@click="fillIn(item)"></u-button>
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
						<view style="height: 10px;">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainFeedBackCourse 
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				courselist: [],
			};
		},
		methods: {
			fillIn(obj) {
				console.log(obj);
				if(obj.id == 0){
					uni.$u.route("/pages/crrt/feedback/prainfo", {
						params: JSON.stringify(obj)
					});
				}else{
					uni.$u.route("/pages/crrt/feedback/info", {
						params: JSON.stringify(obj)
					});
				}
			},
			queryCourse() {
				apiCrrtTrainFeedBackCourse({}).then(data => {
					console.log("课程", data)
					if (data) {
						this.courselist = data;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
		},
		onReady() {

		},
		onShow() {
			this.queryCourse();

		},
	};
</script>

<style lang="scss">
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
</style>