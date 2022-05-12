<template name="bf-pagey">
	<view :style="[{height:'100vh'}]">
		<view v-for="(viewContextVO, viewContextVOIndex) in pageContextData.viewContextVOList" :key="viewContextVOIndex"
			:data-id="viewContextVOIndex">
			<view class="view-shadow">{{ viewContextVO.view_name }}</view>
			<block v-for="(control, controlIndex) in viewContextVO.controlContextVOList" :key="controlIndex">
				<bf-text v-if="control.control_type == 'TEXT'" :control="control"></bf-text>
			</block>
		</view>
	</view>
</template>

<script>
	import bfText from '../../components/aip/bf-text.vue';
	export default {
		name: "bf-pagey",
		props: {
			pageContextData: Object
		},
		components: {
			bfText,
		},
		data() {
			return {
				viewIndex: 0,
				errorType: ['message'],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-shadow {
		// background-color: $u-type-primary;
		// box-shadow:0px 1px 0px $u-type-primary;
		// font-weight: bold;
		border-bottom:1px solid #d9d9d9;
		color: #d9d9d9;
	}
</style>
