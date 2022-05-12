<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-alert-tips @close="close" :closeAble="closeAble" :show="show" @click="click"
			:type="type" :title="title" :description="description" :showIcon="showIcon"></u-alert-tips>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-alert-tips",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				title: '提示',
				description: control.controlVO.value,
				show: true,
				closeAble: true,
				showIcon: true,
				type: 'warning',
			}
		},
		onLoad() {

		},
		methods: {
			click() {
				
			},
		}
	}
</script>

<style>
</style>
