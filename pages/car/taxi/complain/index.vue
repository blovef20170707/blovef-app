<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<text>请提交您的投诉反馈</text>
			</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model" :rules="rules" ref="form1" labelWidth="auto">
					<u-form-item required="true" label="车牌号码" prop="complainInfo.plate" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.plate" border="none"
							inputAlign="right" placeholder="请输入车牌号码"></u--input>
					</u-form-item>
					<template v-if="auth == 1">
					<u-form-item required="true" label="乘客姓名" prop="complainInfo.name" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.name" border="none"
							inputAlign="right" placeholder="请输入乘客姓名"></u--input>
					</u-form-item>
					<u-form-item required="true" label="联系电话" prop="complainInfo.phone" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.phone" type="number" border="none"
							inputAlign="right" placeholder="请输入电话"></u--input>
					</u-form-item>
					</template>
					<u-form-item required="true" label="乘车时间" prop="complainInfo.busTime" borderBottom
						@click="showBusTime = true; hideKeyboard()" ref="item1">
						<u--input v-model="model.complainInfo.bus_time" disabled disabledColor="#ffffff"
							placeholder="请选择乘车时间" inputAlign="right" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required="true" label="车费" prop="complainInfo.fare" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.complainInfo.fare" type="digit" inputAlign="right"
							border="none" placeholder="请输入车费"></u--input>
					</u-form-item>
					<u-form-item labelPosition="top" required="true" label="投诉原因" prop="complainInfo.reason"
						ref="item3">
						<u-checkbox-group :disabled="disabled" v-model="model.complainInfo.reason" shape="square"
							@change="reasonChange" iconPlacement="right" placement="column" borderBottom>
							<u-checkbox :customStyle="{marginTop : '8px'}" v-for="(item, index) in reasonList"
								:key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="建议反馈" borderBottom>
						<u--textarea :disabled="disabled" placeholder="请输入建议反馈" border="bottom"
							v-model="model.complainInfo.remark" count></u--textarea>
					</u-form-item>
				</u--form>
				<view style="height: 10px;">
				</view>
				<view style="display: flex;">
					<u-checkbox-group v-model="agreement" placement="column" @change="agreementChange">
						<u-checkbox key="index" name="选中">
						</u-checkbox>
					</u-checkbox-group>
					<text>我已阅读并同意</text><text style="color:#41a863;" @click="agree()">《个人用户服务协议及隐私政策》</text>
				</view>
				<u-button v-if="model.complainInfo.submitStatus == 0" type="primary" text="马上提交"
					customStyle="margin-top: 30px" @click="submit"></u-button>
				<u-button disabled="true" v-if="model.complainInfo.submitStatus == 1" type="primary" text="已提交"
					customStyle="margin-top: 30px"></u-button>
				<u-button  v-if="model.complainInfo.submitStatus == 1" type="warning" text="重填"
					customStyle="margin-top: 30px" @click="reset"></u-button>
				<u-datetime-picker :show="showBusTime" :value="busTime" mode="datetime" closeOnClickOverlay
					@confirm="busTimeConfirm" @cancel="busTimeClose" @close="busTimeClose"></u-datetime-picker>
			</view>
			<view style="height: 10px;">
			</view>
		</view>
		<view>
			<liu-drag-button @clickBtn="clickBtn">客服</liu-drag-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import global from "@/common/global.js";
	import {
		apiWxLogin,
		apiTaxiComplain,
		apiCarTaxiAuth
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				showBusTime: false,
				busTime: Number(new Date()),
				disabled: false,
				token: '',
				agreement: [],
				auth: 0,
				model: {
					complainInfo: {
						name: '',
						plate: '',
						phone: '',
						bus_time: '',
						fare: '',
						reason: [],
						remark: '',
						submitStatus: 0
					},
				},
				reasonList: [{
						name: '绕道',
						disabled: false
					},
					{
						name: '不文明服务',
						disabled: false
					},
					{
						name: '强打组合',
						disabled: false
					},
					{
						name: '不按规定计费标准收费',
						disabled: false
					},
					{
						name: '中途甩客',
						disabled: false
					},
					{
						name: '超速',
						disabled: false
					},
					{
						name: '开车玩手机',
						disabled: false
					},
					{
						name: '闯红灯',
						disabled: false
					},
					{
						name: '疲劳驾驶',
						disabled: false
					},
					{
						name: '开斗气车',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
				rules: {
					'complainInfo.plate': [{
						type: 'string',
						required: true,
						message: '请填写车牌',
						trigger: ['blur', 'change']
					}],
					'complainInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写乘客姓名',
						trigger: ['blur', 'change']
					}],
					'complainInfo.bus_time': [{
						type: 'string',
						required: true,
						message: '请填写乘车时间',
						trigger: ['change']
					}],
					'complainInfo.phone': [{
						type: 'number',
						required: true,
						message: '请填写联系电话',
						trigger: ['blur', 'change']
					}],
					'complainInfo.fare': [{
						type: 'number',
						required: true,
						message: '请正确填写车费',
						trigger: ['blur', 'change']
					}],
					'complainInfo.busTime': [{
						type: 'string',
						required: true,
						message: '请正确填写乘车时间',
						trigger: ['change']
					}],
					'complainInfo.reason': {
						type: 'array',
						min: 1,
						required: true,
						message: '至少选一项',
						trigger: ['change']
					},
				},
			};
		},
		methods: {
			busTimeClose() {
				this.showBusTime = false
				this.$refs.form1.validateField('complainInfo.busTime')
			},
			busTimeConfirm(e) {
				this.showBusTime = false
				this.model.complainInfo.bus_time = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh-MM')
				this.$refs.form1.validateField('complainInfo.busTime')
			},
			reasonChange(e) {
				console.log(e)
			},
			agreementChange(e) {
				console.log(e)
			},
			submit() {
				console.log("login")
				let _this = this;
				console.log(this.agreement.length)
				if (this.agreement.length == 0) {
					this.$refs.uToast.show({
						message: '请勾选同意用户协议',
						type: 'error'
					});
					return;
				}
				this.$refs.form1.validate().then(res => {
					console.log(this.model.complainInfo);
					if (res) {
						if (!this.token) {
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
											let app_system_key = global.baseUrl;
											let params = {
												"wx_code": code,
												"login_type": 'WECHAT',
												"app_system_key": app_system_key,
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
												uni.setStorageSync('token', data
													.token);
												console.log(uni.getStorageSync(
													'token'))
												console.log("成功登录完成")
												_this.taxiComplain(_this);
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
						} else {
							console.log("已登录过")
							_this.taxiComplain(_this);
						}
					}
				}).catch(errors => {
					console.log(errors)
					this.$refs.uToast.show({
						message: '请完成必填项',
						type: 'error'
					});
				})
			},
			taxiComplain(_this) {
				apiTaxiComplain(_this.model
					.complainInfo).then(data => {
					console.log("投诉", data)
					if (data) {
						_this.model
							.complainInfo
							.submitStatus = 1;
						_this.disabled = true;
						_this.$refs.uToast
							.show({
								message: '提交成功',
								type: 'success'
							});
					}
				}).catch(exception => {
					console.log("exception",
						exception)
				}).finally(res => {

				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			clickBtn() {
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
			},
			reset() {
				this.showBusTime = false;
				this.busTime = Number(new Date());
				this.disabled = false;
				this.agreement = [];
				this.model = {
					complainInfo: {
						name: '',
						plate: '',
						phone: '',
						bus_time: '',
						fare: '',
						reason: [],
						remark: '',
						submitStatus: 0
					},
				};
			},
			agree() {
				uni.$u.route('/pages/car/taxi/complain/agreement');
			},
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			apiCarTaxiAuth({}).then(data => {
				console.log("报名", data)
				if (data) {
					this.auth = data.auth;
				}
			}).catch(exception => {
				console.log("exception", exception)
			}).finally(res => {
		
			})
		}

	};
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
</style>