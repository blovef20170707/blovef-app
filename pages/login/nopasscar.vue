<template>
	<view class="lg">
		<u-toast ref="uToast"></u-toast>
		<view class="top">
		</view>
		<view class="logo">
			<view class="png">
				<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/car/logo.png" width="200px"
					height="200px" mode="aspectFit">
				</u--image>
			</view>
		</view>
		<view class="top">
		</view>
		<view class="mid">
			<view class="form">
				<view class="submit">
					<view>
						<u-button type="success" size="default" shape="square" :plain="false" :ripple="true"
							@click="submit">登录</u-button>
					</view>
					<view style="height: 5px;">
					</view>
					<view style="margin: 0 auto;text-align: center;">
						<text style="font-size: 13px; color: #7d7e7f;">登录后解锁更多权益</text>
					</view>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>

</template>

<script>
	import {
		apiWxLogin
	} from '@/common/http.api.js';
	import global from "@/common/global.js";
	export default {
		data() {
			return {
				border: true,
			}
		},
		onLoad() {
			console.log("onLoad")
		},
		onShow() {
			console.log("onShow")
		},
		onReady() {

		},
		methods: {
			submit() {
				console.log('submit');
				this.login();
			},
			login() {
				console.log("login")
				let _this = this;
				uni.login({
					success: function(res) {
						let code = res.code;
						let params = {
							"wx_code": code,
							"login_type": 'WECHAT',
							"app_system_key": global.appSystemKey,
							"wx_nick_name": '',
							"wx_avatar_url": '',
							"wx_gender": '',
							"wx_country": '',
							"wx_province": '',
							"wx_city": ''
						};
						console.log(params);
						apiWxLogin(params).then(data => {
							console.log("成功登录", data)
							uni.setStorageSync('token', data.token);
							console.log(uni.getStorageSync('token'))
							uni.$u.route({
								type: 'switchTab',
								url: '/pages/car/taxi/me'
							});
							console.log("成功登录完成")
						}).catch(exception => {
							console.log("exception", exception)
						}).finally(res => {

						})
						
						uni.geshou(){
							getphone();
						}
					},
					fail: function() {

					}
				})
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: white;
	}

	.top {
		height: 50px;
	}

	.logo {
		width: 100%;

		.png {
			width: 200px;
			height: 200px;
			margin: 0 auto;
		}
	}

	.mid {
		width: 100%;
		// height: 70%;
	}

	.form {
		width: 70%;
		margin: 0 auto;
	}

	.submit {
		width: 100%;
		height: 100%;
		padding-top: 25%;
	}
</style>