<template>
	<view class="wrap">
		<view class="container">
			<view style="height: 5px;">
			</view>
			<view>
				<view>
					<view style="" v-for="(item,index) in list" :key="index">
						<view v-if="item.submit_status == 1">
							<view style="background-color: white;border-radius:5px;">
								<view style="height: 5px;">
								</view>
								<view style="display: flex;">
									<view style="width: 2px;">
									</view>
									<view style="display: flex;justify-content: center;align-items: center;">
										<view>
											<u--image src="/static/crrt/examination.png" width="45px" height="45px"
												mode="scaleToFill">
											</u--image>
										</view>
									</view>
									<view style="width: 10px;">
									</view>
									<view style="width:100%;">
										<view style="display: flex;">
											<view style="width: 55%;">
												<u--text lines="2" size="13" bold=true color="#272727"
													:text="item.plate"></u--text>
											</view>
											<view style="width: 45%;">
												<view style="float: right;display: flex;padding-right: 5px">
													<u--text lines="2" size="12" bold=true
														:text="item.bus_time"></u--text>
												</view>
											</view>
										</view>
										<view style="height: 10px;"></view>
										<view style="display: flex;">
											<view style="width: 55%;">
												<u--text lines="1" color="#8f8f8f" size="12"
													:text="item.name"></u--text>
											</view>
											<view style="width: 45%;">
												<view style="float: right;display: flex;padding-right: 5px">
													<u--text lines="1" color="#8f8f8f" size="12"
														:text="item.phone"></u--text>
												</view>
											</view>
										</view>
									</view>
									<view style="width: 2px;">
									</view>
								</view>
								<view style="height: 2px;">
								</view>
								<u-line dashed></u-line>
								<view style="height: 2px;">
								</view>
								<view style="display: flex;">
									<view style="width: 55%;">
										<view style="float: left;display: flex;padding-left: 3px;">
											<u-button text="详情" size="mini" :plain="true" type="success"
												@click="fillIn(item)"></u-button>
										</view>
									</view>
									<view style="width: 45%;">
										<view style="float: right;display: flex;padding-right: 3px">
											<u-button text="结单" size="mini" :plain="true" type="primary"
												@click="end(item)"></u-button>
										</view>
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
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	import frame from '@/common/frame.js';
	import {
		apiCarTaxiComplainList,
		apiCarTaxiComplainHandle
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
				list: [{
					id: '',
					name: '',
					plate: '',
					phone: '',
					bus_time: '',
					submit_status: 0
				}, ],
			};
		},
		methods: {
			queryComplainList() {
				apiCarTaxiComplainList({}).then(data => {
					console.log("投诉", data)
					if (data) {
						this.list = data;
					}
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			},
			fillIn(obj) {
				uni.$u.route("/pages/car/taxi/complain/info", {
					params: JSON.stringify(obj)
				});
			},
			end(obj) {
				apiCarTaxiComplainHandle({
					"id": obj.id
				}).then(data => {
					obj.submit_status = 2;
				}).catch(exception => {
					console.log("exception", exception)
				}).finally(res => {

				})
			}
		},
		onReady() {

		},
		onShow() {
			this.queryComplainList();
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