<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 10px;">
			</view>
			<view class="u-demo-block">
				<view v-for="(item,index) in list" :key="index" class="u-demo-block__content">
					<view>
						<view class="album">
							<view class="album__avatar">
								<u-avatar :src="item.asrc" size="50"></u-avatar>
							</view>
							<view class="album__content">

								<view style="display: flex;">
									<view style="width: 75%;">
										<u--text :text="item.name" color="#000000" bold size="17"></u--text>
									</view>
									<view style="width: 25%;color: #db87e9;">
										<view style="float: right;display: flex;padding-right: 5px;">
											<!-- <u--image src="/static/crrt/authority1.png" width="40px" height="20px"
												mode="scaleToFill"></u--image> -->
											<u-button text="官方" size="mini" shape="square"
												color="linear-gradient(to right, rgb(198, 201, 216), rgb(208, 142, 255))"></u-button>
										</view>
									</view>
								</view>
								<view style="height: 5px;">
								</view>
								<view :style="{marginBottom: '8px'}">
									<u--text :text="item.content" color="#7d7e7f"></u--text>
								</view>
								<view v-if="item.type == 0">
									<u-album :urls="item.urls" multipleSize="68"></u-album>
								</view>
								<view v-if="item.type == 1">
									<video style="width: 95%;height: 180px;" :id="item.id" :src="item.vurl"
										@error="videoErrorCallback" controls></video>
								</view>
								<view style="height: 8px;">
								</view>
								<view style="display: flex;">
									<view style="width: 75%;"><text style="font-size: 14px;">{{item.time}}</text></view>
									<view style="width: 25%;">
										<view style="display: flex;float: right;">
											<u-icon size="17" name="/static/crrt/pl.png" @click="pl()"></u-icon>
											<view style="width: 15px;"></view>
											<u-icon size="17" name="/static/crrt/dz.png" @click="pl()"></u-icon>
										</view>
									</view>
								</view>

							</view>
						</view>
					</view>
					<view style="height: 10px;border-bottom:1px solid #e7e7e7">
					</view>
					<view style="height: 10px;">
					</view>
				</view>
			</view>
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
				token: '',
				list: []
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
		},

		methods: {
			onTabItemTap() {
				console.log('onTabItemTap');
				if (!this.token) {
					uni.$u.route('/pages/login/login');
				} else {
					this.getCircle();
				}
			},
			getCircle() {
				apiCrrtTrainCircleIndex({}).then(data => {
					console.log("首页加载", data)
					this.list = data.list;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			pl() {
				this.$refs.uToast.show({
					message: '该功能开发中',
					type: 'warning'
				});
			},
			videoErrorCallback: function(e) {
				console.log(e)
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
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

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 2px;
			flex: 1;
		}
	}

	.u-demo-block {}
</style>