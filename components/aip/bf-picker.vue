<template>
	<view>
		<u-form-item borderBottom :label="control.control_name">
			<u--input inputAlign="right" border="none" v-model="selectLable" :placeholder="`请选择${control.control_name}`"
				@click="selectShow = true">
			</u--input>
		</u-form-item>
		<u-picker :show="selectShow" :columns="selectList" @confirm="selectConfirm"></u-picker>
	</view>
</template>

<script>
	export default {
		name: "bf-picker",
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
			selectConfirm(e) {
				console.log("selectConfirm:", e)
				this.selectValue = e[0].value;
				if (this.control.controlVO.valueBatchSave) {
					this.selectLable = e[0].label;
					return;
				}
				var params = {
					"control_no": this.control.control_no,
					"value": this.selectValue,
					"valueSource": this.control.controlVO.valueSource
				}
				console.log("params:", params);
				this.$u.api.setControlContext(params).then(res => {
					console.log("setControlContextStart:", res);
					if (res.success) {
						this.selectLable = e[0].label;
					}
					this.$u.toast(res.message);
				}).catch(res => {
					console.log("setControlContextException:", res);
					this.$u.toast("加载出错");
				}).finally(res => {
					console.log("setControlContextEnd");
				})
			}
		}
	}
</script>
<style>
</style>
