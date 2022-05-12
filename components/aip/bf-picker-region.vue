<!-- 地区 -->
<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input :border="border" type="select" :select-open="pickerShow" v-model="control.controlVO.value"
				:placeholder="`请选择${control.control_name}`" @click="pickerShow = true"></u-input>
		</u-form-item>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		name: "bf-picker-region",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				pickerShow: false,
			}
		},
		onLoad() {

		},
		methods: {
			//选择地区回调
			regionConfirm(e) {
				this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
		}
	}
</script>

<style>
</style>
