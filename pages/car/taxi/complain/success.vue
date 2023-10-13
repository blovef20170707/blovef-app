<template>
	<view class="wrap">
		<view class="container">
			<view style="display: flex;justify-content: center;align-items: center;">
				<view class="mid">
					<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/car/cs.png">
					</u--image>
					<!-- <view class="btn" @click="tome()"><text class="wb">确 认</text></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			tome() {
				uni.$u.route({
					type: 'switchTab',
					url: '/pages/car/taxi/me'
				});
			}
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

	.mid {
		height: 100%;
		// width: 70%;
		margin: 0 auto;
	}

	.wb {
		font-size: 18px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		vertical-align: top;
	}

	.btn {
		margin-top: 20px;
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		width: 100%;
		height: 40px;
		opacity: 1;
		border-radius: 55px;
		background: linear-gradient(160.78deg, rgba(29, 178, 255, 1) 0%, rgba(4, 123, 255, 1) 100%);
	}
</style>