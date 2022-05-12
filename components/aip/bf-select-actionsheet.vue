<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input :placeholder="`请选择${control.control_name}`" :border="border" v-model="control.controlVO.value" type="select" 
				 :select-open="actionSheetShow" @click="actionSheetShow = true"></u-input>
		</u-form-item>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		name: "bf-select-actionsheet",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				actionSheetShow: false,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
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
