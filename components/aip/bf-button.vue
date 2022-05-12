<template>
	<view>
		<u-form-item :label-position="labelPosition"  :label="control.control_name" :label-width="labelWidth">
			<u-button slot="right" type="success" size="mini" :ripple="true" @click="click()">{{control.control_name}}</u-button>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-button",
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
			click() {
				if(this.control.control_type == "TABLE-LIST"){
					let route_params = {};
					route_params.control_no = this.control.control_no;
					route_params.dataScopeVO = this.control.controlVO.dataScopeVO;
					let route_path =  this.control.controlVO.routePath == ''?"/pages/page/card":this.control.controlVO.routePath;
					this.$u.route(route_path, {
						params: JSON.stringify(route_params)
					});
				}
			}
		}
	}
</script>

<style>
</style>
