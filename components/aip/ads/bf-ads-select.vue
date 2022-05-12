<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth"
			prop="required">
			<u-input input-align="right" :border="border" type="select" :select-open="selectShow"
				v-model="selectLable" :placeholder="`请选择${control.control_name}`" @click="selectShow = true">
			</u-input>
		</u-form-item>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
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
				key:this.control.key
				
			}
		},
		onLoad() {
			
		},
		methods: {
			selectConfirm(e) {
				this.selectValue = e[0].value;
				this.selectLable = e[0].label;
				let json = {}
				json.key = this.key;
				json.value = this.selectValue;
				json.operator = "0"; 
				console.log("json:",json)
				this.$emit('setAdsJson', json);
			}
		}
	}
</script>
<style>
</style>
