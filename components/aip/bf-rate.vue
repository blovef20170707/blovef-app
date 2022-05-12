<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-rate v-model="control.controlVO.value" :count="count" @change="change" :active-color="activeColor" :inaction-color="inactiveColor" :disabled="disabled"></u-rate>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-rate",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				activeColor: '#FA3534',
				inactiveColor: '#b2b2b2',
				disabled: false,
				count: 5,
				customIcon: false,
				plain: false,
				value: 0,
				colors: [],
				icons: []
			}
		},
		onLoad() {

		},
		methods: {
			change(val) {
				// console.log(val);
			}
		}
	}
</script>

<style>
</style>
