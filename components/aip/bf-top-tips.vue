<template>
	<view>
		<u-form-item :label-position="labelPosition" :label="control.control_name" :label-width="labelWidth">
			<u-top-tips ref="uTips"></u-top-tips>
		</u-form-item>
	</view>
</template>

<script>
	export default {
		name: "bf-toast",
		props: {
			topTipsObject: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				duration: 2000,
				title: topTipsObject.title,
				type: 'primary'
			}
		},
		onLoad() {

		},
		methods: {
			showTips() {
				this.$refs.uTips.show({
					duration: this.duration,
					title: this.title,
					type: this.type
				});
			},
		}
	}
</script>

<style>
</style>
