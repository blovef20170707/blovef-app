<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<uni-card v-for="(item,index) in list" :key="index" :title="item.title" :isFull="true" :sub-title="item.subtitle" :extra="item.additional" :thumbnail="item.icon">
					<text class="uni-body">{{item.content}}</text>
				</uni-card>
			</view>
			<view style="height: 10px;">
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiGetMessage
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.getMessage();
		},
		methods: {
			getMessage() {
				apiGetMessage({}).then(data => {
					console.log("首页加载", data)
					this.list = data;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
		}
	}
</script>

<style lang="scss">
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

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;

	}


	.zcard {
		overflow: hidden;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		background-color: #fff;
		flex: 1;
		border: 1px solid #EBEEF5;
		position: relative;
		border-left-width: 0;
		border-radius: 0;
		margin: 0;
		padding: 0 10px;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08);
	}

	.header {
		display: flex;
		border-bottom: 1px #EBEEF5 solid;
		flex-direction: row;
		align-items: center;
		padding: 10px;
		overflow: hidden;

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
		}

		.right {
			line-height: 12px;
		}
	}

	.ztext {
		font-size: 15px;
		color: #3a3a3a;
	}

	.ftext {
		font-size: 12px;
		margin-top: 5px;
		color: #909399;
	}

	.cardbody {
		font-size: 14px;
		color: #6a6a6a;
		line-height: 22px;
		padding: 10px 0;
	}
</style>