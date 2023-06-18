<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<u-list @scrolltolower="scrolltolower(3)">
				<u-list-item>
					<u-cell style="padding: 0px;" title="2023专科班课表" isLink @click="openAtt()">
						<u-avatar slot="icon" shape="square" size="35" src="/static/crrt/pdf.png"></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainCircleIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			openAtt() {
				uni.downloadFile({
					url: "https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/timetable.pdf",
					success: function(res) {
						console.log(res);
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
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
		// background-color: white;
	}

	.container {
		width: 97%;
	}
</style>