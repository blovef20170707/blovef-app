<template>
	<view class="wrap">
		<view class="container">
			<u-toast ref="uToast"></u-toast>
			<view class="top">
				<view class="login"><text>欢迎登录</text></view>
				<view class="logina"><text>{{loginModel.title}}</text></view>
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
							<view style="text-align: center;">
								<text style="color:#5f4bff;">仅限于专科班内部用户登录使用</text>
							</view>
							<view style="height: 5px;"></view>
							<view class="btn" @click="showModal()">
								<text class="loginc">{{loginModel.login}}</text>
							</view>
							<view style="height: 5px;">
							</view>
							<view style="display: flex;">
								<u-checkbox-group v-model="agreement" placement="column" @change="agreementChange">
									<u-checkbox key="index" name="选中">
									</u-checkbox>
								</u-checkbox-group>
								<view>
									<text>我已阅读并同意</text><text style="color:#41a863;"
										@click="agree()">《个人用户服务协议及隐私政策》</text>
								</view>
							</view>
							<!-- <view style="margin: 0 auto;text-align: center;">
								<text style="font-size: 12px; color: #7d7e7f;">点击登录即代表你已阅读并同意</text>
							</view>
							<view style="margin: 0 auto;text-align: center;">
								<text style="font-size: 12px; color: rgba(35, 70, 175, 1);" @click="agree()">《个人用户服务协议》</text>
							</view> -->
						</view>
						<view style="height: 30%;">
							<view style="height: 40%;">

							</view>
							<view class="bottom">
								<view style="width: 50%;" @click="login(1)">
									<text v-if="loginModel.applictionSwitch == 1" class="rz"
										>立即报名</text>
									<text v-if="loginModel.applictionSwitch == 0" class="rz"></text>
								</view>
								<view style="width: 50%;text-align: right;"  @click="login(2)">
									<text v-if="loginModel.emAuthSwitch == 1" class="rz">员工认证</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-modal :content="content" :show="show3" showCancelButton closeOnClickOverlay @confirm="confirm"
					@cancel="cancel" @close="close"></u-modal>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>

</template>

<script>
	import global from "@/common/global.js";
	import {
		apiWxLogin,
		apiCrrtTrainLoginAuth,
		apiCrrtTrainLoginIndex,
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				loginModel: {},
				agreement: [],
				show3: false,
				content: "请您知晓：该小程序仅限于专科班内部学员或员工登录使用。"
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("login index");
			apiCrrtTrainLoginIndex().then(data => {
				this.loginModel = data;
			}).catch(exception => {
				console.log("exception", exception)
			}).finally(res => {

			})
		},
		onReady() {

		},
		methods: {
			showModal(){
				this.show3 = true;
			},
			confirm() {
				this.show3 = false;
				this.login(0);
			},
			cancel() {
				this.show3 = false
				console.log('cancel');
			},
			close() {
				this.show3 = false
				console.log('close');
			},
			agree() {
				uni.$u.route('/pages/crrt/complain/agreement');
			},
			agreementChange(e) {
				console.log(e)
			},
			login(obj) {
				let _this = this;
				console.log(this.agreement.length)
				if (obj == 0 && this.agreement.length == 0) {
					this.$refs.uToast.show({
						message: '请勾选同意用户协议',
						type: 'error',
						duration: 3000
					});
					return;
				}
				const token = uni.getStorageSync('token');
				if (token) {
					if (obj == 0) {
						apiCrrtTrainLoginAuth().then(data => {
							uni.$u.route({
								type: 'switchTab',
								url: '/pages/crrt/index/index'
							});
						}).catch(exception => {
							console.log("exception", exception)
						}).finally(res => {

						})
					} else if (obj == 1) {
						if (this.loginModel.aurl) {
							uni.$u.route(this.loginModel.aurl);
						} else {
							this.$refs.uToast.show({
								message: '已关闭',
								type: 'error'
							})
						}
					} else if (obj == 2) {
						uni.$u.route('/pages/crrt/employees/index');
					}
				} else {
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
								if (obj == 1) {
									console.log(_this.loginModel.aurl)
									if (_this.loginModel.aurl) {
										uni.$u.route(_this.loginModel.aurl);
									} else {
										_this.$refs.uToast.show({
											message: '已关闭',
											type: 'error'
										})
									}
								} else if (obj == 2) {
									uni.$u.route('/pages/crrt/employees/index');
								} else if (obj == 0) {
									apiCrrtTrainLoginAuth().then(data => {
										console.log("Auth 权限 2", data)
										uni.$u.route({
											type: 'switchTab',
											url: '/pages/crrt/index/index'
										});
									}).catch(exception => {
										console.log("exception", exception)
									}).finally(res => {

									})
								}
							}).catch(exception => {
								console.log("exception", exception)
							}).finally(res => {

							})
						},
						fail: function() {
							console.log("uni.login");
							_this.$refs.uToast.show({
								message: '系统错误，请联系管理员',
								type: 'error'
							})
						}
					})
				}
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
		// justify-content: space-between;
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