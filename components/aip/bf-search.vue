<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-search v-model="control.controlVO.value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
			:show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-search",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				inputAlign: 'left'
			}
		},
		onLoad() {

		},
		methods: {
			clear() {
				// console.log(this.value);
			}
		}
	}
</script>

<style>
</style>
