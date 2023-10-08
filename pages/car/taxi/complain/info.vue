<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model" ref="form1" labelWidth="auto">
					<u-form-item required="true" label="车牌号码" prop="complainInfo.plate" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.plate" border="none"
							inputAlign="right" placeholder="请输入车牌号码"></u--input>
					</u-form-item>
					<u-form-item required="true" label="乘客姓名" prop="complainInfo.name" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.name" border="none"
							inputAlign="right" placeholder="请输入乘客姓名"></u--input>
					</u-form-item>
					<u-form-item required="true" label="联系电话" prop="complainInfo.phone" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.phone" type="number" border="none"
							inputAlign="right" placeholder="请输入电话"></u--input>
					</u-form-item>
					<u-form-item required="true" label="乘车时间" prop="complainInfo.busTime" borderBottom ref="item1">
						<u--input v-model="model.complainInfo.bus_time" disabled disabledColor="#ffffff"
							placeholder="请选择乘车时间" inputAlign="right" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required="true" label="车费" prop="complainInfo.fare" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.fare" type="number"
							inputAlign="right" border="none" placeholder="请输入车费"></u--input>
					</u-form-item>
					<u-form-item labelPosition="top" required="true" label="投诉原因" prop="complainInfo.reason"
						ref="item3">
						<!-- <u-checkbox-group :disabled="disabled" v-model="model.complainInfo.reason" shape="square"
							@change="reasonChange" iconPlacement="right" placement="column" borderBottom>
							<u-checkbox :customStyle="{marginTop : '8px'}" v-for="(item, index) in model.complainInfo.reasonList"
								:key="index" :label="item.name" :name="item.name" :checked="item.checked">
							</u-checkbox>
						</u-checkbox-group> -->
						<u--text :text="model.complainInfo.reasons"></u--text>
					</u-form-item>
					<u-form-item label="建议反馈" borderBottom>
						<u--textarea :disabled="disabled" placeholder="请输入建议反馈" border="bottom"
							v-model="model.complainInfo.remark" count></u--textarea>
					</u-form-item>
				</u--form>
			</view>
			<view style="height: 10px;">
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import dragButton from "@/components/drag-button/drag-button.vue";
	import {
		apiCarTaxiComplainInfo
	} from '@/common/http.api.js';
	export default {
		components: {
			dragButton
		},
		data() {
			return {
				showBusTime: false,
				busTime: Number(new Date()),
				disabled: true,
				token: '',
				params: '',
				model: {
					complainInfo: {
						name: '',
						plate: '',
						phone: '',
						bus_time: '',
						fare: '',
						reason: [],
						reasonList: [],
						reasons: '',
						remark: '',
						submitStatus: 0
					},
				},
			};
		},
		methods: {
			queryComplainInfo() {
				apiCarTaxiComplainInfo({
					params: {
						"complain_id": this.complain_id
					}
				}).then(data => {
					console.log("详情", data)
					if (data) {
						this.model.complainInfo = data;
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
		onShow(option) {
			console.log("onShow params", this.params);
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			this.complain_id = this.params.id
			this.queryComplainInfo();
		}
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