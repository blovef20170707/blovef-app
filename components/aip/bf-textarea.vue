<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name">
			<u-input type="textarea" :border="border" :placeholder="`请输入${control.control_name}`" v-model="control.controlVO.value" />
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-textarea",
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
