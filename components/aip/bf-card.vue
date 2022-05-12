<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input type="text" v-model="control.controlVO.value" input-align="right" :placeholder="`请输入${control.control_name}`"></u-input>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-text",
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
			init(){

			}
		}
	}
</script>

<style>
</style>
