<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
				<view>
					<u--form :model="model" :rules="rules" ref="form1" labelPosition="top" labelWidth="auto">
						<u-form-item label="您对本次课程的满意度" prop="feedBack.eva" borderBottom
							@click="showSheet('eva');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.evaLabel" disabled disabledColor="#ffffff"
								inputAlign="right" placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="课程内容是否符合您的需要，并且有指导性" prop="feedBack.suit" borderBottom
							@click="showSheet('suit');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.suitLabel" disabled disabledColor="#ffffff"
								inputAlign="right" placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="课程内容丰富，清晰明确，易于理解" prop="feedBack.clear" borderBottom
							@click="showSheet('clear');hideKeyboard()" ref="item1">
							<u--input v-model="model.feedBack.clearLabel" disabled disabledColor="#ffffff"
								inputAlign="right" placeholder="请选择" border="none"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="您觉得本次授课最感兴趣，对您收获最大的培训内容是什么？" prop="feedBack.content" borderBottom>
							<u--textarea :disabled="disabled" placeholder="请输入" border="bottom"
								v-model="model.feedBack.content" count></u--textarea>
						</u-form-item>
						<u-form-item label="您对本次授课有何建议？" prop="feedBack.suggestion" borderBottom>
							<u--textarea :disabled="disabled" placeholder="请输入" border="bottom"
								v-model="model.feedBack.suggestion" count></u--textarea>
						</u-form-item>
					</u--form>
					<u-action-sheet :show="showSuit" :actions="suitActions" title="请选择" @close="showSuit = false"
						@select="suitSelect">
					</u-action-sheet>
					<u-action-sheet :show="showClear" :actions="clearActions" title="请选择" @close="showClear = false"
						@select="clearSelect">
					</u-action-sheet>
					<u-action-sheet :show="showEva" :actions="evaActions" title="请选择" @close="showEva = false"
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
		apiCrrtTrainFeedBack,
		apiCrrtTrainSatisfaction
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				params: {},
				showSuit: false,
				showClear: false,
				showEva: false,
				disabled: false,
				suitActions: [{
						name: '是',
						value: '1'
					},
					{
						name: '否',
						value: '0'
					}
				],
				clearActions: [{
						name: '是',
						value: '1'
					},
					{
						name: '否',
						value: '0'
					}
				],
				evaActions: [{
						name: '非常满意',
						value: '3'
					},
					{
						name: '满意',
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
						course_id: '',
						eva: '',
						suit: '',
						clear: '',
						content: '',
						suggestion: '',
						evaLabel: '',
						suitLabel: '',
						clearLabel: '',
					},
				},
				rules: {
					'feedBack.eva': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'feedBack.suit': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'feedBack.clear': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'feedBack.content': {
						type: 'string',
						required: true,
						message: '请填写',
						trigger: ['blur', 'change']
					},
					'feedBack.suggestion': {
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
					if (e == "eva") {
						this.showEva = true
					} else if (e == "suit") {
						this.showSuit = true
					} else if (e == "clear") {
						this.showClear = true
					}
				}
			},
			queryFeedBack() {
				let json = {
					params: {
						"course_id": this.model.feedBack.course_id
					}
				};
				apiCrrtTrainSatisfaction(json).then(data => {
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
			suitSelect(e) {
				this.model.feedBack.suit = e.value
				this.model.feedBack.suitLabel = e.name
			},
			clearSelect(e) {
				this.model.feedBack.clear = e.value
				this.model.feedBack.clearLabel = e.name
			},
			evaSelect(e) {
				this.model.feedBack.eva = e.value
				this.model.feedBack.evaLabel = e.name
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					if (res) {
						apiCrrtTrainFeedBack(this.model.feedBack).then(data => {
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
						title: '请正确填写',
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