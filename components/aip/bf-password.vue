<template>
	<view>
		<u-form-item :label-position="labelPosition" :label-width="labelWidth" :label="control.control_name">
			<u-input :password-icon="true" type="password" placeholder="`请输入${control.control_name}`"></u-input>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-password",
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
