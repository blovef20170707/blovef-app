<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="height: 20px;">
				<view style="display: flex;">
					<view style="width: 75%;">
						<text v-if="disabled==true"
							style="font-weight: bold;font-size: 13px;color: #41a5ee;font-style:italic;text-decoration:underline;">考试得分:{{data.grade}}</text>
						<text v-if="disabled==false"
							style="font-weight: bold;font-size: 13px;color: #e53e30;">温馨提示:记得交卷</text>
					</view>
					<view style="width: 25%;">
						<view style="float: right;display: flex;">
							<view><u-button v-if="disabled==false" text="交卷" size="mini" shape="circle"
									@click="show = true" color="#3f85ff"></u-button></view>
							<view><text v-if="disabled==true"
									style="font-weight: bold;font-size: 13px;color:#3f85ff;">已交卷</text></view>
						</view>
					</view>
					<!-- <view v-if="disabled==true" style="width: 25%;text-align: right;">
						
					</view> -->
				</view>
			</view>
			<view style="height: 10px;">
			</view>

			<view v-for="(topic, topicIndex) in data.topics" :key="topicIndex">
				<u--text :text="topic.title" bold size='13'></u--text>
				<view style="height: 5px;">
				</view>
				<view class="">
					<view v-if="topic.type == 0" class="">
						<u-radio-group :disabled="disabled" :name="topic.id" v-model="topic.answer" placement="column"
							@change="groupChange(topic)">
							<u-radio labelSize='12' labelColor='#7d7e7f'
								:customStyle="{marginBottom: '12px',fontSize: '12px'}"
								v-for="(item, index) in topic.options" :key="index" :label="item.label"
								:name="item.name" @change="radioChange" activeColor="#41a863">
							</u-radio>
						</u-radio-group>
					</view>
					<view v-if="topic.type == 1" class="">
						<u-checkbox-group :disabled="disabled" v-model="topic.checkAnswer" :name="topic.id"
							placement="column" @change="groupCheckChange($event, topic)">
							<u-checkbox labelSize='12' :customStyle="{marginBottom: '12px',fontSize: '12px'}"
								v-for="(item, index) in topic.options" :key="index" :label="item.label"
								:name="item.name">
							</u-checkbox>
						</u-checkbox-group>

						<!-- <checkbox-group @change="groupCheckChange(topic)"  v-model="topic.checkAnswer">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in topic.options" :key="index">
								<view>
									<checkbox :value="item.name" :checked="item.checked" />
								</view>
								<view>{{item.label}}</view>
							</label>
						</checkbox-group> -->


					</view>
					<view class="height: 2px"></view>
					<view v-if="topic.correct==0" style="font-size: 12px;"><text decode
							style="color: #e53e30;">{{verify}}</text><text>正确答案:{{topic.topic_answer}}</text></view>
				</view>
				<view style="height: 10px;">
				</view>
			</view>
			<u-modal :show="show" content='是否确认交卷?' showCancelButton="true" @confirm="end()"
				@cancel="show=false"></u-modal>
			<u-toast ref="uToast" />
		</view>

	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCarTaxiEmployeeExamination,
		apiCarTaxiExaminationEnd,
		apiCarTaxiExaminationTopic
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				show: false,
				verify: '答错了！&ensp;&ensp;',
				examination_id: '',
				eid: '',
				disabled: -1,
				data: {}
			};
		},
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
				apiCarTaxiExaminationTopic({
					"topic_id": n.id,
					"examination_id": this.examination_id,
					"answer": n.answer
				}).then(data => {
					console.log("答题", data)
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			groupCheckChange(name,item) {
				console.log('groupCheckChange', name);
				console.log('groupCheckChange', item);
				console.log('groupCheckChange', item.checkAnswer);
				apiCarTaxiExaminationTopic({
					"topic_id": item.id,
					"examination_id": this.examination_id,
					"answer": name.join(',')
				}).then(data => {
					console.log("答题", data)
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
				
				})
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			end() {
				apiCarTaxiExaminationEnd({
					"examination_id": this.examination_id
				}).then(data => {
					console.log("交卷", data);
					this.disabled = true;
					this.data.grade = data;
					this.queryCarTaxiEmployeeExamination();
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
					
				})
				this.show = false;
			},
			queryCarTaxiEmployeeExamination() {
				apiCarTaxiEmployeeExamination({
					params: {
						"examination_id": this.examination_id,
						"eid":this.eid
					}
				}).then(data => {
					console.log("考试详情", data)
					if (data) {
						this.data = data;
						if (this.data.trainee_examination_status == 1) {
							this.disabled = true;
						} else {
							this.disabled = false;
						}
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			}
		},
		onReady() {

		},
		// 第一次进入加载，参数可来源于菜单
		onLoad(option) {
			console.log("onLoad option", option);
			this.params = JSON.parse(option.params);
		},
		// 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow(option) {
			console.log("onShow params", this.params);
			this.examination_id = this.params.id
			this.eid = this.params.eid;
			console.log(this.examination_id);
			this.queryCarTaxiEmployeeExamination();
		},
	};
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
		width: 97%;
	}
</style>