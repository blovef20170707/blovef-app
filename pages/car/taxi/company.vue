<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;height: 100%;">
				<view style="height: 5px;">
				</view>
				<view style="display: flex;">
					<view style="width: 10px;"></view>
					<view style="height: 60px;">
						<u-avatar src="/static/crrt/logo.png" size="50" shape="square"></u-avatar>
					</view>
					<view style="width: 15px;"></view>
					<view style="height: 60px;width: 100%;">
						<view style="height: 20px;display: flex;">
							<view style="display: flex;width: 100%;">
								<view><text style="font-size: 16px;color: #272727;">重庆悦程运务发展有限公司</text>
								</view>
								<view style="width: 10px;"></view>
							</view>
						</view>
						<view style="height: 15px;">
						</view>
						<view><text>客户至上，敬业奉献</text></view>
					</view>
				</view>
				<view style="height: 10px;">
				</view>
				<view>
					<view style="padding-left:10px">
						<u--text size="13" color="#7d7e7f"
							text="重庆悦程运务发展有限公司成立于2014年08月22日,是一家专业、高效、诚信的出租车公司，以优质的服务、创新的技术和良好的企业形象赢得了广大市民的信赖与支持。在未来的发展中，悦程运务将继续秉承初心，不断提升服务品质，为更多乘客提供舒适、安全的出行体验。"></u--text>
					</view>
				</view>
				<view style="height: 20px;">
				</view>
				<view style="padding-left:10px">
					<view style="display: flex;">
						<view><u--image :showLoading="true" src="/static/crrt/ads.png" width="24px"
								height="24px"></u--image></view>
						<view style="width: 10px;"></view>
						<view class="ads">
							<view class="adsc">
								<u--text size="13" color="#7d7e7f" text="重庆市沙坪坝区杨梨路19号1幢26-11"></u--text>
							</view>
						</view>
					</view>
					<view style="height: 5px;">
					</view>
					<view style="display: flex;">
						<view><u--image :showLoading="true" src="/static/crrt/phone.png" width="24px"
								height="24px"></u--image></view>
						<view style="width: 10px;"></view>
						<view class="ads">
							<view class="adsc">
								<text style="color: #7d7e7f;font-size: 13px;" class="phone-number"
									@click="makeCall()">023-65568045</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 5px;">
			</view>

		</view>
		<u-toast ref="uToast"></u-toast>
	</view>


</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTrainee
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				model: {}
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			makeCall() {
				console.log("makeCall")
				const phoneNumber = '023-65568045'; // 这里替换成你要拨打的电话号码  
				uni.makePhoneCall({
					phoneNumber: phoneNumber,
					success: () => {
						console.log('拨打电话成功');
					},
					fail: (error) => {
						console.log('拨打电话失败', error);
					}
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

	.ads {
		display: flex;
		align-items: center;
		justify-content: center;
		// height: 100vh; /* 可根据需要调整容器高度 */  
	}

	.adsc {
		/* 子 div 的样式 */
	}
</style>