<template>
	<view class="wrap">
		<view class="container">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view>
					<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/dev.png">
					</u--image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	export default {
		data() {
			return {
				menuContext: {}
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: white;
	}

	.wrap {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		color: #7d7e7f;
	}

	.container {
		width: 97%;
	}
</style>