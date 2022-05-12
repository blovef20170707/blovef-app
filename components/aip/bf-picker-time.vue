<!-- 地区 -->
<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input input-align="right" :border="border" type="select" :select-open="pickerShow" v-model="timeValue"
				:placeholder="`请选择${control.control_name}`" @click="pickerShow = true"></u-input>
		</u-form-item>
		<u-picker mode="time" v-model="pickerShow" @confirm="timeConfirm" :params="params"></u-picker>
	</view>
</template>

<script>
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
				timeValue:this.control.controlVO.value,
				params: this.control.controlVO.format
			}
		},
		onLoad() {

		},
		methods: {
			//选择地区回调
			timeConfirm(e) {
				if(this.control.controlVO.valueBatchSave){
					return;
				}
				console.log("timeConfirm:",e)
				let time = e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute;
				var params = {
					"control_no":this.control.control_no,
					"value":time,
					"valueSource":this.control.controlVO.valueSource
				}
				console.log("params:", params);
				this.$u.api.setControlContext(params).then(res => {
					console.log("setControlContextStart:", res);
					if(res.success){
						this.timeValue = time;
					}
					this.$u.toast(res.message);
				}).catch(res => {
					console.log("setControlContextException:", res);
					this.$u.toast("加载出错");
				}).finally(res => {
					console.log("setControlContextEnd");
				})
			},
		}
	}
</script>

<style>
</style>
