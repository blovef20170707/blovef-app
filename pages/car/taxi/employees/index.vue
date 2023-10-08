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
					<u-form-item required="true" label="证件号" prop="userInfo.idcard" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.idcard" type="idcard" border="none"
							inputAlign="right" placeholder="请输入证件号"></u--input>
					</u-form-item>
				</u--form>
				<u-button v-if="model.userInfo.user_id == ''" type="primary" text="提交认证" customStyle="margin-top: 30px"
					@click="submit"></u-button>
				<u-button disabled="true" v-if="model.userInfo.user_id != ''" type="primary" text="认证通过"
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
		apiCarTaxiEmployeeAuth,
		apiCarTaxiMe
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				disabled: false,
				model: {
					userInfo: {
						name: '',
						idcard: '',
						user_id: ''
					},
				},
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					'userInfo.idcard': {
						type: 'number',
						required: true,
						message: '请输入证件号',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			queryMe() {
				apiCarTaxiMe({}).then(data => {
					console.log("报名", data)
					if (data) {
						this.model.userInfo = data;
						if (this.model.userInfo.user_id != '') {
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
						apiCarTaxiEmployeeAuth(this.model.userInfo).then(data => {
							console.log("认证", data)
							if (data) {
								this.model.userInfo.user_id = data.user_id;
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
			this.queryMe();
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