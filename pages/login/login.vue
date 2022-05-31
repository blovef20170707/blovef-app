<template>
	<view class="lg">
		<u-toast ref="uToast"></u-toast>
		<view class="top">
			<view class="title-a">
				欢迎回来
				<view class="title-b">请输入用户名与密码登录应用</view>
			</view>
		</view>
		<view class="mid">
			<view class="form">
				<view class="field">					
					<u-form :model="form" ref="uForm" label-position="top">
						<u-form-item label="用户名" labelWidth="auto" prop="name">
							<u-input v-model="form.name" type="text" :border="border" placeholder="请输入用户名"
								height="90px" />
						</u-form-item>
						<u-form-item label="密码" labelWidth="auto" prop="password">
							<u-input v-model="form.password" type="text" :border="border" placeholder="请输入密码"
								height="90px" />
						</u-form-item>
					</u-form>
				</view>
				<view class="forgot">
					<u-link href="http://www.uviewui.com">忘记密码?</u-link>
				</view>
				<view class="submit">
					<u-button type="warning" size="default" shape="square" :plain="false" :ripple="true"
						@click="submit">登录</u-button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import { apiWxLogin } from '@/common/http.api.js';
	export default {
		data() {
			return {
				form: {
					name: "",
					password: ""
				},
				rules: {
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: ['change'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change'],
					}]
				},
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
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			submit() {
				console.log('submit');
				this.$refs.uForm.validate().then(res => {
					this.login();
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
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
									"user_login": _this.form.name,
									"user_password": _this.form.password,
									"wx_code": code,
									"login_type": 'WECHAT',
									"app_system_key": 'fe76fca5-5277-11ec-ac3a-d8c4979bc6e5',
									"wx_nick_name": nickName,
									"wx_avatar_url": avatarUrl,
									"wx_gender": gender,
									"wx_country": country,
									"wx_province": province,
									"wx_city": city
								};
								console.log(params);
								apiWxLogin(params).then(data => {
										console.log("成功登录",data)
										uni.setStorageSync('token',data.token);
										console.log(uni.getStorageSync('token'))
										uni.$u.route({
											type: 'switchTab',
											url: '/pages/index/index'
										});
										console.log("成功登录完成")
								}).catch(exception => {
									console.log("exception",exception)
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
	.lg {
		height: calc(100vh - var(--window-top));
		width: 100%;
		background-color: rgba(0, 98, 205, 1);
	}

	.top {
		width: 100%;
		height: 30%;
	}

	.title-a {
		width: 70%;
		padding-top: 12%;
		margin: 0 auto;
		color: rgba(255, 255, 255, 1);
		font-size: 20px;
	}

	.title-b {
		color: rgba(255, 255, 255, 1);
		font-size: 14px;
		padding-top: 5%;
	}

	.mid {
		width: 100%;
		height: 70%;
		background-color: rgba(255, 255, 255, 1);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.form {
		width: 70%;
		margin: 0 auto;
	}

	.field {
		padding-top: 10%;
		width: 100%;
	}

	.forgot {
		text-align: right;
		width: 100%;
		float: right;
		color: rgba(77, 91, 182, 1);
		padding-top: 5%;
	}

	.submit {
		width: 100%;
		height: 100%;
		padding-top: 25%;
	}
</style>
