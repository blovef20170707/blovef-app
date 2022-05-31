<!-- 地区 -->
<template>
	<view>
		<u-form-item :label="control.control_name" borderBottom @click="pickerShow = true; hideKeyboard()">
			<u--input v-model="timeValue" disabled disabledColor="#ffffff" :placeholder="`请选择${control.control_name}`"
				border="none">
			</u--input>
			<u-icon slot="right" name="arrow-right"></u-icon>
		</u-form-item>
		<u-datetime-picker :mode="mode" :show="pickerShow" :value="timeValue" closeOnClickOverlay 
			@confirm="timeConfirm" @cancel="timeClose" @close="timeClose"></u-datetime-picker>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiSetControlContext
	} from '@/common/http.api.js';
	export default {
		name: "bf-picker-time",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				pickerShow: false,
				timeValue: this.control.controlVO.value,
				format: this.control.controlVO.format,
				mode: 'datetime'
			}
		},
		onReady() {
			console.log("ready");
		},
		onLoad() {

		},
		methods: {
			hideKeyboard() {
				uni.hideKeyboard();
			},
			timeClose() {
				this.pickerShow = false
			},
			//选择地区回调
			timeConfirm(e) {
				console.log(e.value);
				console.log(this.timeValue);
				if(e.value == this.timeValue){
					this.pickerShow = false
					return;
				}
				let value =  frame.getTimeValue(this.mode,e.value);
				if (this.control.controlVO.valueBatchSave) {
					return;
				}
				var params = {
					"control_no": this.control.control_no,
					"value": value,
					"valueSource": this.control.controlVO.valueSource
				}
				console.log("params:", params);
				apiSetControlContext(params).then(data => {
					console.log("setControlContext Success:", data);
					this.timeValue = value;
				}).catch(exception => {
					console.log("setControlContext exception:", exception);
				}).finally(res => {
					this.pickerShow = false
				})
			},
		}
	}
</script>

<style>
</style>
