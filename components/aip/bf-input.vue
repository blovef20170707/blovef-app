<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input :type="inputType" @blur="setValue()" v-model="control.controlVO.value" input-align="right" :placeholder="`请输入${control.control_name}`"></u-input>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-input",
		props: {
			control: Object,
			inputType: ""
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
			}
		},
		onLoad() {

		},
		methods: {
			setValue(type) {
				if(this.control.controlVO.valueBatchSave){
					return;
				}
				var params = {
					"control_no":this.control.control_no,
					"value":this.control.controlVO.value,
					"valueSource":this.control.controlVO.valueSource
				}
				console.log("params:", params);
				this.$u.api.setControlContext(params).then(res => {
					console.log("setControlContextStart:", res);
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
