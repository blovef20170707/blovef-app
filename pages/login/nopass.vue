<template>
	<view class="lg">
		<u-toast ref="uToast"></u-toast>
		<view class="top">
		</view>
		<view class="logo">
			<view class="png">
				<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/logo.png"
					width="200px" height="200px" mode="aspectFit">
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
				uni.getUserProfile({
					desc: '授权获取你的昵称与头像',
					success: function(resp) {
						uni.login({
							success: function(res) {
								let code = res.code;
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl;
								let country = resp.userInfo.country;
								let province = resp.userInfo.province;
								let city = resp.userInfo.city;
								let gender = resp.userInfo.gender;
								let params = {
									"wx_code": code,
									"login_type": 'WECHAT',
									"app_system_key": '2b8b0222-093b-11ee-8b05-fa163e97acdc',
									"wx_nick_name": nickName,
									"wx_avatar_url": avatarUrl,
									"wx_gender": gender,
									"wx_country": country,
									"wx_province": province,
									"wx_city": city
								};
								console.log(params);
								apiWxLogin(params).then(data => {
									console.log("成功登录", data)
									uni.setStorageSync('token', data.token);
									console.log(uni.getStorageSync('token'))
									uni.$u.route({
										type: 'switchTab',
										url: '/pages/crrt/index/index'
									});
									console.log("成功登录完成")
								}).catch(exception => {
									console.log("exception", exception)
								}).finally(res => {

								})
							},
							fail: function() {

							}
						})
					},
					fail: function() {
						console.log("fail getUserProfile");
						_this.$refs.uToast.show({
							message: '登录失败,请允许授权',
							type: 'error'
						})
					}
				})
			},
		}
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