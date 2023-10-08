<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;height: 100%;">
				<view style="height: 5px;">
				</view>
				<view style="display: flex;">
					<view style="width: 10px;"></view>
					<view style="height: 50px;"><u-avatar :src="model.userInfo.avatarUrl" size="50"
							shape="square"></u-avatar></view>
					<view style="width: 15px;"></view>
					<view style="height: 50px;width: 100%;">
						<view style="height: 20px;display: flex;">
							<view style="display: flex;width: 60%;">
								<view><text style="font-size: 16px;color: #272727;">{{model.userInfo.wechatName}}</text>
								</view>
								<view style="width: 10px;"></view>
								<view>
								</view>
							</view>
							<view style="width:40%">
							</view>
						</view>
						<view style="height: 15px;">
						</view>
						<view><text>{{model.userInfo.say}}</text></view>
					</view>
				</view>
				<view style="height: 10px;">
				</view>
			</view>
			<view style="height: 5px;">
			</view>
			<view style="width: 100%;background-color: white;border-radius:5px;">
				<u-cell-group>
					<u-cell title="我的身份" :value="model.userInfo.identityLable" icon="/static/crrt/me_hy.png"></u-cell>
					<u-cell title="员工认证" v-if="model.userInfo.auth == 1" isLink url="/pages/car/taxi/employees/index"
						icon="/static/crrt/me_em.png"></u-cell>
					<u-cell v-if="model.userInfo.role_type == 3" title="投诉管理" isLink
						url="/pages/car/taxi/complain/manage" icon="/static/crrt/bmsp.png"></u-cell>
				</u-cell-group>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>


</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCarTaxiMe
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				asrc: '/static/crrt/hs.png',
				model: {
					userInfo: {
						id: '',
						name: '',
						identityLable: '',
						avatarUrl: '',
						role_type: 3,
						say: "",
						auth: 0
					},
				},
			}
		},
		onLoad() {

		},
		onUnload() {

		},
		onShow() {
			this.token = uni.getStorageSync('token');
			console.log("onShow:" + this.token);
			if (!this.token) {
				uni.$u.route({
					type: 'reLaunch',
					url: '/pages/login/nopasscar'
				});
			} else {
				this.queryMe();
			}
		},
		methods: {
			onTabItemTap() {
				console.log('onTabItemTap');
			},
			queryMe() {
				apiCarTaxiMe({}).then(data => {
					console.log("报名", data)
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