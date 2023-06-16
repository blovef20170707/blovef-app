<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;height: 100%;">
				<view style="height: 10px;">
				</view>
				<view style="display: flex;">
					<view style="width: 10px;"></view>
					<view style="height: 50px;"><u-avatar :src="model.userInfo.avatarUrl" size="50"
							shape="square"></u-avatar></view>
					<view style="width: 15px;"></view>
					<view style="height: 50px;">
						<view style="height: 20px;display: flex;">
							<view><text style="font-size: 16px;color: #272727;">{{model.userInfo.name}}</text></view>
							<view style="width: 10px;"></view>
							<view><u-tag :text="model.userInfo.standing" plain size="mini" bgColor="#4eb061"
									color="#ffffff" borderColor="#ffffff" plain plainFill></u-tag></view>
						</view>
						<view style="height: 15px;">
						</view>
						<view><text>医者，书不熟则理不明，理不明则识不精</text></view>
					</view>
				</view>
				<view style="height: 10px;">
				</view>
			</view>
			<view style="height: 10px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<u-cell-group>
					<u-cell v-if="" title="会员等级" value="普通会员" icon="/static/crrt/me_hy.png"></u-cell>
					<u-cell title="我的课程" isLink url="" @click="cellClick()" icon="/static/crrt/me_kc.png"></u-cell>
					<u-cell title="我的收藏" isLink url="" @click="cellClick()" icon="/static/crrt/me_sc.png"></u-cell>
					<u-cell title="我的考试" isLink url="" @click="cellClick()" icon="/static/crrt/me_ks2.png"></u-cell>
					<u-cell title="我的荣誉" isLink url="" @click="cellClick()" icon="/static/crrt/me_yy.png"></u-cell>
					<u-cell title="我的关注" isLink url="" @click="cellClick()" icon="/static/crrt/me_gz.png"></u-cell>
					<u-cell v-if="model.userInfo.role_type == 3" title="审批报名" isLink url="/pages/crrt/examine/index"
						icon="/static/crrt/bmsp.png"></u-cell>
					<u-cell title="开通反馈" v-if="model.userInfo.role_type == 3" isLink url="/pages/crrt/feedback/open"
						icon="/static/crrt/ktmyd.png"></u-cell>
					<u-cell title="设置" isLink url="" @click="cellClick()" icon="/static/crrt/me_sz.png"></u-cell>
				</u-cell-group>
			</view>

		</view>
		<u-toast ref="uToast"></u-toast>
	</view>


</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTrainee
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				asrc: '/static/crrt/hs.png',
				model: {
					userInfo: {
						id: '',
						name: '',
						standing: '',
						avatarUrl: '',
						information_status: 0,
						role_type: -1,
					},
				},
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.queryTrainee();
		},
		methods: {
			queryTrainee() {
				apiCrrtTrainTrainee({}).then(data => {
					console.log("学员", data)
					if (data) {
						this.model.userInfo = data;
					}
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
</style>