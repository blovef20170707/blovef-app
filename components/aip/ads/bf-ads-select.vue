<template>
	<view style="width: 200px;">
		<u-form-item borderBottom :label="control.control_name" :labelWidth="labelWidth"
			@click="selectShow = true; hideKeyboard()">
			<u--input v-model="selectLable" disabled disabledColor="#ffffff" :placeholder="`请选择${control.control_name}`"
				border="none"></u--input>
			<u-icon slot="right" name="arrow-right"></u-icon>
		</u-form-item>
		<u-action-sheet :show="selectShow" :actions="selectList" :title="`请选择${control.control_name}`"
			@close="selectShow = false" @select="selectConfirm"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		name: "bf-ads-select",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				selectShow: false,
				selectList: this.control.data,
				selectValue: '',
				selectLable: '',
				key: this.control.key

			}
		},
		onLoad() {

		},
		methods: {
			selectConfirm(e) {
				console.log(e);
				this.selectValue = e.value;
				this.selectLable = e.label;
				let json = {}
				json.key = this.key;
				json.value = this.selectValue;
				json.operator = "0";
				console.log("json:", json)
				this.$emit('setAdsJson', json);
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>
<style>
</style>
