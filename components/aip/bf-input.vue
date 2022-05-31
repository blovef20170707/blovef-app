<template>
	<view>
		<u-form-item borderBottom :label="control.control_name">
			<u--input :type="inputType" @blur="setValue()" v-model="control.controlVO.value" inputAlign="right"
				border="none" :placeholder="`请输入${control.control_name}`"></u--input>
		</u-form-item>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	export default {
		name: "bf-input",
		props: {
			control: Object,
			inputType: ""
		},
		data() {
			return {
				labelWidth: "200",
				border: false,
			}
		},
		onLoad() {
			console.log("input onLoad:")
		},
		onShow() {
			console.log("input onShow:")
		},
		methods: {
			setValue(type) {
				console.log("inputType:",this.inputType)
				if (this.control.controlVO.valueBatchSave) {
					return;
				}
				var params = {
					"control_no": this.control.control_no,
					"value": this.control.controlVO.value,
					"valueSource": this.control.controlVO.valueSource
				}
				frame.setControlValue(params);
			},
		}
	}
</script>

<style>
</style>
