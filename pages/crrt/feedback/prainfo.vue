<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
				<view>
					<u--form :model="model" :rules="rules" ref="form1" labelPosition="top" labelWidth="auto">
						<u-form-item label="入科第一天是否由教学组长或护士长接待" prop="feedBack.xh1" borderBottom
							@click="showSheet('xh1');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh1Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="入科时病区环境及病人情况介绍" prop="feedBack.xh2" borderBottom
							@click="showSheet('xh2');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh2Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="科室有计划地完成培训" prop="feedBack.xh3" borderBottom
							@click="showSheet('xh3');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh3Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="教学查房组织有序，查房内容突出专科护理特色和新进展" prop="feedBack.xh4" borderBottom
							@click="showSheet('xh4');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh4Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师对教学工作认真负责，态度端正" prop="feedBack.xh5" borderBottom
							@click="showSheet('xh5');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh5Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师技术过硬、理论知识全面" prop="feedBack.xh6" borderBottom
							@click="showSheet('xh6');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh6Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师爱伤观念强，服务态度好" prop="feedBack.xh7" borderBottom
							@click="showSheet('xh7');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh7Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师注重培养学生职业道德意识和严谨的工作作风" prop="feedBack.xh8" borderBottom
							@click="showSheet('xh8');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh8Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师注重对学生工作思维及解决问题能力的培养" prop="feedBack.xh9" borderBottom
							@click="showSheet('xh9');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh9Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师教学目标明确，符合大纲要求，切合学生实际" prop="feedBack.xh10" borderBottom
							@click="showSheet('xh10');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh10Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师严格执行操作常规，言传身教，勤示范、勤提问，做到放手不放眼" prop="feedBack.xh11" borderBottom
							@click="showSheet('xh11');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh11Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="带教老师对学生和蔼可亲，解释耐心，主动关心" prop="feedBack.xh12" borderBottom
							@click="showSheet('xh12');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh12Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="实习结束时科室组织操作技术、专科理论考试严谨有序" prop="feedBack.xh13" borderBottom
							@click="showSheet('xh13');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh13Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="实习结束时科室组织小结和客观评估" prop="feedBack.xh14" borderBottom
							@click="showSheet('xh14');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.xh14Label" disabled disabledColor="#ffffff" inputAlign="right"
								placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="你认为最满意的教员是谁？哪些方面是你学习的榜样？" prop="feedBack.xh15" borderBottom>
							<u--textarea :disabled="disabled" placeholder="请输入" border="bottom"
								v-model="model.feedBack.xh15" count></u--textarea>
						</u-form-item>
						<u-form-item label="你认为最不满意的教员是谁？主要问题何在？" prop="feedBack.xh16" borderBottom>
							<u--textarea :disabled="disabled" placeholder="请输入" border="bottom"
								v-model="model.feedBack.xh16" count></u--textarea>
						</u-form-item>
						<u-form-item label="你对我院临床护理教学工作还有什么建议和要求？" prop="feedBack.xh17" borderBottom>
							<u--textarea :disabled="disabled" placeholder="请输入" border="bottom"
								v-model="model.feedBack.xh17" count></u--textarea>
						</u-form-item>
					</u--form>
					<u-action-sheet :show="showEva" :actions="actions" title="请选择" @close="showEva = false"
						@select="evaSelect">
					</u-action-sheet>
					<u-button type="primary" v-if="disabled == false" text="提交" customStyle="margin-top: 20px"
						@click="submit"></u-button>
					<u-button disabled="true" v-if="disabled == true" type="success" text="已反馈"
						customStyle="margin-top: 20px"></u-button>
				</view>
				<view style="height: 10px;">
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>

	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainFeedBackPractice,
		apiCrrtTrainSatisfactionPractice
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				current: '',
				currentLabel: '',
				params: {},
				showEva: false,
				disabled: false,
				actions: [{
						name: '非常满意',
						value: '4'
					},
					{
						name: '满意',
						value: '3'
					},
					{
						name: '不确定',
						value: '2'
					},
					{
						name: '一般',
						value: '1'
					},
					{
						name: '不满意',
						value: '0'
					}
				],
				model: {
					feedBack: {
						xh1: '',
						xh2: '',
						xh3: '',
						xh4: '',
						xh5: '',
						xh6: '',
						xh7: '',
						xh8: '',
						xh9: '',
						xh10: '',
						xh11: '',
						xh12: '',
						xh13: '',
						xh14: '',
						xh15: '',
						xh16: '',
						xh17: '',
						xh1Label: '',
						xh2Label: '',
						xh3Label: '',
						xh4Label: '',
						xh5Label: '',
						xh6Label: '',
						xh7Label: '',
						xh8Label: '',
						xh9Label: '',
						xh10Label: '',
						xh11Label: '',
						xh12Label: '',
						xh13Label: '',
						xh14Label: '',
					},
				},
				rules: {
					'feedBack.xh1': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh2': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh3': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh4': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh5': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh6': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh7': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh8': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh9': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh10': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'feedBack.xh11': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh12': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh13': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh14': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.xh15': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'feedBack.xh16': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'feedBack.xh17': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			showSheet(e) {
				if (!this.disabled) {
					this.showEva = true;
					this.current = e;
					this.currentLabel = e+"Label";
				}
			},
			queryFeedBack() {
				let json = {
					params: {
						"course_id": this.model.feedBack.course_id
					}
				};
				apiCrrtTrainSatisfactionPractice(json).then(data => {
					console.log("满意度", data)
					if (data) {
						this.model.feedBack = data;
						this.disabled = true;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			evaSelect(e) {
				this.model.feedBack[this.current] = e.value
				this.model.feedBack[this.currentLabel] = e.name
				console.log(this.model.feedBack[this.current]);
				console.log(this.model.feedBack[this.currentLabel]);
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					if (res) {
						apiCrrtTrainFeedBackPractice(this.model.feedBack).then(data => {
							console.log("满意度", data)
							if (data) {
								this.disabled = true;
								this.$refs.uToast.show({
									message: '提交成功',
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
			},
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		},
		// 第一次进入加载，参数可来源于菜单
		onLoad(option) {
			console.log("onLoad option", option);
			this.params = JSON.parse(option.params);
		},
		// 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow(option) {
			console.log("onShow params", this.params);
			this.model.feedBack.course_id = this.params.id
			console.log(this.model.feedBack.course_id);
			this.queryFeedBack();
		},
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