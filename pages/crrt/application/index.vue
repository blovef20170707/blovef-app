<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model" :rules="rules" ref="form1" labelWidth="auto">
					<u-form-item required="true" label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.name" border="none" inputAlign="right"
							placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item required="true" label="电话" prop="userInfo.phone" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.phone" type="number" border="none"
							inputAlign="right" placeholder="请输入电话"></u--input>
					</u-form-item>
					<u-form-item required="true" label="性别" prop="userInfo.sex" borderBottom
						@click="showSheet('sex');hideKeyboard()" ref="item1">
						<u--input v-model="model.userInfo.sexLabel" disabled disabledColor="#ffffff" inputAlign="right"
							placeholder="请选择性别" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required="true" label="学历" prop="userInfo.degree" borderBottom
						@click="showSheet('degree');hideKeyboard()" ref="item1">
						<u--input v-model="model.userInfo.degreeLabel" disabled disabledColor="#ffffff"
							inputAlign="right" placeholder="请选择学历" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item required="true" label="单位" prop="userInfo.work" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.work" border="none" inputAlign="right"
							placeholder="请输入单位"></u--input>
					</u-form-item>
					<u-form-item required="true" label="临床护理工作年限" prop="userInfo.lcage" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.lcage" type="number" inputAlign="right"
							border="none" placeholder="请输入临床护理工作年限"></u--input>
					</u-form-item>
					<u-form-item required="true" label="专科护理工作年限" prop="userInfo.zkage" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.zkage" type="number" inputAlign="right"
							border="none" placeholder="请输入专科护理工作年限"></u--input>
					</u-form-item>
					<u-form-item required="true" label="是否住宿" prop="userInfo.stay" borderBottom
						@click="showSheet('stay');hideKeyboard()" ref="item1">
						<u--input v-model="model.userInfo.stayLabel" disabled disabledColor="#ffffff" inputAlign="right"
							placeholder="是否住宿" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="备注" borderBottom>
						<u--textarea :disabled="disabled" placeholder="请输入备注" border="bottom"
							v-model="model.userInfo.remark" count></u--textarea>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showSex" :actions="sexActions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>
				<u-action-sheet :show="showStay" :actions="stayActions" title="是否住宿" @close="showStay = false"
					@select="staySelect">
				</u-action-sheet>
				<u-action-sheet :show="showDegree" :actions="degreeActions" title="请选择学历" @close="showDegree = false"
					@select="degreeSelect">
				</u-action-sheet>
				<u-button v-if="model.userInfo.trainee_status == 0" type="primary" text="提交报名"
					customStyle="margin-top: 30px" @click="submit"></u-button>
				<u-button disabled="true" v-if="model.userInfo.trainee_status == 1" type="success" text="待审核"
					customStyle="margin-top: 30px"></u-button>
				<u-button disabled="true" v-if="model.userInfo.trainee_status == 2" type="primary" text="通过报名"
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
				disabled: false,
				model: {
					userInfo: {
						name: '',
						sex: '',
						remark: '',
						work: '',
						phone: '',
						degree: '',
						lcage: '',
						zkage: '',
						stay: '',
						sexLabel: '',
						degreeLabel: '',
						stayLabel: '',
						trainee_status: 0
					},
				},
				sexActions: [{
						label: '男',
						name: '男',
						value: '1'
					},
					{
						label: '女',
						name: '女',
						value: '0'
					}
				],
				stayActions: [{
						label: '是',
						name: '是',
						value: '1'
					},
					{
						label: '否',
						name: '否',
						value: '0'
					}
				],
				degreeActions: [{
						label: '博士',
						name: '博士',
						value: '4'
					},
					{
						label: '硕士',
						name: '硕士',
						value: '3'
					},
					{
						label: '本科',
						name: '本科',
						value: '2'
					},
					{
						label: '专科',
						name: '专科',
						value: '1'
					},
					{
						label: '高中及以下',
						name: '高中及以下',
						value: '0'
					}
				],
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					'userInfo.phone': [{
						type: 'number',
						required: true,
						message: '请输入电话',
						trigger: ['blur', 'change']
					}],
					'userInfo.sex': {
						type: 'number',
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					'userInfo.degree': {
						type: 'number',
						required: true,
						message: '请选择学历',
						trigger: ['blur', 'change']
					},
					'userInfo.work': {
						type: 'string',
						required: true,
						message: '请输入单位',
						trigger: ['blur', 'change']
					},
					'userInfo.lcage': {
						type: 'number',
						required: true,
						message: '请输入临床护理工作年限',
						trigger: ['blur', 'change']
					},
					'userInfo.zkage': {
						type: 'number',
						required: true,
						message: '请输入专科护理工作年限',
						trigger: ['blur', 'change']
					},
					'userInfo.stay': {
						type: 'number',
						required: true,
						message: '请选择住宿',
						trigger: ['blur', 'change']
					}
				},
			};
		},
		methods: {
			showSheet(e) {
				if (!this.disabled) {
					if (e == "sex") {
						this.showSex = true
					} else if (e == "degree") {
						this.showDegree = true
					} else if (e == "stay") {
						this.showStay = true
					}
				}
			},
			sexSelect(e) {
				this.model.userInfo.sex = e.value
				this.model.userInfo.sexLabel = e.name
			},
			degreeSelect(e) {
				this.model.userInfo.degree = e.value
				this.model.userInfo.degreeLabel = e.name
			},
			staySelect(e) {
				this.model.userInfo.stay = e.value
				this.model.userInfo.stayLabel = e.name
			},
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
						apiCrrtTrainApplication(this.model.userInfo).then(data => {
							console.log("报名", data)
							if (data) {
								this.model.userInfo.trainee_status = 1;
								this.disabled = true;
								this.$refs.uToast.show({
									message: '报名成功',
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
						title: '请正确填写',
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