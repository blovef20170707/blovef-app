<template>
	<view class="wrap">
		<view class="container">
			<view>
				<view style="height: 4px;">
				</view>
				<view style="width: 100%;background-color: white;">
					<u-swiper imgMode="heightFix" :list="banList"></u-swiper>
				</view>
				<view style="height: 4px;"></view>
				<view v-for="(item,index) in jslist">
					<view style="background-color: white;border-radius:5px;">
						<view style="height: 2px;"></view>
						<view style="display: flex;">
							<view><u-avatar :src="item.img" size="80"></u-avatar></view>
							<view style="padding-left: 10px;">
								<view><text style="color: black;font-size: 13px;">{{item.name}}</text></view>
								<view style="display: flex;">
									<view v-for="(tagitem,tagindex) in item.tag" :key="tagindex">
										<u-tag :text="tagitem.name" plain size="mini" :bgColor="tagitem.color"
											color="#ffffff" borderColor="#ffffff" plain plainFill></u-tag>
									</view>
								</view>
								<view>
									<u--text size="12" :lines="3" color="#888888" :text="item.content"></u--text>
								</view>
							</view>
						</view>
						<view style="height: 2px;"></view>
					</view>
					<view style="height: 5px;"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTeamIndex
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				jslist: [],
				banList: []
			}
		},
		onLoad() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			this.getTeam();
		},
		methods: {
			videoErrorCallback: function(e) {
				console.log(e)
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getTeam(){
				apiCrrtTrainTeamIndex({}).then(data => {
					console.log("首页加载", data)
					this.jslist = data.jslist;
					this.banList = data.banList;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {
				
				})
			}
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
</style>