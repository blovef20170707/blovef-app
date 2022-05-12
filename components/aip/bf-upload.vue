<template>
	<view>
		<u-upload ref="bfUp" input-align="right" :action="action" :file-list="fileList" max-count="1"
			:auto-upload="auto" :size-type="sizeType" :max-size="2 * 1024 * 1024" :form-data="formData"
			:header="header">
		</u-upload>
<!-- 		<u-button @click="submit" type="success">提交上传</u-button> -->
	</view>
</template>

<script>
	export default {
		name: "bf-upload",
		props: {
			control: Object
		},
		data() {
			return {
				labelWidth: "200",
				labelPosition: 'left',
				action: this.$u.http.config.baseUrl + "/page/uploadControlContext",
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
			if(null != this.control.controlVO.value && "" != this.control.controlVO.value){
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
		},
		methods: {
			submit() {
				// this.$refs.bfUp.upload();
				// console.log(this.$refs.bfUp.lists);
				// console.log("uplists",item);
				this.$refs.bfUp.lists.map(item => {
					console.log(item);
					if (item.file) {
						uni.uploadFile({
							url: this.$u.http.config.baseUrl +
								"/page/uploadControlContext", 
							filePath: item.file.path,
							name: 'file',
							formData: {
								"control": JSON.stringify(this.control)
							},
							header: {
								"Content-Type": "multipart/form-data"
							},
							success: (uploadFileRes) => {
								console.log("uploadFileRes:", uploadFileRes)
								if (uploadFileRes.statusCode == 200) {
									let data = JSON.parse(uploadFileRes.data);
									if (data.success == true) {
										this.$u.toast("上传成功");
									} else {
										this.$u.toast("上传失败");
									}
								} else {
									this.$u.toast("上传失败");
								}
							}
						});
					}
				})

			},
			afterRead(lists) {
				console.log("lists", lists);
				let uplists = [];
				lists.map(item => {
					if (item.file) {
						this.submit(item);
					}
				})
			},
			oversize() {
				console.log("oversize")
				// this.$u.toast("图片最大不能超过2M");
			}
		}
	}
</script>

<style>
</style>
