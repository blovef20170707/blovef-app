<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-switch v-model="control.controlVO.value" slot="right"></u-switch>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-switch",
		props: {
			control: Object
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

		}
	}
</script>

<style>
</style>
