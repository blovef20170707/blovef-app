<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
				<u-checkbox @change="checkboxChange" v-model="item.checked"
					v-for="(item, index) in data" :key="index" :name="item.name">
					{{ item.name }}
				</u-checkbox>
			</u-checkbox-group>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-checkbox",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				data: this.control.controlVO.data
				// data: [{
				// 		name: '荔枝',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '香蕉',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '橙子',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '草莓',
				// 		checked: false,
				// 		disabled: false
				// 	}
				// ],
			}
		},
		onLoad() {
			
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log("checkboxChange",e);
			},
			
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				console.log("checkboxGroupChange:",e);
				if(this.control.controlVO.valueBatchSave){
					return;
				}
				let valueArray = [];
				e.forEach((item,index,array)=>{
				    valueArray.push(this.getValue(item));
				})
				let valueStr = valueArray.join();
				console.log("valueStr:",valueStr);
				var params = {
					"control_no":this.control.control_no,
					"value":valueStr,
					"valueSource":this.control.controlVO.valueSource
				}
				console.log("params:", params);
				this.$u.api.setControlContext(params).then(res => {
					console.log("setControlContextStart:", res);
					this.$u.toast(res.message);
				}).catch(res => {
					console.log("setControlContextException:", res);
					this.$u.toast("加载出错");
				}).finally(res => {
					console.log("setControlContextEnd");
				})
			},
			// 全选
			checkedAll() {
				this.data.map(val => {
					val.checked = true;
				})
			},
			getValue(name){
				for (var i=0;i<this.data.length;i++){
					if(this.data[i].name == name){
						return this.data[i].value;
					}
				}
			}
		}
	}
</script>

<style>
</style>
