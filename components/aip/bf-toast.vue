<template>
	<view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		name: "bf-toast",
		props: {
			toastObject: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				border: false,
				type: 'success',
				title: toastObject.title,
				icon: true,
				position: 'center',
				url: '',
			}
		},
		onLoad() {

		},
		methods: {
			show() {
				this.$refs.uToast.show({
					title: this.title,
					position: this.position,
					type: this.type,
					icon: this.icon,
					url: this.url,
				});
			},
			hide() {
				this.$refs.uToast.hide();
			}
		}
	}
</script>

<style>
</style>
