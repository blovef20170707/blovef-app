<template>
	<view>
		<u-form-item borderBottom :label="control.control_name" @click="selectShow = true; hideKeyboard()">
			<u--input inputAlign="right" border="none" v-model="selectLable"
				:placeholder="`请选择${control.control_name}`">
			</u--input>
			<u-icon slot="right" name="arrow-right"></u-icon>
		</u-form-item>
		<u-action-sheet :show="selectShow" :actions="selectList" :placeholder="`请选择${control.control_name}`"
			@close="selectShow = false" @select="selectConfirm"></u-action-sheet>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiSetControlContext
	} from '@/common/http.api.js';
	export default {
		name: "bf-select",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				selectShow: false,
				selectList: this.control.controlVO.data,
				selectValue: this.control.controlVO.value,
				selectLable: this.control.controlVO.label
			}
		},
		onLoad() {

		},
		methods: {
			hideKeyboard() {
				uni.hideKeyboard()
			},
			selectConfirm(e) {
				console.log("selectConfirm:", e)
				this.selectValue = e.value;
				if (this.control.controlVO.valueBatchSave) {
					this.selectLable = e.label;
					return;
				}
				var params = {
					"control_no": this.control.control_no,
					"value": this.selectValue,
					"valueSource": this.control.controlVO.valueSource
				}
				console.log("params:", params);
				apiSetControlContext(params).then(data => {
					console.log("setControlContext Success:", data);
					this.selectLable = e.label;
				}).catch(exception => {
					console.log("setControlContext exception:", exception);
				}).finally(res => {

				})
			}
		}
	}
</script>
<style>
</style>
