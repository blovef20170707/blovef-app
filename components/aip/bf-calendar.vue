<!-- 日历 -->
<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-input type="text" v-model="control.controlVO.value" input-align="right" :placeholder="`请输入${control.control_name}`"  @focus="showaCalendar"></u-input>
			<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode"
				:start-text="startText" :end-text="endText" :range-color="rangeColor"
				:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
			>
			</u-calendar>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-calendar",
		props: {
			control: Object
		},
		data() {
			return {
				show: false,
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				result: '请选择日期',
				// 这里应该后端指定
				mode: 'range',
				startText: '开始',
				endText: '结束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
			}
		},
		onLoad() {

		},
		methods: {
			showaCalendar(){
				this.show = true;
			}
			change(e) {
				if (this.mode == 'range') {
					this.control.controlVO.value  = e.startDate + " - " + e.endDate;
				} else {
					this.control.controlVO.value  = e.result;
				}
			}
		}
	}
</script>

<style>
</style>
