<template>
	<view>
		<u-upload ref="bfUp" :action="action" :fileList="fileList" maxCount="1" :previewFullImage="true"
			@afterRead="afterRead" :auto-upload="auto" :maxSize="2 * 1024 * 1024" :form-data="formData"
			@delete="deleteItem">
		</u-upload>
		<!-- 		<u-button @click="submit" type="success">提交上传</u-button> -->
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	export default {
		name: "bf-upload",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				action: uni.$u.http.config.baseURL + "/page/uploadControlContext",
				controlContent: "",
				fileList: [],
				sizeType: ['compressed'],
				auto: true,
				formData: {},
				header: {
					"Content-Type": "multipart/form-data"
				}
			}
		},
		mounted: function() {
			console.log("control:", this.control);
			if (this.control?.controlVO?.value) {
				this.fileList.push({
					url: this.control.controlVO.value,
				});
			}
			let setControlVO = {
				"control_no": this.control.control_no,
				"valueSource": this.control.controlVO.valueSource
			}
			this.formData = {
				"setControlVO": JSON.stringify(setControlVO)
			};
			console.log(this.formData);
		},
		methods: {
			deleteItem(event) {
				console.log(event);
				this[`fileList${event.name}`].splice(event.index, 1)
			},

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
					console.log(result);
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
						url: this.action,
						filePath: url,
						name: 'file',
						formData: this.formData,
						header: frame.getHeader(this.header),
						success: (res) => {
							console.log(res);
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style>
</style>
