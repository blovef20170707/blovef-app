<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model" :rules="rules" ref="form1" labelWidth="auto">
					<u-form-item required="true" label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.name" border="none" inputAlign="right"
							placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item required="true" label="系统编号" prop="userInfo.phone" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.phone" type="number" border="none"
							inputAlign="right" placeholder="请输入系统编号"></u--input>
					</u-form-item>
				</u--form>
				<u-button v-if="model.userInfo.trainee_status == 0" type="primary" text="提交认证"
					customStyle="margin-top: 30px" @click="submit"></u-button>
				<u-button v-if="model.userInfo.trainee_status == 1" type="success" text="认证中"
						customStyle="margin-top: 30px" @click="submit"></u-button>
				<u-button disabled="true" v-if="model.userInfo.trainee_status == 2" type="primary" text="认证通过"
					customStyle="margin-top: 30px"></u-button>
			</view>
			<view style="height: 10px;">
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainApplication,
		apiCrrtTrainTrainee
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				showSex: false,
				showStay: false,
				showDegree: false,
				showIdentity: false,
				disabled: false,
				model: {
					userInfo: {
						name: '',
						phone: '',
						trainee_status: 0,
						identity: ''
					},
				},
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					'userInfo.phone': {
						type: 'number',
						required: true,
						message: '请输入系统编号',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			queryTrainee() {
				apiCrrtTrainTrainee({}).then(data => {
					console.log("报名", data)
					if (data) {
						this.model.userInfo = data;
						if (this.model.userInfo.trainee_status == 1) {
							this.disabled = true;
						}
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					console.log(this.model.userInfo);
					if (res) {
						this.model.userInfo.identity = 3;
						apiCrrtTrainApplication(this.model.userInfo).then(data => {
							console.log("认证", data)
							if (data) {
								this.model.userInfo.trainee_status = 2;
								this.disabled = true;
								this.$refs.uToast.show({
									message: '认证成功',
									type: 'success'
								});
							}
						}).catch(exception => {
							console.log("exception", exception)
						}).finally(res => {

						})
					}
				}).catch(errors => {
					console.log(errors)
					this.$refs.uToast.show({
						message: '请正确填写',
						type: 'error'
					});
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		onShow() {
			this.queryTrainee();
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