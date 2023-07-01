<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 2px;">
			</view>
			<view>
				<view>
					<view style="" v-for="(item,index) in list" :key="index">
						<view style="background-color: white;border-radius:5px;">
							<view style="height: 5px;">
							</view>
							<view style="display: flex;">
								<view style="width: 2px;">
								</view>
								<view style="height:40px">
									<u--image :src="item.avatarUrl" width="45px" height="45px" mode="scaleToFill">
									</u--image>
								</view>
								<view style="width: 10px;">
								</view>
								<view style="width:100%;height: 60px;">
									<view>
										<view>
											<u--text lines="2" size="13" bold=true color="#272727"
												:text="item.name"></u--text>
										</view>
									</view>
									<view style="height: 2px;"></view>
									<view style="display: flex;">
									</view>
									<view style="display: flex;font-weight:bolder;color: #7d7e7f;font-size: 12px;">
										<view style="width: 75%;font-size: 12px;">
											<view><text>{{item.phone}}</text></view>
											<view><text>{{item.idcard}}</text></view>
											<view><text>{{item.identityLabel}}</text></view>
										</view>
										<view style="width: 25%;">
											<view style="float: right;display: flex;padding-right: 5px">
												<view><u-button v-if="item.trainee_status == 1" text="通过" size="mini"
													color="linear-gradient(to right, rgb(0, 220, 62), rgb(0, 138, 151))"
													@click="examine(item)"></u-button></view>
												<view><text v-if="item.trainee_status == 2" style="font-weight: bold;font-size: 13px;color:#30db70;">已通过</text></view>
											</view>
										</view>
									</view>
								</view>
								<view style="width: 2px;">
								</view>
							</view>
							<view style="height: 5px;">
							</view>
						</view>
						<view style="height: 10px;">
						</view>
					</view>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
		
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCrrtTrainTrainees,
		apiCrrtTrainExamine
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				list: [],
			};
		},
		methods: {
			queryList() {
				apiCrrtTrainTrainees({}).then(data => {
					console.log("学员", data)
					if (data) {
						this.list = data;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			examine(obj) {
				apiCrrtTrainExamine({
					"id": obj.id
				}).then(data => {
					console.log("学员", data)
					this.$refs.uToast.show({
						message: '通过成功',
						type: 'success'
					});
					obj.trainee_status = 2;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			}
		},
		onReady() {

		},
		onShow() {
			this.queryList();

		},
	};
</script>

<style lang="scss">
	// page {
	// 	background-color: white;
	// }

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