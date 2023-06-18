<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<u-tabs :list="list" :current="current" @change="change">
			</u-tabs>
			<view v-if="current == 0">
				<u--form labelPosition="left" :model="model" :rules="rules" ref="form1" labelWidth="auto">
					<u-form-item required="true" label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input disabled v-model="model.userInfo.name" border="none" inputAlign="right"
							placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item label="身份证" prop="userInfo.idcard" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.idcard" type="number" border="none" inputAlign="right"
							placeholder="请输入身份证"></u--input>
					</u-form-item>
					<u-form-item label="紧急联系人电话" prop="userInfo.contact_phone" borderBottom ref="item1">
						<u--input  :disabled="disabled" v-model="model.userInfo.contact_phone" type="number" border="none" inputAlign="right"
							placeholder="请输入紧急联系人电话"></u--input>
					</u-form-item>
					<u-form-item label="学习方向" prop="userInfo.learning" borderBottom ref="item1">
						<u--input  :disabled="disabled" v-model="model.userInfo.learning" border="none" inputAlign="right"
							placeholder="请输入学习方向"></u--input>
					</u-form-item>
					<u-form-item label="临床实践批次" prop="userInfo.lcpc" borderBottom ref="item1">
						<u--input  :disabled="disabled" v-model="model.userInfo.lcpc" border="none" inputAlign="right"
							placeholder="请输入临床实践批次"></u--input>
					</u-form-item>
					<u-form-item label="工作服尺寸" prop="userInfo.clothes" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.clothes" border="none" inputAlign="right"
							placeholder="请输入工作服尺寸"></u--input>
					</u-form-item>
					<u-form-item label="护士鞋尺码" prop="userInfo.shoes" borderBottom ref="item1">
						<u--input :disabled="disabled" v-model="model.userInfo.shoes" border="none" inputAlign="right"
							placeholder="请输入护士鞋尺码"></u--input>
					</u-form-item>
					<u-form-item label="家庭住址" prop="userInfo.ads" borderBottom>
						<u--textarea :disabled="disabled" height="50" placeholder="请输入家庭住址" border="bottom" v-model="model.userInfo.ads"
							count maxlength=50></u--textarea>
					</u-form-item>
					<u-button v-if="model.userInfo.information_status == 0" type="primary" text="完善" customStyle="margin-top: 30px" @click="submit"></u-button>
					<u-button :disabled="disabled" v-if="model.userInfo.information_status == 1" type="success" text="已完善" customStyle="margin-top: 30px"></u-button>
				</u--form>
			</view>
			<view v-if="current == 1">
				<u-list @scrolltolower="scrolltolower(1)">
					<u-list-item v-for="(item, index) in knowList" :key="index">
						<!-- <u-cell :title="`列表长度-${index + 1}`"> -->
						<u-cell style="padding: 0px;" :title="item.title" isLink @click="openAtt(item)">
							<u-avatar slot="icon" shape="square" size="35" :src="item.typeUrl"></u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
			<view v-if="current == 2">
				<view>
					<view><u--text prefixIcon="map-fill" iconStyle="color: #03840e" text="视频1"></u--text></view>
					<view style="height: 5px;"></view>
					<view><video id="myVideo"
							src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
							@error="videoErrorCallback" controls></video>
					</view>
				</view>
				<view>
					<view><u--text prefixIcon="map-fill" iconStyle="color: #03840e" text="视频2"></u--text></view>
					<view style="height: 5px;"></view>
					<view><video id="myVideo"
							src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
							@error="videoErrorCallback" controls></video></view>
				</view>
			</view>
			<view v-if="current == 3">
				<u-list @scrolltolower="scrolltolower(3)">
					<u-list-item v-for="(item, index) in rimList" :key="index">
						<u-cell style="padding: 0px;" :title="item.title" isLink @click="openAtt(item)">
							<u-avatar slot="icon" shape="square" size="35" :src="item.typeUrl"></u-avatar>
						</u-cell>
					</u-list-item>
				</u-list>
			</view>
			<!-- <u-modal :show="show" :title="title" :content='content'></u-modal> -->
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTrainee,apiCrrtTrainPerfect,apiCrrtTrainDocIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				// modalShow: false,
				// modalTitle: '播放失败',
				// modalcontent: '',
				disabled: false,
				asrc: '/static/crrt/avatar.png',
				current: 0,
				list: [{
					name: '信息收集',
				}, {
					name: '入学需知',
				}, {
					name: '位置导航'
				}, {
					name: '周边服务'
				}],
				model: {
					userInfo: {
						id: '',
						name: '',
						idcard: '',
						contact_phone: '',
						learning: '',
						lcpc: '',
						clothes: '',
						shoes: '',
						ads: '',
						information_status:0
					},
				},
				rules: {
					'userInfo.idcard': {
						type: 'number',
						required: true,
						message: '请输入身份证',
						trigger: ['blur', 'change']
					},
					'userInfo.contact_phone': {
						type: 'number',
						required: true,
						message: '请输入紧急联系人电话',
						trigger: ['blur', 'change']
					},
					'userInfo.learning': {
						type: 'string',
						required: true,
						message: '请输入学习方向',
						trigger: ['blur', 'change']
					},
					'userInfo.lcpc': {
						type: 'string',
						required: true,
						message: '请输入临床实践批次',
						trigger: ['blur', 'change']
					},
					'userInfo.clothes': {
						type: 'string',
						required: true,
						message: '请输入工作服尺寸',
						trigger: ['blur', 'change']
					},
					'userInfo.shoes': {
						type: 'string',
						required: true,
						message: '请输入护士鞋尺码',
						trigger: ['blur', 'change']
					},
					'userInfo.ads': {
						type: 'string',
						required: true,
						message: '请输入家庭住址',
						trigger: ['blur', 'change']
					}
				},
				knowList: [],
				rimList: []
			}

		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		},
		onLoad() {
			
		},
		onUnload() {

		},
		onShow() {
			this.queryTrainee();
			this.getIndex();
		},
		methods: {
			getIndex(){
				apiCrrtTrainDocIndex({}).then(data => {
					console.log("首页加载", data)
					this.knowList = data.knowList;
					this.rimList = data.rimList;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
				
				})
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					console.log(this.model.userInfo);
					if (res) {
						apiCrrtTrainPerfect(this.model.userInfo).then(data => {
							console.log("完善", data)
							if (data) {
								this.disabled = true;
								this.model.userInfo.information_status = 1;
								this.$refs.uToast.show({
									message: '完善成功',
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
			queryTrainee() {
				apiCrrtTrainTrainee({}).then(data => {
					console.log("学员", data)
					if (data) {
						this.model.userInfo = data;
						if (this.model.userInfo.information_status == 1) {
							this.disabled = true;
						}
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
			
				})
			},
			change(index) {
				this.current = index.index;
			},
			scrolltolower(e) {
				console.log(e)
			},
			videoErrorCallback: function(e) {
				console.log(e)
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			openAtt(obj) {
				console.log(obj.docUrl);
				uni.downloadFile({
					url: obj.docUrl,
					success: function(res) {
						console.log(res);
						var filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: function(res) {
								console.log('打开文档成功');
							}
						});
					}
				});
			}
		}
	}
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