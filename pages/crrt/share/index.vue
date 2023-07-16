<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<view style="display: flex;">
					<view style="width: 100%;padding-left:3px">
						<view>
							<u-search height="20" :inputStyle="inputStyle" :actionStyle="actionStyle"
								placeholder="请输入标题" v-model="keyword" :showAction="true" @custom="cls()"></u-search>
						</view>
					</view>
				</view>
				<view style="height: 5px;">
				</view>
				<view v-if="empty == false">
					<u-list @scrolltolower="scrolltolower(3)">
						<u-list-item v-for="(item, index) in list" :key="index">
							<u-cell style="padding: 0px;" :title="item.title" isLink @click="openAtt(item)">
								<u-avatar slot="icon" shape="square" size="35" :src="item.type_url"></u-avatar>
							</u-cell>
						</u-list-item>
					</u-list>
				</view>
				<u-empty v-if="empty == true" :mode="imgName" :icon="iconUrl">
				</u-empty>
			</view>
			<u-toast ref="uToast"></u-toast>

		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainShareIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				empty: false,
				imgName: 'list',
				iconUrl: 'https://cdn.uviewui.com/uview/empty/list.png',
				inputStyle: {
					fontSize: '12px',
				},
				actionStyle: {
					fontSize: '12px',
				},
				keyword: '',
				pid: '-1',
				list: []
			}
		},
		onReady() {

		},
		onLoad(option) {
			console.log("onLoad option", option);
			if (!frame.isNull(option.params)) {
				this.pid = JSON.parse(option.params);
			}
			this.getIndex();
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			getIndex() {
				let json = {
					params: {
						"pid": this.pid,
						"title": ""
					}
				};
				apiCrrtTrainShareIndex(
					json
				).then(data => {
					console.log("数据返回", data)
					this.list = data;
					if (frame.isNull(this.list)) {
						this.empty = true;
					}else{
						this.empty = false;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			openAtt(obj) {
				console.log(obj);
				if (0 == obj.file_type) {
					uni.$u.route("/pages/crrt/share/index", {
						params: JSON.stringify(obj.id)
					});
				} else {
					uni.downloadFile({
						url: obj.doc_url,
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
			},
			cls(value) {
				console.log(value)
				let json = {
					params: {
						"pid": "-1",
						"title": this.keyword
					}
				};
				console.log(json)
				apiCrrtTrainShareIndex(
					json
				).then(data => {
					console.log("搜索返回", data)
					this.list = data;
					if (frame.isNull(this.list)) {
						this.empty = true;
					}else{
						this.empty = false;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
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