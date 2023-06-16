<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view>
				<view>
					<view style="" v-for="(item,index) in list" :key="index">
						<view style="background-color: white;border-radius:5px;">
							<view style="height: 5px;">
							</view>
							<view style="display: flex;">
								<view style="width: 2px;">
								</view>
								<view style="display: flex;justify-content: center;align-items: center;">
									<view>
									<u--image src="/static/crrt/examination.png" width="45px" height="45px"
										mode="scaleToFill">
									</u--image>
									</view>
								</view>
								<view style="width: 10px;">
								</view>
								<view style="width:100%;">
									<view style="display: flex;">
										<view style="width: 75%;">
											<u--text lines="2" size="13" bold=true color="#272727"
												:text="item.title"></u--text>
										</view>
										<view style="width: 25%;">
											<view style="float: right;display: flex;padding-right: 5px">
												<u--text lines="2" size="12" bold=true :color="item.examination_status_color"
													:text="item.examination_status_remark"></u--text>
											</view>
										</view>
									</view>
									<view style="height: 2px;"></view>
									<view style="display: flex;height: 30px;">
										<view v-for="(tagitem,tagindex) in item.tag" :key="tagindex">
											<u-tag :text="tagitem.name" plain size="mini" :bgColor="tagitem.color"
												color="#ffffff" borderColor="#ffffff" plain plainFill></u-tag>
											<view style="width:2px;"></view>
										</view>
									</view>
									<view style="display: flex;font-weight:bolder;color: #8f8f8f;font-size: 12px;">
										<view style="width: 75%;">
											<text>时长:{{item.time}}分钟</text>
										</view>
										<view style="width: 25%;">
											<view style="float: right;display: flex;padding-right: 5px">
												<view v-if="item.item.trainee_examination_status == 0">
													<u-button text="答题" size="mini"
													color="linear-gradient(to right, rgb(0, 220, 62), rgb(0, 138, 151))"
													@click="fillIn(item)"></u-button>
												</view>
												<view v-if="item.trainee_examination_status == 1">
													<text  style="font-weight: bold;font-size: 12px;color:#30db70;">已交卷</text>
												</view>
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
		apiCrrtTrainExamination,apiCrrtTrainExaminationCreate
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				list: [],
			};
		},
		methods: {
			fillIn(obj) {
				console.log(obj);
				apiCrrtTrainExaminationCreate({"examination_id":obj.id}).then(data => {
					console.log("创建考试", data)
					uni.$u.route("/pages/crrt/examination/info", {
						params: JSON.stringify(obj)
					});
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
			
				})
				
			},
			queryExamination() {
				apiCrrtTrainExamination({}).then(data => {
					console.log("考试", data)
					if (data) {
						this.list = data;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
			
				})
			}
		},
		onReady() {
		
		},
		onShow() {
			this.queryExamination();
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