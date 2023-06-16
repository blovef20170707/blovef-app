<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<uni-card title="上课通知" :isFull="true" sub-title="08:50-10:20" extra="2023-06-01" :thumbnail="asrc">
					<text class="uni-body">优质护理服务实践与成效</text>
				</uni-card>
			</view>
			<view style="height: 10px;">
			</view>
			<view style="width: 100%;background-color: white;">
				<view class="zcard">
					<view class="header">
						<view class="left">
							<view style="display: flex;">
								<view style="margin-right: 10px;border-radius: 5px;">
									<u-avatar shape="square" :src="asrc" size="40"></u-avatar>
								</view>
								<view>
									<view><text class="ztext">急性肾衰竭与血液净化</text></view>
									<view><text class="ftext">新桥血透</text></view>
								</view>
							</view>
						</view>
						<view class="right">
							<text class="ftext">2023-06-01</text>
						</view>
					</view>
					<view class="cardbody">
						<image style="width: 100%;height: 150px;" :src="cover"></image>
						<text
							class="uni-body">卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。</text>
					</view>
					<view slot="actions" class="card-actions">
						<view class="card-actions-item" @click="actionsClick('分享')">
							<u-icon name="share" label="分享" labelSize="12" color="#999" size="18"></u-icon>
						</view>
						<view class="card-actions-item" @click="actionsClick('点赞')">
							<u-icon name="thumb-up" label="点赞" labelSize="12" color="#999" size="18"></u-icon>
						</view>
						<view class="card-actions-item" @click="actionsClick('评论')">
							<u-icon name="chat"  label="评论" labelSize="12" color="#999" size="18"></u-icon>
						</view>
					</view>
				</view>
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
				asrc: '/static/crrt/avatar.png',
				cover: '/static/crrt/b3.png',
			}

		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			onClick(e) {
				console.log(e)
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