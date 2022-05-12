<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-number-box v-model="control.controlVO.value" :bg-color="bgColor" :color="color" :min="0"
			:step="step" :disabled="disabled" @change="change" @focus="focus"></u-number-box>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-number-box",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				value: 1,
				bgColor: "#F2F3F5",
				color: '#323233',
				disabled: false,
				step: 1,
			}
		},
		onLoad() {

		},
		methods: {
			change(e) {
				//console.log(e.value);
			},
			focus() {
				console.log('focus');
			}
		}
	}
</script>

<style>
</style>
