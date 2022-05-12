<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-slider :step="step" :height="height" :block-width="blockWidth"
				:active-color="activeColor" :value="30" 
				:use-slot="useSlot" v-model="control.controlVO.value"
				:min="min" :max="max" 
				@end="end"
				@moving="moving"
			>
			<!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
			<view class="" v-if="useSlot">
				<view class="badge-button">
					{{control.controlVO.value}}
				</view>
			</view>
			<!-- #endif -->
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-slider",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				value: 30,
				useSlot: true,
				setp: 1,
				activeColor: '#2979ff',
				height: 6,
				blockWidth: 30,
				step: 1,
				min: 0,
				max: 100
			}
		},
		onLoad() {

		},
		methods: {
			end() {
				// console.log('end');
			},
			moving() {
				// console.log('moving');
			}
		}
	}
</script>

<style scoped lang="scss">
	.badge-button {
		padding: 4rpx 6rpx;
		background-color: $u-type-error;
		color: #fff;
		border-radius: 10rpx;
		font-size: 22rpx;
		line-height: 1;
	}
</style>
