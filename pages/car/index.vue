<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius: 8px;">
				<u-swiper :list="banlist" imgMode="heightFix"></u-swiper>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius: 8px;">
				<view style="display: flex;">
					<view class="leftLable">
						<text>行驶证</text>
					</view>
					<view style="width: 80%;height: 150px;">
						<view style="float:right;">
							<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple
								:maxCount="1" width="200px" height="150px">
								<u--image src="/static/xsz.png" mode="aspectFit" width="200px" height="150px">
								</u--image>
							</u-upload>
						</view>
					</view>
				</view>
				<!-- <view style="display: flex;">
					<view class="leftLable">
						<text>上牌时间</text>
					</view>
					<view style="width: 80%;">
						<view style="float:right;width: 90%;">
							<u-input type="text" border="bottom" clearable input-align="right" placeholder="请输入上牌时间"
								@focus="showSpCalendar"></u-input>
							<u-calendar :show="spshow" @confirm="confirm" @close="close"></u-calendar>
						</view>
					</view>
				</view> -->
				<view style="display: flex;">
					<view class="leftLable">
						<text>公里数</text>
					</view>
					<view style="width: 80%;">
						<view style="float:right;width: 90%;">
							<u-input placeholder="请输入公里数" type="digit" input-align="right" border="bottom" clearable v-model="mile">
								<u--text text="万公里" slot="suffix" margin="0 3px 0 0" type="tips"></u--text>
							</u-input>
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view class="leftLable1">
					<view style="width: 75%;">
						<u-button text="免费评估" size="normal" type="primary" open-type="getPhoneNumber"
							@getphonenumber="getPhoneNumber"></u-button>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
			</view>
			<view style="height: 5px;">
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiEvaluation
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				fileList6: [],
				vin:'',
				spshow: false,
				evaluationId: '',
				mile: '',
				banlist: ['/static/c1.png',
					'/static/c2.png',
					'/static/c3.png',
				]
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			getPhoneNumber(e) {
				console.log(e)
				if (e.detail.errMsg === 'getPhoneNumber:fail user deny') { 
				  this.$refs.uToast.show({
				  	message: '请允许后使用',
				  	type: 'error'
				  });
				  return;
				}
				if(this.vin == ''){
					this.$refs.uToast.show({
						message: '请上传清晰的行驶证',
						type: 'error'
					});
					return;
				}
				if(this.mile == ''){
					this.$refs.uToast.show({
						message: '请上传正确的公里数',
						type: 'error'
					});
					return;
				}
				let params = {
					"id": this.evaluationId,
					"mile": this.mile,
					"code": e.detail.code
				}
				apiEvaluation(params).then(data => {
					console.log("评估完成", data)
					uni.$u.route({
						type: 'navigateTo',
						url: '/pages/car/evaluation',
						params: {
							"evaluationId": this.evaluationId
						}
					});
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			showSpCalendar() {
				this.spshow = true;
			},
			confirm(e) {
				this.spshow = false;
				console.log(e);
			},
			close() {
				this.spshow = false;
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: uni.$u.http.config.baseURL + "/carSuit/uploadvl",
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							let data = JSON.parse(res.data);
							console.log(data.data.id);
							this.evaluationId = data.data.id;
							this.vin = data.data.vin;
							console.log(this.evaluationId);
							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		font-size: 15px;
		color: #9c9c9c;
	}

	.container {
		width: 95%;
		// margin: 20px;
		// width: 500px;
		// height: 500px;
		// perspective: 1000px;
	}

	.leftLable {
		width: 20%;
		display: flex;
		// justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.leftLable1 {
		display: flex;
		justify-content: center;
		// align-items: center;
		// flex-wrap: wrap;
	}
</style>
