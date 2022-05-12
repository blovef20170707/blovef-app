<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-radio-group v-model="control.controlVO.value" @change="radioGroupChange" :width="radioCheckWidth"
				:wrap="radioCheckWrap">
				<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">
					{{ item.name }}</u-radio>
			</u-radio-group>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-radio",
		props: {
			control: Object,
			checkValue: '',
			border: false,
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				radioList: [{
						name: '支付宝',
						checked: true,
						disabled: false
					},
					{
						name: '微信',
						checked: false,
						disabled: false
					},
					{
						name: '银联',
						checked: false,
						disabled: false
					},
					{
						name: '现金',
						checked: false,
						disabled: false
					}
				],
			}
		},
		onLoad() {
			// radio选择发生变化
			radioGroupChange(e) {
				this.checkValue = e;
			},
		},
		methods: {

		}
	}
</script>

<style>
</style>
