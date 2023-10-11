<template>
	<view class="wrap">
		<view class="container">
			<u-toast ref="uToast"></u-toast>
			<view class="top">
				<view class="login"><text>欢迎登录</text></view>
				<view class="logina"><text>重庆市新桥医院专科教培平台</text></view>
			</view>
			<view class="logo">
				<view class="png">
					<u--image src="https://tongda-ms-oss.obs.cn-north-4.myhuaweicloud.com/blovef/crrt/logo2.png"
						width="200px" height="200px" mode="aspectFit">
					</u--image>
				</view>
			</view>
			<view class="top1">
			</view>
			<view class="mid">
				<view class="form">
					<view class="submit">
						<view style="height: 70%;">
							<view class="btn">
								<text class="loginc" @click="submit()">一键登录</text>
							</view>
							<view style="height: 5px;">
							</view>
							<view style="margin: 0 auto;text-align: center;">
								<text style="font-size: 12px; color: #7d7e7f;">点击登录即代表你已阅读并同意</text>
							</view>
							<view style="margin: 0 auto;text-align: center;">
								<text style="font-size: 12px; color: rgba(35, 70, 175, 1);">《个人用户服务协议》</text>
							</view>
						</view>
						<view style="height: 30%;">
							<view style="height: 40%;">

							</view>
							<view class="bottom">
								<text class="rz" @click="application()">立即报名</text> <text class="rz" @click="auth()">员工认证</text>
							</view>
						</view>
					</view>
				</view>
				<u-toast ref="uToast" />
			</view>
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
			application(){
				uni.$u.route('/pages/crrt/application/index');
			},
			auth(){
				uni.$u.route('/pages/crrt/employees/index');
			},
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
									"app_system_key": global.appSystemKey,
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
		// background-color: white;
		// background: radial-gradient(50% 50%, rgba(254, 255, 235, 1) 0%, rgba(237, 255, 253, 1) 100%);
		background: radial-gradient(50% 50%, rgba(254, 255, 235, 1) 0%, rgba(245, 250, 255, 1) 100%);
	}

	.wrap {
		margin: 0;
		width: 100%;
		// height: 100%;
		height: calc(100vh - var(--window-top));
		display: flex;
		justify-content: center;
		// align-items: center;
		flex-wrap: wrap;
		font-size: 12px;
		color: #7d7e7f;
	}

	.container {
		width: 97%;
	}

	.login {
		padding-top: 20px;
		padding-left: 20px;
		font-size: 20px;
		font-weight: 700;
		color: rgba(2, 46, 87, 1);
		text-align: left;
		vertical-align: top;
	}

	.logina {
		padding-top: 5px;
		padding-left: 20px;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 16.41px;
		color: rgba(80, 80, 97, 1);
		text-align: left;
		vertical-align: top;
	}

	.loginc {
		font-size: 18px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		vertical-align: top;
	}

	.top {
		// height: 100px;
		height: 20%;
	}

	.top1 {
		height: 10%;
	}

	.logo {
		width: 100%;
		height: 40%;

		.png {
			width: 200px;
			height: 200px;
			margin: 0 auto;
		}
	}

	.mid {
		width: 100%;
		height: 30%;
	}

	.bottom {
		width: 100%;
		height: 60%;
		display: flex;
		justify-content: space-between;
	}

	.form {
		height: 100%;
		width: 70%;
		margin: 0 auto;
	}

	.submit {
		width: 100%;
		height: 100%;
		// padding-top: 20%;
	}

	.btn {
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		width: 100%;
		height: 40px;
		opacity: 1;
		border-radius: 8px;
		background: linear-gradient(135deg, rgba(255, 51, 255, 1) 0%, rgba(28, 85, 255, 1) 100%);
	}

	.rz {
		color: rgba(88, 62, 242, 1);
		font-size: 12px;
		font-weight: 400;
	}
</style>