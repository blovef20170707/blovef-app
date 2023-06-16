<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view class="u-demo-block">
				<view class="u-demo-block__content">
					<view v-for="(item,index) in list" :key="index">
						<view class="album">
							<view class="album__avatar">
								<u-avatar :src="item.asrc" size="50"></u-avatar>
							</view>
							<view class="album__content">
								<view style="display: flex;">
									<view style="width: 75%;">
										<u--text :text="item.name" color="#000000" bold size="17"></u--text>
									</view>
									<view style="width: 25%;display: flex;float: right;color: #db87e9;">
										<u-button text="关注" size="mini" shape="circle"
											color="linear-gradient(to right, rgb(198, 201, 216), rgb(208, 142, 255))"></u-button>
									</view>
								</view>
								<view :style="{marginBottom: '8px'}">
									<u--text :text="item.content" color="#7d7e7f"></u--text>
								</view>
								<u-album :urls="item.urls" multipleSize="68"></u-album>
								<view style="height: 8px;">
								</view>
								<view style="display: flex;">
									<view style="width: 75%;"><text style="font-size: 14px;">{{item.time}}</text></view>
									<view style="width: 25%;">
										<view style="display: flex;float: right;">
											<u-icon size="17" name="/static/crrt/pl.png"></u-icon>
											<view style="width: 15px;"></view>
											<u-icon size="17" name="/static/crrt/dz.png"></u-icon>
										</view>
									</view>
								</view>
								<view style="height: 20px;">
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
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
			if (!this.token) {
				uni.$u.route('/pages/login/nopass');
			} else {
				this.getCircle();
			}
		},
		
		methods: {
			onTabItemTap() {
				console.log("sss")
			},
			getCircle() {
				apiCrrtTrainCircleIndex({}).then(data => {
					console.log("首页加载", data)
					this.list = data.list;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
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

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>